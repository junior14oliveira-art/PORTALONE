import { Injectable, Logger } from '@nestjs/common';
import * as https from 'https';
import { PrismaClient } from '@prisma/client';
import { OrdersService } from '../orders/orders.service';

// Integração Mercado Pago Checkout Pro
// Requer mp_access_token nas configurações (grupo: 'mercadopago')
// Docs: https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post

const prisma = new PrismaClient();

// Tipos internos do Mercado Pago

export interface MpItem {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  unit_price: number;
}

export interface MpPayer {
  name?: string;
  surname?: string;
  email: string;
  phone?: { area_code?: string; number?: string };
  identification?: { type?: string; number?: string };
  address?: {
    street_name?: string;
    street_number?: string | number;
    zip_code?: string;
  };
}

export interface CreatePreferenceDto {
  orderId: string;
  items: MpItem[];
  payer: MpPayer;
  backUrls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
  notificationUrl?: string;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Lê o access token do Mercado Pago da tabela de configurações.
   */
  private async getMpAccessToken(): Promise<string> {
    const setting = await prisma.settings.findUnique({
      where: { key: 'mp_access_token' },
    });

    if (!setting || !setting.value) {
      throw new Error(
        'Mercado Pago access token não configurado. ' +
          'Configure mp_access_token em Configurações > Mercado Pago.',
      );
    }

    return setting.value;
  }

  /**
   * Verifica se o modo sandbox está ativo.
   */
  private async isSandbox(): Promise<boolean> {
    const setting = await prisma.settings.findUnique({
      where: { key: 'mp_sandbox' },
    });
    return setting?.value !== 'false';
  }

  /**
   * Faz uma requisição HTTPS para a API do Mercado Pago.
   * Usa o módulo nativo 'https' do Node.js para evitar dependências extras.
   */
  private mpRequest<T>(
    method: string,
    path: string,
    accessToken: string,
    body?: object,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const payload = body ? JSON.stringify(body) : undefined;

      const options: https.RequestOptions = {
        hostname: 'api.mercadopago.com',
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Idempotency-Key': `portalone-${Date.now()}`,
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if ((res.statusCode ?? 200) >= 400) {
              reject(new Error(`MP API Error ${res.statusCode}: ${data}`));
            } else {
              resolve(parsed as T);
            }
          } catch {
            reject(new Error(`Resposta inválida da API MP: ${data}`));
          }
        });
      });

      req.on('error', reject);
      if (payload) req.write(payload);
      req.end();
    });
  }

  /**
   * Cria uma preferência de pagamento no Mercado Pago (Checkout Pro).
   * Integração Mercado Pago Checkout Pro - Requer mp_access_token nas configurações
   */
  async createPreference(dto: CreatePreferenceDto): Promise<{
    preferenceId: string;
    initPoint: string;
    sandboxInitPoint: string;
  }> {
    const accessToken = await this.getMpAccessToken();
    const sandbox = await this.isSandbox();

    // Lê a URL de notificação das configurações ou usa a do DTO
    const notificationSetting = await prisma.settings.findUnique({
      where: { key: 'mp_notification_url' },
    });
    const notificationUrl =
      dto.notificationUrl || notificationSetting?.value || undefined;

    const preferencePayload = {
      items: dto.items,
      payer: dto.payer,
      external_reference: dto.orderId,
      notification_url: notificationUrl,
      back_urls: dto.backUrls ?? {
        success: `${process.env.ECOMMERCE_URL || 'http://localhost:3000'}/pedido/sucesso`,
        failure: `${process.env.ECOMMERCE_URL || 'http://localhost:3000'}/pedido/falha`,
        pending: `${process.env.ECOMMERCE_URL || 'http://localhost:3000'}/pedido/pendente`,
      },
      auto_return: 'approved',
      statement_descriptor: 'PORTALONE',
    };

    this.logger.log(`Criando preferência MP para pedido ${dto.orderId}`);

    const response = await this.mpRequest<{
      id: string;
      init_point: string;
      sandbox_init_point: string;
    }>('POST', '/checkout/preferences', accessToken, preferencePayload);

    // Salva o ID da preferência no pedido
    await this.ordersService.updatePayment(dto.orderId, {
      paymentStatus: 'PENDING',
      mpPreferenceId: response.id,
    });

    return {
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    };
  }

  /**
   * Processa webhook de notificação do Mercado Pago.
   * O MP envia notificações para a URL configurada em mp_notification_url.
   *
   * TODO: implementar validação de assinatura MP (header x-signature)
   * Docs: https://www.mercadopago.com.br/developers/pt/docs/notifications/webhooks
   */
  async handleWebhook(body: any): Promise<{ received: boolean }> {
    this.logger.log(`Webhook MP recebido: type=${body?.type}, action=${body?.action}`);

    // O MP envia diferentes tipos de notificações
    if (body?.type !== 'payment') {
      return { received: true };
    }

    const paymentId = body?.data?.id;
    if (!paymentId) {
      this.logger.warn('Webhook MP sem payment ID');
      return { received: true };
    }

    try {
      const paymentInfo = await this.getPaymentStatus(String(paymentId));

      const orderId = paymentInfo.external_reference;
      if (!orderId) {
        this.logger.warn(`Webhook MP: payment ${paymentId} sem external_reference`);
        return { received: true };
      }

      const mpStatus: string = paymentInfo.status;

      // Mapeamento de status MP → status do pedido
      const statusMap: Record<string, string> = {
        approved: 'PAID',
        pending: 'PENDING',
        in_process: 'PENDING',
        rejected: 'PAYMENT_FAILED',
        cancelled: 'CANCELLED',
        refunded: 'REFUNDED',
        charged_back: 'REFUNDED',
      };

      const orderStatus = statusMap[mpStatus];

      if (mpStatus === 'approved') {
        // Pagamento aprovado: atualiza pedido e avança status
        await this.ordersService.updatePayment(orderId, {
          paymentStatus: 'PAID',
          mpPaymentId: String(paymentId),
          paidAt: new Date(),
        });

        await this.ordersService.updateStatus(
          orderId,
          'PAID',
          `Pagamento aprovado via Mercado Pago. Payment ID: ${paymentId}`,
        );

        this.logger.log(`Pedido ${orderId} marcado como PAGO (MP payment ${paymentId})`);
      } else if (orderStatus) {
        await this.ordersService.updatePayment(orderId, {
          paymentStatus: mpStatus.toUpperCase(),
          mpPaymentId: String(paymentId),
        });
        this.logger.log(`Pedido ${orderId} pagamento status: ${mpStatus}`);
      }
    } catch (err) {
      this.logger.error(`Erro ao processar webhook MP: ${err}`);
      // Retorna 200 mesmo em caso de erro interno (MP requer 200)
    }

    return { received: true };
  }

  /**
   * Consulta o status de um pagamento diretamente na API do MP.
   */
  async getPaymentStatus(paymentId: string): Promise<any> {
    const accessToken = await this.getMpAccessToken();

    return this.mpRequest<any>(
      'GET',
      `/v1/payments/${paymentId}`,
      accessToken,
    );
  }
}

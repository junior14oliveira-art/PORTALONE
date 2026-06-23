import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Headers,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { PaymentsService, CreatePreferenceDto } from './payments.service';

@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * POST /api/payments/mp/preference
   * Cria uma preferência de pagamento no Mercado Pago (Checkout Pro).
   * Body: { orderId, items, payer, backUrls?, notificationUrl? }
   */
  @Post('mp/preference')
  async createPreference(@Body() dto: CreatePreferenceDto) {
    return this.paymentsService.createPreference(dto);
  }

  /**
   * POST /api/payments/mp/webhook
   * Recebe notificações de pagamento do Mercado Pago via IPN/Webhook.
   *
   * IMPORTANTE: O Mercado Pago exige resposta HTTP 200 mesmo em caso de erro.
   * TODO: implementar validação de assinatura MP (header x-signature)
   *
   * Referência: https://www.mercadopago.com.br/developers/pt/docs/notifications/webhooks
   */
  @Post('mp/webhook')
  @HttpCode(200) // MP requer 200 sempre
  async mpWebhook(
    @Body() body: any,
    @Headers('x-signature') signature?: string,
    @Headers('x-request-id') requestId?: string,
  ) {
    this.logger.log(
      `Webhook MP - request-id: ${requestId ?? 'N/A'}, signature: ${signature ? 'presente' : 'ausente'}`,
    );

    // TODO: implementar validação de assinatura MP usando x-signature e x-request-id
    // Docs: https://www.mercadopago.com.br/developers/pt/docs/notifications/webhooks/validate-notifications

    return this.paymentsService.handleWebhook(body);
  }

  /**
   * GET /api/payments/mp/status/:paymentId
   * Consulta o status de um pagamento diretamente na API do Mercado Pago.
   */
  @Get('mp/status/:paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    return this.paymentsService.getPaymentStatus(paymentId);
  }
}

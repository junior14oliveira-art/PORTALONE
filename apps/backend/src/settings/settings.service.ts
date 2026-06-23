import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Instância singleton do PrismaClient
const prisma = new PrismaClient();

// Interface para upsert em lote
export interface SettingInput {
  key: string;
  value: string;
  group: string;
  label?: string;
}

@Injectable()
export class SettingsService implements OnModuleInit {
  /**
   * Inicializa configurações padrão quando o módulo é carregado.
   * Usa upsert para não sobrescrever valores já existentes.
   */
  async onModuleInit() {
    await this.initDefaults();
  }

  /**
   * Retorna todas as configurações agrupadas por grupo.
   */
  async findAll(): Promise<Record<string, Record<string, string>>> {
    const settings = await prisma.settings.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });

    return settings.reduce(
      (acc, setting) => {
        if (!acc[setting.group]) {
          acc[setting.group] = {};
        }
        acc[setting.group][setting.key] = setting.value;
        return acc;
      },
      {} as Record<string, Record<string, string>>,
    );
  }

  /**
   * Retorna todas as configurações de um grupo específico.
   */
  async findByGroup(group: string): Promise<Record<string, string>> {
    const settings = await prisma.settings.findMany({
      where: { group },
      orderBy: { key: 'asc' },
    });

    return settings.reduce(
      (acc, s) => ({ ...acc, [s.key]: s.value }),
      {} as Record<string, string>,
    );
  }

  /**
   * Retorna uma configuração pelo key.
   */
  async findByKey(key: string) {
    return prisma.settings.findUnique({ where: { key } });
  }

  /**
   * Cria ou atualiza uma configuração individual.
   */
  async upsert(key: string, value: string, group: string, label?: string) {
    return prisma.settings.upsert({
      where: { key },
      create: { key, value, group, label },
      update: { value, label },
    });
  }

  /**
   * Cria ou atualiza várias configurações em lote.
   */
  async upsertMany(settings: SettingInput[]) {
    const results = await Promise.all(
      settings.map((s) => this.upsert(s.key, s.value, s.group, s.label)),
    );
    return results;
  }

  /**
   * Retorna o valor de uma configuração decodificado como JSON.
   * Útil para configurações que armazenam objetos ou arrays.
   */
  async getDecoded<T = unknown>(key: string): Promise<T | null> {
    const setting = await this.findByKey(key);
    if (!setting) return null;

    try {
      return JSON.parse(setting.value) as T;
    } catch {
      // Se não for JSON válido, retorna o valor como string
      return setting.value as unknown as T;
    }
  }

  /**
   * Inicializa todos os valores padrão de configuração.
   * Chamado automaticamente no onModuleInit.
   */
  async initDefaults() {
    const defaults: SettingInput[] = [
      // ── Dados da loja ────────────────────────────────────────────────────
      { key: 'store_name', value: 'PORTALONE', group: 'store', label: 'Nome da Loja' },
      { key: 'store_email', value: 'contato@portalone.com.br', group: 'store', label: 'E-mail da Loja' },
      { key: 'store_phone', value: '', group: 'store', label: 'Telefone da Loja' },
      { key: 'store_zip', value: '01310-100', group: 'store', label: 'CEP de Origem' },

      // ── Correios (SIGEP WebService) ───────────────────────────────────────
      { key: 'correios_user', value: '', group: 'correios', label: 'Usuário Correios' },
      { key: 'correios_password', value: '', group: 'correios', label: 'Senha Correios' },
      { key: 'correios_contract', value: '', group: 'correios', label: 'Contrato Correios' },
      { key: 'correios_card', value: '', group: 'correios', label: 'Cartão Postagem' },
      { key: 'correios_enabled', value: 'false', group: 'correios', label: 'Habilitar Correios' },
      { key: 'correios_env', value: 'homologacao', group: 'correios', label: 'Ambiente Correios' },

      // ── Mercado Pago ─────────────────────────────────────────────────────
      { key: 'mp_public_key', value: '', group: 'mercadopago', label: 'Public Key MP' },
      { key: 'mp_access_token', value: '', group: 'mercadopago', label: 'Access Token MP' },
      { key: 'mp_enabled', value: 'false', group: 'mercadopago', label: 'Habilitar Mercado Pago' },
      { key: 'mp_sandbox', value: 'true', group: 'mercadopago', label: 'Modo Sandbox' },
      { key: 'mp_notification_url', value: '', group: 'mercadopago', label: 'URL de Notificação MP' },

      // ── NF-e / Nota Fiscal ───────────────────────────────────────────────
      { key: 'nfe_cnpj', value: '', group: 'nfe', label: 'CNPJ Emitente' },
      { key: 'nfe_cert_path', value: '', group: 'nfe', label: 'Caminho do Certificado A1' },
      { key: 'nfe_cert_password', value: '', group: 'nfe', label: 'Senha do Certificado' },
      { key: 'nfe_series', value: '1', group: 'nfe', label: 'Série da NF-e' },
      { key: 'nfe_environment', value: 'homologacao', group: 'nfe', label: 'Ambiente NF-e' },
      { key: 'nfe_enabled', value: 'false', group: 'nfe', label: 'Habilitar Emissão NF-e' },
      { key: 'nfe_provider', value: 'focus', group: 'nfe', label: 'Provedor NF-e (focus | webmania | direct)' },

      // ── WhatsApp (Meta Business API) ─────────────────────────────────────
      { key: 'whatsapp_token', value: '', group: 'whatsapp', label: 'Token WhatsApp' },
      { key: 'whatsapp_number', value: '', group: 'whatsapp', label: 'Número WhatsApp' },
      { key: 'whatsapp_enabled', value: 'false', group: 'whatsapp', label: 'Habilitar WhatsApp' },
    ];

    // Upsert apenas criando se não existir (não sobrescreve valores salvos pelo admin)
    await Promise.all(
      defaults.map((s) =>
        prisma.settings.upsert({
          where: { key: s.key },
          create: { key: s.key, value: s.value, group: s.group, label: s.label },
          update: {}, // não atualiza se já existir
        }),
      ),
    );
  }
}

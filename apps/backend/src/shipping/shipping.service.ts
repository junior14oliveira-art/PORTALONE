import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Instância singleton do PrismaClient
const prisma = new PrismaClient();

// CEP de origem da loja (São Paulo, SP)
const ZIP_FROM = '01310100';

// Interface para um item de cotação de frete
export interface ShippingItem {
  weight: number; // em gramas
  quantity: number;
}

// Interface para resultado de cotação
export interface ShippingOption {
  service: string;
  name: string;
  price: number;
  days: number;
  description: string;
}

@Injectable()
export class ShippingService {
  /**
   * Calcula opções de frete para um CEP de destino e lista de itens.
   *
   * TODO: Replace mock with real Correios SIGEP WebService when credentials
   * are available in Settings (group: 'correios', key: 'correios_enabled' = 'true')
   */
  async quote(zipCodeTo: string, items: ShippingItem[]): Promise<ShippingOption[]> {
    const cleanZip = this.cleanZip(zipCodeTo);

    if (!this.isValidZip(cleanZip)) {
      throw new Error(`CEP inválido: ${zipCodeTo}`);
    }

    // Calcula peso total em gramas
    const totalWeight = items.reduce(
      (sum, item) => sum + item.weight * item.quantity,
      0,
    );

    // Verifica cache de cotações (válido por 24 horas)
    const cacheExpiry = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const cached = await prisma.shippingQuote.findMany({
      where: {
        zipCodeFrom: ZIP_FROM,
        zipCodeTo: cleanZip,
        weightG: totalWeight,
        createdAt: { gte: cacheExpiry },
      },
    });

    if (cached.length > 0) {
      return cached.map((q) => ({
        service: q.service,
        name: this.getServiceName(q.service),
        price: q.price,
        days: q.days,
        description: this.getServiceDescription(q.service, q.days),
      }));
    }

    // Calcula fator de distância baseado no prefixo do CEP (primeiros 2 dígitos)
    // CEPs brasileiros: quanto maior a diferença do prefixo de SP (01), mais longe
    const originPrefix = parseInt(ZIP_FROM.substring(0, 2), 10); // 01
    const destPrefix = parseInt(cleanZip.substring(0, 2), 10);
    const distanceFactor = Math.abs(destPrefix - originPrefix) * 0.1; // fator 0 a 9.9

    // ── Cálculo PAC (código 04510) ──────────────────────────────────────────
    const pacPrice = parseFloat(
      (15 + totalWeight * 0.05 + distanceFactor * 3).toFixed(2),
    );
    const pacDays = Math.min(20, Math.max(5, Math.round(5 + distanceFactor * 1.5)));

    // ── Cálculo SEDEX (código 04014) ────────────────────────────────────────
    const sedexPrice = parseFloat(
      (25 + totalWeight * 0.08 + distanceFactor * 2).toFixed(2),
    );
    const sedexDays = Math.min(8, Math.max(2, Math.round(2 + distanceFactor * 0.6)));

    // ── Cálculo SEDEX 10 (código 40215) ─────────────────────────────────────
    const sedex10Price = parseFloat(
      (45 + totalWeight * 0.1 + distanceFactor * 1.5).toFixed(2),
    );
    const sedex10Days = 1; // sempre próximo dia útil

    const options = [
      { service: 'PAC', price: pacPrice, days: pacDays },
      { service: 'SEDEX', price: sedexPrice, days: sedexDays },
      { service: 'SEDEX_10', price: sedex10Price, days: sedex10Days },
    ];

    // Salva resultados no cache
    await prisma.shippingQuote.createMany({
      data: options.map((opt) => ({
        zipCodeFrom: ZIP_FROM,
        zipCodeTo: cleanZip,
        weightG: totalWeight,
        service: opt.service,
        price: opt.price,
        days: opt.days,
      })),
    });

    return options.map((opt) => ({
      service: opt.service,
      name: this.getServiceName(opt.service),
      price: opt.price,
      days: opt.days,
      description: this.getServiceDescription(opt.service, opt.days),
    }));
  }

  /**
   * Valida e formata um CEP brasileiro.
   * Retorna objeto com { valid, formatted, clean }
   */
  validateZip(zipCode: string): { valid: boolean; formatted: string; clean: string } {
    const clean = this.cleanZip(zipCode);
    const valid = this.isValidZip(clean);
    const formatted = valid ? `${clean.substring(0, 5)}-${clean.substring(5)}` : zipCode;
    return { valid, formatted, clean };
  }

  /**
   * Lê configurações dos Correios na tabela Settings.
   */
  async getCorreiosSettings(): Promise<Record<string, string>> {
    const settings = await prisma.settings.findMany({
      where: { group: 'correios' },
    });

    return settings.reduce(
      (acc, s) => ({ ...acc, [s.key]: s.value }),
      {} as Record<string, string>,
    );
  }

  // ── Helpers privados ────────────────────────────────────────────────────────

  private cleanZip(zip: string): string {
    return zip.replace(/\D/g, '');
  }

  private isValidZip(clean: string): boolean {
    return /^\d{8}$/.test(clean);
  }

  private getServiceName(service: string): string {
    const names: Record<string, string> = {
      PAC: 'PAC',
      SEDEX: 'SEDEX',
      SEDEX_10: 'SEDEX 10',
    };
    return names[service] ?? service;
  }

  private getServiceDescription(service: string, days: number): string {
    const plural = days === 1 ? 'dia útil' : 'dias úteis';
    switch (service) {
      case 'PAC':
        return `Entrega econômica em até ${days} ${plural}`;
      case 'SEDEX':
        return `Entrega expressa em até ${days} ${plural}`;
      case 'SEDEX_10':
        return `Entrega até as 10h do próximo ${plural}`;
      default:
        return `Entrega em ${days} ${plural}`;
    }
  }
}

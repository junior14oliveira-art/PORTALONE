import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ShippingService, ShippingItem } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  /**
   * POST /api/shipping/quote - Calcula opções de frete
   * Body: { zipCodeTo: string, items: { weight: number, quantity: number }[] }
   */
  @Post('quote')
  async quote(
    @Body() body: { zipCodeTo: string; items: ShippingItem[] },
  ) {
    return this.shippingService.quote(body.zipCodeTo, body.items);
  }

  /**
   * GET /api/shipping/validate/:zipCode - Valida e formata um CEP brasileiro
   */
  @Get('validate/:zipCode')
  async validateZip(@Param('zipCode') zipCode: string) {
    return this.shippingService.validateZip(zipCode);
  }
}

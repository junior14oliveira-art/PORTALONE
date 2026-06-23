import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { OrdersService, CreateOrderDto } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * GET /api/orders - Lista todos os pedidos com paginação e filtros
   */
  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ordersService.findAll({
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  /**
   * GET /api/orders/stats - Estatísticas para o painel administrativo
   * IMPORTANTE: rota /stats deve vir antes de /:id para não conflitar
   */
  @Get('stats')
  async getStats() {
    return this.ordersService.getStats();
  }

  /**
   * GET /api/orders/number/:orderNumber - Busca pedido pelo número (ex: PO-2024-000001)
   */
  @Get('number/:orderNumber')
  async findByOrderNumber(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.findByOrderNumber(orderNumber);
  }

  /**
   * GET /api/orders/:id - Retorna detalhes completos do pedido
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  /**
   * POST /api/orders - Cria um novo pedido
   */
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  /**
   * PATCH /api/orders/:id/status - Atualiza status do pedido
   * Body: { status: string, note?: string }
   */
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; note?: string },
  ) {
    return this.ordersService.updateStatus(id, body.status, body.note);
  }

  /**
   * PATCH /api/orders/:id/payment - Atualiza informações de pagamento
   */
  @Patch(':id/payment')
  async updatePayment(
    @Param('id') id: string,
    @Body()
    body: {
      paymentStatus: string;
      paymentRef?: string;
      mpPaymentId?: string;
      mpPreferenceId?: string;
      paidAt?: string;
    },
  ) {
    return this.ordersService.updatePayment(id, {
      ...body,
      paidAt: body.paidAt ? new Date(body.paidAt) : undefined,
    });
  }

  /**
   * PATCH /api/orders/:id/tracking - Atualiza código de rastreamento
   * Body: { trackingCode: string }
   */
  @Patch(':id/tracking')
  async updateTracking(
    @Param('id') id: string,
    @Body() body: { trackingCode: string },
  ) {
    return this.ordersService.updateTracking(id, body.trackingCode);
  }

  /**
   * DELETE /api/orders/:id - Cancela o pedido
   * Body: { reason: string }
   */
  @Delete(':id')
  async cancel(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.ordersService.cancel(id, body.reason);
  }
}

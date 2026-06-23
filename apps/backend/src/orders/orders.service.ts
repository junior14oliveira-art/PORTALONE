import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Instância singleton do PrismaClient compartilhada no módulo
const prisma = new PrismaClient();

// DTO para criação de pedido
export interface CreateOrderDto {
  userId?: string;
  guestEmail?: string;
  guestName?: string;
  addressId?: string;
  shippingStreet?: string;
  shippingNumber?: string;
  shippingComplement?: string;
  shippingNeighborhood?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZipCode?: string;
  shippingMethod?: string;
  shippingCost?: number;
  shippingDays?: number;
  paymentMethod?: string;
  subtotal: number;
  discountAmount?: number;
  totalAmount: number;
  notes?: string;
  items: CreateOrderItemDto[];
}

export interface CreateOrderItemDto {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

@Injectable()
export class OrdersService {
  /**
   * Retorna todos os pedidos com paginação e filtros opcionais.
   */
  async findAll(filters?: { status?: string; page?: number; limit?: number }) {
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.status) {
      where.status = filters.status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: {
            include: { product: { select: { id: true, name: true, imageUrl: true } } },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Retorna um pedido completo pelo ID, incluindo histórico, itens e produto.
   */
  async findOne(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        address: true,
        items: {
          include: {
            product: {
              select: { id: true, name: true, imageUrl: true, sku: true },
            },
          },
        },
        history: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID "${id}" não encontrado`);
    }

    return order;
  }

  /**
   * Retorna um pedido pelo número do pedido (ex: PO-2024-000001).
   */
  async findByOrderNumber(orderNumber: string) {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            product: { select: { id: true, name: true, imageUrl: true } },
          },
        },
        history: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido "${orderNumber}" não encontrado`);
    }

    return order;
  }

  /**
   * Cria um novo pedido e gera número único no formato PO-YYYY-NNNNNN.
   * Cria entrada inicial no histórico com status PENDING.
   */
  async create(data: CreateOrderDto) {
    // Gera número de pedido único: PO-2024-000001
    const year = new Date().getFullYear();
    const count = await prisma.order.count({
      where: { orderNumber: { startsWith: `PO-${year}-` } },
    });
    const orderNumber = `PO-${year}-${String(count + 1).padStart(6, '0')}`;

    const { items, ...orderData } = data;

    const order = await prisma.order.create({
      data: {
        ...orderData,
        orderNumber,
        discountAmount: orderData.discountAmount ?? 0,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        history: {
          create: {
            status: 'PENDING',
            note: 'Pedido criado',
          },
        },
      },
      include: {
        items: true,
        history: true,
      },
    });

    return order;
  }

  /**
   * Atualiza o status do pedido e registra no histórico.
   */
  async updateStatus(id: string, status: string, note?: string) {
    // Verifica se pedido existe
    await this.findOne(id);

    const [order] = await Promise.all([
      prisma.order.update({
        where: { id },
        data: { status },
        include: { history: { orderBy: { createdAt: 'asc' } } },
      }),
      prisma.orderHistory.create({
        data: {
          orderId: id,
          status,
          note: note ?? `Status atualizado para ${status}`,
        },
      }),
    ]);

    return order;
  }

  /**
   * Atualiza informações de pagamento do pedido (Mercado Pago, etc.).
   */
  async updatePayment(
    id: string,
    data: {
      paymentStatus: string;
      paymentRef?: string;
      mpPaymentId?: string;
      mpPreferenceId?: string;
      paidAt?: Date;
    },
  ) {
    await this.findOne(id);

    return prisma.order.update({
      where: { id },
      data: {
        paymentStatus: data.paymentStatus,
        paymentRef: data.paymentRef,
        mpPaymentId: data.mpPaymentId,
        mpPreferenceId: data.mpPreferenceId,
        paidAt: data.paidAt,
      },
    });
  }

  /**
   * Atualiza o código de rastreamento e opcionalmente avança o status para SHIPPED.
   */
  async updateTracking(id: string, trackingCode: string) {
    const order = await this.findOne(id);

    const updateData: any = { trackingCode };

    // Se ainda não foi despachado, avança automaticamente para SHIPPED
    if (order.status !== 'SHIPPED' && order.status !== 'DELIVERED') {
      updateData.status = 'SHIPPED';
    }

    const [updated] = await Promise.all([
      prisma.order.update({ where: { id }, data: updateData }),
      prisma.orderHistory.create({
        data: {
          orderId: id,
          status: updateData.status ?? order.status,
          note: `Código de rastreamento adicionado: ${trackingCode}`,
        },
      }),
    ]);

    return updated;
  }

  /**
   * Cancela um pedido com motivo e registra no histórico.
   */
  async cancel(id: string, reason: string) {
    const order = await this.findOne(id);

    if (order.status === 'DELIVERED') {
      throw new BadRequestException('Não é possível cancelar um pedido já entregue');
    }

    if (order.status === 'CANCELLED') {
      throw new BadRequestException('Pedido já está cancelado');
    }

    const [updated] = await Promise.all([
      prisma.order.update({
        where: { id },
        data: { status: 'CANCELLED', cancelReason: reason },
      }),
      prisma.orderHistory.create({
        data: {
          orderId: id,
          status: 'CANCELLED',
          note: `Pedido cancelado: ${reason}`,
        },
      }),
    ]);

    return updated;
  }

  /**
   * Retorna estatísticas do painel de administração.
   */
  async getStats() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalOrders,
      pendingOrders,
      allOrders,
      weekOrders,
      monthOrders,
      ordersByStatus,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({
        select: { totalAmount: true },
        where: { status: { not: 'CANCELLED' } },
      }),
      prisma.order.findMany({
        select: { totalAmount: true },
        where: {
          createdAt: { gte: startOfWeek },
          status: { not: 'CANCELLED' },
        },
      }),
      prisma.order.findMany({
        select: { totalAmount: true },
        where: {
          createdAt: { gte: startOfMonth },
          status: { not: 'CANCELLED' },
        },
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const weekRevenue = weekOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const monthRevenue = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      weekRevenue,
      monthRevenue,
      ordersByStatus: ordersByStatus.map((s) => ({
        status: s.status,
        count: s._count.status,
      })),
    };
  }
}

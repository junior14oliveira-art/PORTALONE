import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      include: { category: true }
    });
  }

  async findOne(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true, pieces: true }
    });
  }

  async create(data: any): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }
}

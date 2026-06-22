import { Injectable } from '@nestjs/common';
import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CategoriesService {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany({
      include: { products: true }
    });
  }

  async findOne(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true }
    });
  }

  async create(data: any): Promise<Category> {
    return prisma.category.create({
      data,
    });
  }

  async update(id: string, data: any): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }
}

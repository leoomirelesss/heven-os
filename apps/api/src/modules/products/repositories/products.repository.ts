import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../../../infra/database/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  findManyByTenant(tenantId: string): Promise<Product[]> {
    return this.prisma.product.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  findByIdAndTenant(id: string, tenantId: string): Promise<Product | null> {
    return this.prisma.product.findFirst({ where: { id, tenantId } });
  }

  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  countByTenant(tenantId: string): Promise<number> {
    return this.prisma.product.count({ where: { tenantId } });
  }
}

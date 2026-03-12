import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/database/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  findManyByTenant(tenantId: string) {
    return this.prisma.order.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        items: {
          include: { product: true },
        },
      },
    });
  }

  findByIdAndTenant(id: string, tenantId: string) {
    return this.prisma.order.findFirst({
      where: { id, tenantId },
      include: {
        customer: true,
        items: {
          include: { product: true },
        },
      },
    });
  }

  countByTenant(tenantId: string): Promise<number> {
    return this.prisma.order.count({ where: { tenantId } });
  }

  revenueByTenant(tenantId: string): Promise<{ _sum: { total: Prisma.Decimal | null } }> {
    return this.prisma.order.aggregate({
      where: { tenantId },
      _sum: { total: true },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/database/prisma.service';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  findManyByTenant(tenantId: string): Promise<Customer[]> {
    return this.prisma.customer.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  findByIdAndTenant(id: string, tenantId: string): Promise<Customer | null> {
    return this.prisma.customer.findFirst({ where: { id, tenantId } });
  }

  update(id: string, data: Prisma.CustomerUpdateInput): Promise<Customer> {
    return this.prisma.customer.update({ where: { id }, data });
  }

  delete(id: string): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }

  countByTenant(tenantId: string): Promise<number> {
    return this.prisma.customer.count({ where: { tenantId } });
  }
}

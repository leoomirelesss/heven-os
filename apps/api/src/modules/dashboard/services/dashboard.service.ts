import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../customers/repositories/customers.repository';
import { OrdersRepository } from '../../orders/repositories/orders.repository';
import { ProductsRepository } from '../../products/repositories/products.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly customersRepository: CustomersRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async getMetrics(tenantId: string) {
    const [totalProducts, totalCustomers, totalOrders, revenueAggregate] = await Promise.all([
      this.productsRepository.countByTenant(tenantId),
      this.customersRepository.countByTenant(tenantId),
      this.ordersRepository.countByTenant(tenantId),
      this.ordersRepository.revenueByTenant(tenantId),
    ]);

    return {
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRevenue: Number(revenueAggregate._sum.total ?? 0),
    };
  }
}

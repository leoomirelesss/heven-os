import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomersRepository } from '../../customers/repositories/customers.repository';
import { ProductsRepository } from '../../products/repositories/products.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly customersRepository: CustomersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create(tenantId: string, dto: CreateOrderDto) {
    const customer = await this.customersRepository.findByIdAndTenant(dto.customerId, tenantId);
    if (!customer) {
      throw new BadRequestException('Customer not found for tenant');
    }

    if (dto.items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    const products = await Promise.all(
      dto.items.map(async (item) => {
        const product = await this.productsRepository.findByIdAndTenant(item.productId, tenantId);
        if (!product) {
          throw new BadRequestException(`Product ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(`Insufficient stock for ${product.name}`);
        }

        return { item, product };
      }),
    );

    const total = products.reduce(
      (acc, entry) => acc.plus(entry.product.price.mul(entry.item.quantity)),
      new Prisma.Decimal(0),
    );

    return this.ordersRepository.create({
      status: dto.status ?? 'created',
      currency: dto.currency,
      total,
      tenant: { connect: { id: tenantId } },
      customer: { connect: { id: customer.id } },
      items: {
        create: products.map(({ item, product }) => ({
          product: { connect: { id: product.id } },
          quantity: item.quantity,
          price: product.price,
        })),
      },
    });
  }

  findAll(tenantId: string) {
    return this.ordersRepository.findManyByTenant(tenantId);
  }

  async findOne(tenantId: string, id: string) {
    const order = await this.ordersRepository.findByIdAndTenant(id, tenantId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}

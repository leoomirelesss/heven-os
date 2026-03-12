import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(tenantId: string, dto: CreateProductDto) {
    try {
      return await this.productsRepository.create({
        name: dto.name,
        description: dto.description,
        sku: dto.sku,
        price: new Prisma.Decimal(dto.price),
        currency: dto.currency,
        stock: dto.stock,
        status: dto.status,
        tenant: { connect: { id: tenantId } },
      });
    } catch {
      throw new ConflictException('SKU already exists for tenant');
    }
  }

  findAll(tenantId: string) {
    return this.productsRepository.findManyByTenant(tenantId);
  }

  async findOne(tenantId: string, id: string) {
    const item = await this.productsRepository.findByIdAndTenant(id, tenantId);
    if (!item) {
      throw new NotFoundException('Product not found');
    }
    return item;
  }

  async update(tenantId: string, id: string, dto: UpdateProductDto) {
    await this.findOne(tenantId, id);
    return this.productsRepository.update(id, {
      ...dto,
      price: dto.price === undefined ? undefined : new Prisma.Decimal(dto.price),
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.productsRepository.delete(id);
  }
}

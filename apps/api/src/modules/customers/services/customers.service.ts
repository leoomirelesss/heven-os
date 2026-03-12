import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomersRepository } from '../repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  create(tenantId: string, dto: CreateCustomerDto) {
    return this.customersRepository.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      tags: dto.tags ?? [],
      notes: dto.notes,
      tenant: { connect: { id: tenantId } },
    });
  }

  findAll(tenantId: string) {
    return this.customersRepository.findManyByTenant(tenantId);
  }

  async findOne(tenantId: string, id: string) {
    const customer = await this.customersRepository.findByIdAndTenant(id, tenantId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(tenantId: string, id: string, dto: UpdateCustomerDto) {
    await this.findOne(tenantId, id);
    return this.customersRepository.update(id, dto);
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.customersRepository.delete(id);
  }
}

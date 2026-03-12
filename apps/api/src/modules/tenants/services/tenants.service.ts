import { ConflictException, Injectable } from '@nestjs/common';
import { TenantsRepository } from '../repositories/tenants.repository';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async createTenant(input: CreateTenantDto) {
    const existing = await this.tenantsRepository.findBySlug(input.slug);
    if (existing) {
      throw new ConflictException('Slug already in use');
    }

    return this.tenantsRepository.create({
      name: input.name,
      slug: input.slug,
      plan: 'starter',
      status: 'active',
    });
  }
}

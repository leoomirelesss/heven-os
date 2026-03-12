import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { TenantsService } from '../services/tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.createTenant(dto);
  }
}

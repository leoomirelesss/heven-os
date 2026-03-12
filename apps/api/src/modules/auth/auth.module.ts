import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuditService } from '../../infra/audit/audit.service';
import { TenantsModule } from '../tenants/tenants.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [JwtModule.register({}), TenantsModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuditService],
})
export class AuthModule {}

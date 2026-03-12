import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../../../infra/database/prisma.service';
import { AuditService } from '../../../infra/audit/audit.service';
import { TenantsService } from '../../tenants/services/tenants.service';
import { UsersRepository } from '../../users/repositories/users.repository';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async register(dto: RegisterDto) {
    const tenant = await this.tenantsService.createTenant({
      name: dto.tenantName,
      slug: dto.tenantSlug,
    });

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.usersRepository.create({
      email: dto.email.toLowerCase(),
      fullName: dto.fullName,
      passwordHash,
      role: 'owner',
      status: 'active',
      tenant: { connect: { id: tenant.id } },
    });

    this.auditService.log('auth.register', { userId: user.id, tenantId: tenant.id });

    return this.issueTokens(user.id, user.tenantId, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findByEmail(dto.email.toLowerCase());
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await argon2.verify(user.passwordHash, dto.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.auditService.log('auth.login', { userId: user.id, tenantId: user.tenantId });

    return this.issueTokens(user.id, user.tenantId, user.email, user.role);
  }

  async refreshTokens(dto: RefreshTokenDto) {
    const payload = await this.jwtService.verifyAsync<{
      sub: string;
      tenantId: string;
      role: string;
      email: string;
    }>(dto.refreshToken, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
    });

    const user = await this.usersRepository.findById(payload.sub);
    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('User not active');
    }

    return this.issueTokens(user.id, user.tenantId, user.email, user.role);
  }

  async me(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        tenantId: true,
        fullName: true,
        email: true,
        role: true,
        status: true,
      },
    });
  }

  private async issueTokens(userId: string, tenantId: string, email: string, role: string) {
    const payload = { sub: userId, tenantId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}

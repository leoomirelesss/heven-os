import { Request } from 'express';

export type AuthUser = {
  sub: string;
  tenantId: string;
  role: string;
  email: string;
};

export type AuthenticatedRequest = Request & {
  user: AuthUser;
};

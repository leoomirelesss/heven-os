import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  log(event: string, payload: Record<string, unknown>): void {
    this.logger.log(JSON.stringify({ event, payload, at: new Date().toISOString() }));
  }
}

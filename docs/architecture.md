# Hevən OS Architecture (MVP Foundation)

## 1) Core Principle

Hevən OS is implemented as a **modular monolith** with strict bounded contexts so each domain can be extracted into microservices later without a rewrite.

## 2) Target Capabilities

- Authentication + tenant isolation (mandatory for all modules)
- Business dashboard + analytics primitives
- Ecommerce, CRM, messaging inbox, automation, bookings, shipping
- Admin operations for platform governance

## 3) Backend Architecture (NestJS)

### Domain modules
- `auth`: login, refresh rotation, password hashing, token issuance
- `tenants`: business account lifecycle
- `users`: user lifecycle and role mapping
- `commerce`: products, inventory, orders, payments abstraction
- `crm`: customer records + interactions
- `inbox`: conversations + messages + assignments
- `automation`: flow graph + node execution logs
- `bookings`: schedules + appointments + reminders
- `shipping`: rates, labels, tracking
- `analytics`: curated read models + KPI endpoints
- `admin`: platform operations and tenant governance

### Shared layers
- `common`: guards, decorators, interceptors, validation, constants
- `infra`: Prisma/Postgres, Redis cache, BullMQ queues, storage adapters, mail adapters
- `config`: typed config with runtime validation

## 4) Multi-tenancy model

- Every tenant-facing table contains `tenant_id`.
- Request context carries `tenantId` from JWT claims.
- Domain services and repositories must filter by `tenant_id`.
- RBAC enforcement is scoped to tenant membership.
- Admin-only APIs are explicit and audited.

## 5) Security baseline

- Argon2 password hashing
- JWT access + refresh token rotation
- RBAC (owner/admin/agent/staff)
- Global validation and DTO contracts
- Rate limiting (Nest Throttler)
- Audit events for auth + privileged actions

## 6) Frontend architecture

Next.js App Router with product-area route groups:

- `/dashboard`, `/store`, `/inbox`, `/customers`, `/automations`, `/bookings`, `/shipping`, `/analytics`, `/settings`

App shell uses:
- Left sidebar + top header
- Typed API client + React Query
- Design language inspired by Linear/Stripe/Vercel

## 7) Evolution path

- Phase 1: modular monolith + clear interfaces
- Phase 2: extract async-heavy modules (inbox, automation, shipping) behind queue contracts
- Phase 3: isolate event bus + module-specific read stores

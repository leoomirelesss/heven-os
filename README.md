# Hevən OS

Production-grade modular monolith SaaS foundation for LATAM SMB operations.

## Monorepo layout

- `apps/api`: NestJS backend (multi-tenant modular monolith)
- `apps/web`: Next.js frontend dashboard shell
- `docs`: architecture, roadmap, and operating model

## Quick start

```bash
npm install
npm run build --workspace @heven/api
```

See `docs/architecture.md` for system design.

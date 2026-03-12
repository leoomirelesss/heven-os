# Database Schema (MVP)

The authoritative model is `apps/api/prisma/schema.prisma`.

## Core tables

- `tenants`
- `users`
- `products`
- `orders`
- `customers`
- `conversations`
- `messages`
- `automation_flows`
- `automation_nodes`
- `bookings`
- `shipments`
- `payments`
- `subscriptions`

## Multi-tenant enforcement

All tenant-facing domain tables include `tenantId` and are queried through tenant-bound service methods.

## Role model

`UserRole` enum:
- `owner`
- `admin`
- `agent`
- `staff`

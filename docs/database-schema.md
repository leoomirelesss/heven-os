# Database Schema (MVP)

The authoritative model is `apps/api/prisma/schema.prisma`.

## Core transactional tables delivered in this sprint

- `tenants`
- `users`
- `products`
- `customers`
- `orders`
- `order_items`

## Additional platform tables already modeled

- `conversations`
- `messages`
- `bookings`
- `shipments`
- `payments`
- `subscriptions`

## Multi-tenant enforcement

All tenant-owned entities include `tenantId` and are accessed through tenant-scoped service methods.

## Role model

`UserRole` enum:
- `owner`
- `admin`
- `agent`
- `staff`

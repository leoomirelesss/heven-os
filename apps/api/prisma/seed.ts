import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo-company',
      plan: 'starter',
      status: 'active',
    },
  });

  await prisma.user.upsert({
    where: { email: 'owner@demo.heven' },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'owner@demo.heven',
      fullName: 'Demo Owner',
      passwordHash: await argon2.hash('ChangeMe123!'),
      role: 'owner',
      status: 'active',
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

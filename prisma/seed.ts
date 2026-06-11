import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client';
import { adminSeed } from './seeds/admin.seed';
import { devSeed } from './seeds/dev.seed';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const main = async () => {
  await adminSeed(prisma);
  await devSeed(prisma);
};

main()
  .catch(console.error)
  .finally(() => process.exit());

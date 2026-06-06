import type { Class, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (data: Prisma.ClassCreateInput): Promise<Class> => {
  return prisma.class.create({ data });
};

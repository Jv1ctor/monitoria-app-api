import type { Class, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const update = async (
  id: number,
  data: Prisma.ClassUpdateInput,
): Promise<Class> => {
  return prisma.class.update({ where: { id }, data });
};

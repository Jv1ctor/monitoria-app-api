import type { Class } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const remove = async (id: number): Promise<Class> => {
  return prisma.class.delete({ where: { id } });
};

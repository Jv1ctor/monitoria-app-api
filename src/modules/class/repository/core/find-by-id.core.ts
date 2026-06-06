import type { Class } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (id: number): Promise<Class | null> => {
  return prisma.class.findUnique({ where: { id } });
};

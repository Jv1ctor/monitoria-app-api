import type { Class } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByCode = async (code: string): Promise<Class | null> => {
  return prisma.class.findUnique({ where: { code } });
};

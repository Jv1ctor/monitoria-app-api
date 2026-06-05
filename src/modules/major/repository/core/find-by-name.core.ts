import type { Major } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByName = async (name: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { name: name } });
};

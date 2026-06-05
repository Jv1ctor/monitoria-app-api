import type { Class } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAll = async (): Promise<Class[]> => {
  return prisma.class.findMany();
};

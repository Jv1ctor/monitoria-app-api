import type { Frequencys } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (id: number): Promise<Frequencys | null> => {
  return prisma.frequencys.findUnique({ where: { id } });
};

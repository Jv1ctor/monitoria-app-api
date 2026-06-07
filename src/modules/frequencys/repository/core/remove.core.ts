import type { Frequencys } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const remove = async (id: number): Promise<Frequencys> => {
  return prisma.frequencys.delete({ where: { id } });
};

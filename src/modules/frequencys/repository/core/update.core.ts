import type { Frequencys, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const update = async (
  id: number,
  data: Prisma.FrequencysUpdateInput,
): Promise<Frequencys> => {
  return prisma.frequencys.update({ where: { id }, data });
};

import type { Frequencys, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (
  data: Prisma.FrequencysUncheckedCreateInput,
): Promise<Frequencys> => {
  return prisma.frequencys.create({ data });
};

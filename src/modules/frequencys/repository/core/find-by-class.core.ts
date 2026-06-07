import type { Frequencys } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByClass = async (classId: number): Promise<Frequencys[]> => {
  return prisma.frequencys.findMany({
    where: { lesson: { class_id: classId } },
  });
};

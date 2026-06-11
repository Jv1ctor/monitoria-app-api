import { prisma } from '@/shared/database/prisma';

import type { FrequencysWithStudent } from '../../interfaces/frequencys-repository.port';

export const findByClass = async (
  classId: number,
): Promise<FrequencysWithStudent[]> => {
  return prisma.frequencys.findMany({
    where: { lesson: { class_id: classId } },
    include: {
      student: { include: { user: true } },
    },
  }) as Promise<FrequencysWithStudent[]>;
};

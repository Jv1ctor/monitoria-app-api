import { prisma } from '@/shared/database/prisma';

import type { FrequencysWithStudent } from '../../interfaces/frequencys-repository.port';

export const findByLesson = async (
  lessonId: number,
): Promise<FrequencysWithStudent[]> => {
  return prisma.frequencys.findMany({
    where: { lesson_id: lessonId },
    include: {
      student: { include: { user: true } },
    },
  }) as Promise<FrequencysWithStudent[]>;
};

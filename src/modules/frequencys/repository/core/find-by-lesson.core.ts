import type { Frequencys } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByLesson = async (lessonId: number): Promise<Frequencys[]> => {
  return prisma.frequencys.findMany({ where: { lesson_id: lessonId } });
};

import type { Lesson, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const update = async (
  id: number,
  data: Prisma.LessonUpdateInput,
): Promise<Lesson> => {
  return prisma.lesson.update({ where: { id }, data });
};

import type { Lesson, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (
  data: Prisma.LessonCreateInput,
): Promise<Lesson> => {
  return prisma.lesson.create({ data });
};

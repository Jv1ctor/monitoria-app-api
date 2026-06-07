import type { LessonUser, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (
  data: Prisma.LessonUserUncheckedCreateInput,
): Promise<LessonUser> => {
  return prisma.lessonUser.create({ data });
};

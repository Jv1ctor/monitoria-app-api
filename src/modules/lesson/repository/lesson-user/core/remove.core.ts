import type { LessonUser } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const remove = async (id: number): Promise<LessonUser> => {
  return prisma.lessonUser.delete({ where: { id } });
};

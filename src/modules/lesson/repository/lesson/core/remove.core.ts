import type { Lesson } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const remove = async (id: number): Promise<Lesson> => {
  return prisma.lesson.delete({ where: { id } });
};

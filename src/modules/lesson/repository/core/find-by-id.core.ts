import type { Lesson } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (id: number): Promise<Lesson | null> => {
  return prisma.lesson.findUnique({ where: { id } });
};

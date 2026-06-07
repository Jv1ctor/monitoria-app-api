import type { Lesson } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAll = async (): Promise<Lesson[]> => {
  return prisma.lesson.findMany();
};

import type { Lesson } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByClassId = async (classId: number): Promise<Lesson[]> => {
  return prisma.lesson.findMany({ where: { class_id: classId } });
};

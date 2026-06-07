import type { LessonUser } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findUnique = async (
  classId: number,
  studentId: number,
): Promise<LessonUser | null> => {
  return prisma.lessonUser.findFirst({
    where: { class_id: classId, student_id: studentId },
  });
};

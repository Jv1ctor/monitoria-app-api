import type { LessonUser } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findUnique = async (
  lessonId: number,
  classId: number,
  studentId: number,
): Promise<LessonUser | null> => {
  return prisma.lessonUser.findFirst({
    where: {
      lesson: { class_id: classId, id: lessonId },
      student_id: studentId,
    },
  });
};

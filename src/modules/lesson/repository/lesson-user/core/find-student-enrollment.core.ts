import type { LessonUser } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findStudentEnrollment = (
  monitorId: number,
  studentId: number,
): Promise<LessonUser | null> => {
  return prisma.lessonUser.findFirst({
    where: {
      student_id: studentId,
      class: { monitor_id: monitorId },
    },
  });
};

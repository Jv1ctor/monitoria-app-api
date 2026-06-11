import type { LessonUser } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findStudentEnrollment = (
  studentId: number,
  monitorId: number,
): Promise<LessonUser | null> => {
  return prisma.lessonUser.findFirst({
    where: {
      student_id: studentId,
      lesson: { class: { monitor_id: monitorId } },
    },
  });
};

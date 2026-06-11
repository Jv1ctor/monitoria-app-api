import type { Frequencys } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByStudentAndLesson = async (
  studentId: number,
  lessonId: number,
): Promise<Frequencys | null> => {
  return prisma.frequencys.findUnique({
    where: {
      student_id_lesson_id: {
        student_id: studentId,
        lesson_id: lessonId,
      },
    },
  });
};

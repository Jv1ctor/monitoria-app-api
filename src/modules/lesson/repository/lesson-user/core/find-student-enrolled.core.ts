import type { Lesson } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findStudentEnrolled = async (
  studentId: number,
): Promise<Lesson[]> => {
  const lessonUser = await prisma.lessonUser.findMany({
    where: { student_id: studentId },
    include: { lesson: true },
  });

  return lessonUser.map(l => l.lesson);
};

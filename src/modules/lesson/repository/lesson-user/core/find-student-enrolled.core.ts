import type { Lesson } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

type PopulatedLesson = Lesson & {
  class: {
    id: number;
    code: string;
    subject: { id: number; name: string } | null;
    monitor: {
      user: { id: number; first_name: string; last_name: string };
    } | null;
  } | null;
};

export const findStudentEnrolled = async (
  studentId: number,
): Promise<PopulatedLesson[]> => {
  const lessonUser = await prisma.lessonUser.findMany({
    where: { student_id: studentId },
    include: {
      lesson: {
        include: {
          class: {
            include: {
              subject: true,
              monitor: { include: { user: true } },
            },
          },
        },
      },
    },
  });

  return lessonUser.map(l => l.lesson) as PopulatedLesson[];
};

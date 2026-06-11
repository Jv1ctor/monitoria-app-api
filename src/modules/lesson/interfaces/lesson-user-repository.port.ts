import type { Lesson, LessonUser, Prisma } from '@/generated/prisma/browser';

export type LessonUserRepositoryPort = {
  create: (data: Prisma.LessonUserUncheckedCreateInput) => Promise<LessonUser>;
  findUnique: (
    lessonId: number,
    classId: number,
    studentId: number,
  ) => Promise<LessonUser | null>;
  findStudentEnrollment: (
    monitorId: number,
    studentId: number,
  ) => Promise<LessonUser | null>;
  findStudentEnrolled: (studentId: number) => Promise<
    (Lesson & {
      class: {
        id: number;
        code: string;
        subject: { id: number; name: string } | null;
        monitor: {
          user: { id: number; first_name: string; last_name: string };
        } | null;
      } | null;
    })[]
  >;
  remove: (id: number) => Promise<LessonUser>;
};

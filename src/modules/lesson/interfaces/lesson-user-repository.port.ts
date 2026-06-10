import type { Lesson, LessonUser, Prisma } from '@/generated/prisma/browser';

export type LessonUserRepositoryPort = {
  create: (data: Prisma.LessonUserUncheckedCreateInput) => Promise<LessonUser>;
  findUnique: (
    classId: number,
    studentId: number,
  ) => Promise<LessonUser | null>;
  findStudentEnrollment: (
    monitorId: number,
    studentId: number,
  ) => Promise<LessonUser | null>;
  findStudentEnrolled: (studentId: number) => Promise<Lesson[]>;
  remove: (id: number) => Promise<LessonUser>;
};

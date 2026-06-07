import type { LessonUser, Prisma } from '@/generated/prisma/browser';

export type LessonUserRepositoryPort = {
  create: (data: Prisma.LessonUserUncheckedCreateInput) => Promise<LessonUser>;
  findUnique: (
    classId: number,
    studentId: number,
  ) => Promise<LessonUser | null>;
  remove: (id: number) => Promise<LessonUser>;
};

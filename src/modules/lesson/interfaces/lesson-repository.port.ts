import type { Lesson, Prisma } from '@/generated/prisma/browser';

export type LessonRepositoryPort = {
  create: (data: Prisma.LessonCreateInput) => Promise<Lesson>;
  findById: (id: number) => Promise<Lesson | null>;
  findAll: () => Promise<Lesson[]>;
  findByClassId: (classId: number) => Promise<Lesson[]>;
  update: (id: number, data: Prisma.LessonUpdateInput) => Promise<Lesson>;
  remove: (id: number) => Promise<Lesson>;
};

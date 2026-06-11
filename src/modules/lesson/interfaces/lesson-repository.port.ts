import type { Lesson, Prisma } from '@/generated/prisma/browser';
import type { LessonGetPayload } from '@/generated/prisma/models';

export type LessonRepositoryPort = {
  create: (data: Prisma.LessonCreateInput) => Promise<Lesson>;
  findById: (id: number) => Promise<Lesson | null>;
  findAll: () => Promise<Lesson[]>;
  findByClassId: (classId: number) => Promise<
    LessonGetPayload<{
      include: { class: { include: { monitor: { include: { user: true } } } } };
    }>[]
  >;
  update: (id: number, data: Prisma.LessonUpdateInput) => Promise<Lesson>;
  remove: (id: number) => Promise<Lesson>;
};

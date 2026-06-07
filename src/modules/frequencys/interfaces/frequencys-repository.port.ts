import type { Frequencys, Prisma } from '@/generated/prisma/browser';

export type FrequencysRepositoryPort = {
  create: (data: Prisma.FrequencysUncheckedCreateInput) => Promise<Frequencys>;
  findById: (id: number) => Promise<Frequencys | null>;
  findByLesson: (lessonId: number) => Promise<Frequencys[]>;
  findByClass: (classId: number) => Promise<Frequencys[]>;
  findByStudent: (studentId: number) => Promise<Frequencys[]>;
  update: (
    id: number,
    data: Prisma.FrequencysUpdateInput,
  ) => Promise<Frequencys>;
  remove: (id: number) => Promise<Frequencys>;
  isEnrolled: (classId: number, studentId: number) => Promise<boolean>;
};

import type { Prisma, Subject } from '@/generated/prisma/browser';

export type SubjectRepositoryPort = {
  create: (data: Prisma.SubjectCreateInput) => Promise<Subject>;
  findById: (id: number) => Promise<Subject | null>;
  findAll: () => Promise<Subject[]>;
  findByCode: (code: string) => Promise<Subject | null>;
  update: (id: number, data: Prisma.SubjectUpdateInput) => Promise<Subject>;
  remove: (id: number) => Promise<Subject>;
};

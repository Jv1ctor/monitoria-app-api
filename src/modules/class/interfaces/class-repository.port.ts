import type { Class, Prisma } from '@/generated/prisma/browser';

export type ClassRepositoryPort = {
  create: (data: Prisma.ClassCreateInput) => Promise<Class>;
  findById: (id: number) => Promise<Class | null>;
  findAll: () => Promise<
    (Class & {
      subject: { id: number; name: string; code: string };
      monitor: {
        user: { id: number; first_name: string; last_name: string };
      } | null;
    })[]
  >;
  findByCode: (code: string) => Promise<Class | null>;
  update: (id: number, data: Prisma.ClassUpdateInput) => Promise<Class>;
  remove: (id: number) => Promise<Class>;
  subjectInUse: (subjectId: number) => Promise<boolean>;
};

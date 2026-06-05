import type { Major, Prisma } from '@/generated/prisma/browser';

export type MajorRepositoryPort = {
  create: (data: Prisma.MajorCreateInput) => Promise<Major>;
  findById: (id: number) => Promise<Major | null>;
  findAll: () => Promise<Major[]>;
  update: (id: number, data: Prisma.MajorUpdateInput) => Promise<Major>;
  remove: (id: number) => Promise<Major>;
  findByName: (name: string) => Promise<Major | null>;
};

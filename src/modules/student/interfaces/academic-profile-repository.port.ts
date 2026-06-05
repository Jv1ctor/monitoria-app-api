import type { AcademicProfile, Prisma } from '@/generated/prisma/browser';

export type AcademicProfileRepositoryPort = {
  create: (data: Prisma.AcademicProfileCreateInput) => Promise<AcademicProfile>;
};

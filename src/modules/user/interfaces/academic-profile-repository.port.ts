import type { AcademicProfile, Prisma, Role } from '@/generated/prisma/browser';

export type AcademicProfileRepositoryPort = {
  create: (data: Prisma.AcademicProfileCreateInput) => Promise<AcademicProfile>;
  majorInUse: (majorId: number) => Promise<boolean>;
  findByUserId: (
    userId: number,
    options?: {
      role?: Role;
    },
  ) => Promise<AcademicProfile | null>;
};

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
  findByUserIdWithClasses: (
    userId: number,
    options?: {
      role?: Role;
    },
  ) => Promise<
    | (AcademicProfile & {
        classes: Array<{ id: number; code: string; subject_id: number }>;
      })
    | null
  >;
};

import type { AcademicProfile, Prisma } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (
  data: Prisma.AcademicProfileCreateInput,
): Promise<AcademicProfile> => {
  const profile = prisma.academicProfile.create({
    data: data,
  });

  return profile;
};

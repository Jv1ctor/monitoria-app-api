import type { AcademicProfile, Role } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByUserId = async (
  userId: number,
  options?: { role?: Role },
): Promise<AcademicProfile | null> => {
  return prisma.academicProfile.findUnique({
    where: { user_id: userId, user: { role: options?.role } },
  });
};

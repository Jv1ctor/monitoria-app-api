import type { AcademicProfile, Role } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByUserIdWithClasses = async (
  userId: number,
  options?: { role?: Role },
): Promise<
  | (AcademicProfile & {
      classes: Array<{ id: number; code: string; subject_id: number }>;
    })
  | null
> => {
  return prisma.academicProfile.findUnique({
    where: {
      user_id: userId,
      user: { role: options?.role },
    },
    include: {
      classes: { select: { id: true, code: true, subject_id: true } },
    },
  });
};

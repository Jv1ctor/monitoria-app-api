import type { Rating } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAllByStudent = async (
  studentId: number,
): Promise<Rating[]> => {
  return prisma.rating.findMany({
    where: { student_id: studentId },
    orderBy: { created_at: 'desc' },
  });
};

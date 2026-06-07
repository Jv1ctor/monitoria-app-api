import type { Frequencys } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByStudent = async (
  studentId: number,
): Promise<Frequencys[]> => {
  return prisma.frequencys.findMany({ where: { student_id: studentId } });
};

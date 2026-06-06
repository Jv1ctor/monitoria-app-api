import { prisma } from '@/shared/database/prisma';

export const subjectInUse = async (subjectId: number): Promise<boolean> => {
  const count = await prisma.class.count({ where: { subject_id: subjectId } });
  return count > 0;
};

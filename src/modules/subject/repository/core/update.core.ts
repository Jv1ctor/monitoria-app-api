import type { Prisma, Subject } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const update = async (
  id: number,
  data: Prisma.SubjectUpdateInput,
): Promise<Subject> => {
  return prisma.subject.update({ where: { id }, data });
};

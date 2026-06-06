import type { Prisma, Subject } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const create = async (
  data: Prisma.SubjectCreateInput,
): Promise<Subject> => {
  return prisma.subject.create({ data });
};

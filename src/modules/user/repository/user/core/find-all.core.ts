import type { Role, User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findAll = async (options?: { role?: Role }): Promise<User[]> => {
  return prisma.user.findMany({
    where: options?.role ? { role: options.role } : undefined,
    orderBy: { created_at: 'desc' },
  });
};

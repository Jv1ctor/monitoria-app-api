import type { Role, User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findById = async (
  id: number,
  options?: {
    role?: Role;
  },
): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: {
      id,
      role: options?.role,
    },
  });

  return user;
};

import type { Role, User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByEmail = async (
  email: string,
  options?: {
    role?: Role;
  },
): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: {
      email: email,
      role: options?.role,
    },
  });

  return user;
};

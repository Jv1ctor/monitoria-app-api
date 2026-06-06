import type { Role, User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByRegistration = async (
  registration: string,
  options?: {
    role?: Role;
  },
): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: {
      registration: registration,
      role: options?.role,
    },
  });

  return user;
};

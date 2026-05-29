import type { User } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';

export const findByRegistration = async (
  registration: string,
): Promise<User | null> => {
  const user = prisma.user.findUnique({
    where: {
      registration: registration,
    },
  });

  return user;
};

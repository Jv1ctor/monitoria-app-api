import type { Prisma, Role, User } from '@/generated/prisma/browser';

export type UserRepositoryPort = {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findByRegistration: (
    registration: string,
    options?: {
      role?: Role;
    },
  ) => Promise<User | null>;
  findByEmail: (
    email: string,
    options?: {
      role?: Role;
    },
  ) => Promise<User | null>;
  findById: (
    id: number,
    options?: {
      role?: Role;
    },
  ) => Promise<User | null>;
};

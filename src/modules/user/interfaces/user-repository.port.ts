import type { Prisma, User } from '@/generated/prisma/browser';

export type UserRepositoryPort = {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findByRegistration: (registration: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
};

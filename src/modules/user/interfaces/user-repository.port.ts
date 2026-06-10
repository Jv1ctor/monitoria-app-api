import type { User } from '@/generated/prisma/browser';
import type { Role } from '@/generated/prisma/enums';
import type {
  UserCreateInput,
  UserUpdateInput,
} from '@/generated/prisma/models';

export type UserRepositoryPort = {
  create: (data: UserCreateInput) => Promise<User>;
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
  findAll: (options?: { role?: Role }) => Promise<User[]>;
  update: (id: number, data: UserUpdateInput) => Promise<User>;
};

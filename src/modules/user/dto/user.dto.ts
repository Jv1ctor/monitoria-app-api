import type { Role } from '@/generated/prisma/enums';

export type UserDto = {
  id: number;
  registration: string;
  email: string;
  firstName: string;
  lastName: string;
  majorId: number;
  role: Role;
  createdAt: Date;
};

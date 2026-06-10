import type { Role } from '@/generated/prisma/enums';

export type StudentDto = {
  id: number;
  registration: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  createdAt: Date;
};

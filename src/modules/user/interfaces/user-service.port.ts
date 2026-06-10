import type { Role } from '@/generated/prisma/enums';

import type { UserDto } from '../dto/user.dto';

export type MeResponse = UserDto & {
  academicProfile?: {
    major?: { id: number; name: string };
    classes?: { id: number; code: string; subject_id: number }[];
  };
};

export type UserServicePort = {
  getMe(userId: number, role: Role): Promise<MeResponse>;
};

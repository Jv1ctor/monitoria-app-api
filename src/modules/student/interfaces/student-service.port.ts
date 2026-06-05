import type { Major, User } from '@/generated/prisma/browser';

import type { RegisterStudantDto } from '../dto/register-student.dto';

export type StudentServicePort = {
  register: (data: RegisterStudantDto) => Promise<{ user: User; major: Major }>;
};

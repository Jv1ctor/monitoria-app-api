import type { Major, User } from '@/generated/prisma/browser';

import type { RegisterStudantDto } from '../dto/register-student.dto';
import type { PromoteStudentRequestDto } from '../dto/request/promote-student-request.dto';
import type { StudentDto } from '../dto/student.dto';

export type StudentServicePort = {
  register: (data: RegisterStudantDto) => Promise<{ user: User; major: Major }>;
  findAll: () => Promise<StudentDto[]>;
  promote: (
    userId: number,
    input: PromoteStudentRequestDto,
  ) => Promise<StudentDto>;
};

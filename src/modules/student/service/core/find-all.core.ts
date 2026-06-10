import { Role } from '@/generated/prisma/enums';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';

import type { StudentDto } from '../../dto/student.dto';

export const findAll =
  (deps: { userRepo: UserRepositoryPort }) =>
  async (): Promise<StudentDto[]> => {
    const { userRepo } = deps;
    const users = await userRepo.findAll({ role: Role.STUDENT });

    return users.map(s => ({
      id: s.id,
      registration: s.registration,
      email: s.email,
      first_name: s.first_name,
      last_name: s.last_name,
      role: s.role,
      createdAt: s.created_at,
    }));
  };

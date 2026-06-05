import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';

import type { AcademicProfileRepositoryPort } from '../interfaces/academic-profile-repository.port';
import type { StudentServicePort } from '../interfaces/student-service.port';
import { register } from './core/register.core';

export const studentService = (deps: {
  userRepo: UserRepositoryPort;
  majorRepo: MajorRepositoryPort;
  profileRepo: AcademicProfileRepositoryPort;
}): StudentServicePort => ({
  register: register(deps),
});

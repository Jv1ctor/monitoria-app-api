import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import type { SubjectRepositoryPort } from '@/modules/subject/interfaces/subject-repository.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';

import type { AcademicProfileRepositoryPort } from '../../user/interfaces/academic-profile-repository.port';
import type { StudentServicePort } from '../interfaces/student-service.port';
import { findAll } from './core/find-all.core';
import { promote } from './core/promote.core';
import { register } from './core/register.core';

export const studentService = (deps: {
  userRepo: UserRepositoryPort;
  majorRepo: MajorRepositoryPort;
  profileRepo: AcademicProfileRepositoryPort;
  subjectRepo: SubjectRepositoryPort;
}): StudentServicePort => ({
  register: register(deps),
  findAll: findAll(deps),
  promote: promote(deps),
});

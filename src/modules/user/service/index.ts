import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';

import type { AcademicProfileRepositoryPort } from '../interfaces/academic-profile-repository.port';
import type { UserRepositoryPort } from '../interfaces/user-repository.port';
import type { UserServicePort } from '../interfaces/user-service.port';
import { getMe } from './core/get-me.core';

export const userService = (deps: {
  userRepo: UserRepositoryPort;
  profileRepo: AcademicProfileRepositoryPort;
  majorRepo: MajorRepositoryPort;
}): UserServicePort => ({
  getMe: getMe(deps),
});

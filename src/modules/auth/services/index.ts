import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';
import type { AuthServicePort } from '../interfaces/auth-service.port';
import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import { register } from './core/register.core';
import { login } from './core/login.core';

export const authService = (deps: {
  userRepo: UserRepositoryPort;
  majorRepo: MajorRepositoryPort
}): AuthServicePort => ({
  login: login({ userRepo: deps.userRepo }),
  register: register({ userRepo: deps.userRepo, majorRepo: deps.majorRepo }),
  // recover: ,
});

import type { UserRepositoryPort } from '../interfaces/user-repository.port';
import type { UserServicePort } from '../interfaces/user-service.port';
import { findByRegistration } from './core/find-by-registration.core';

export const userService = (
  repository: UserRepositoryPort,
): UserServicePort => ({
  findByRegistration: findByRegistration({ repository }),
});

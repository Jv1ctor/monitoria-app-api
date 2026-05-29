import type { UserRepositoryPort } from '../interfaces/user-repository.port';
import { create } from './core/create.core';
import { findByRegistration } from './core/find-by-registration.core';

export const userRepository: UserRepositoryPort = {
  create: create,
  findByRegistration: findByRegistration,
};

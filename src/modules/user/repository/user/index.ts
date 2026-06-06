import type { UserRepositoryPort } from '../../interfaces/user-repository.port';
import { create } from './core/create.core';
import { findByEmail } from './core/find-by-email.core';
import { findById } from './core/find-by-id.core';
import { findByRegistration } from './core/find-by-registration.core';

export const userRepository: UserRepositoryPort = {
  create: create,
  findByRegistration: findByRegistration,
  findByEmail: findByEmail,
  findById: findById,
};

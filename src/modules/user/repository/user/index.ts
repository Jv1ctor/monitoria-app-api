import type { UserRepositoryPort } from '../../interfaces/user-repository.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByEmail } from './core/find-by-email.core';
import { findById } from './core/find-by-id.core';
import { findByRegistration } from './core/find-by-registration.core';
import { update } from './core/update.core';

export const userRepository: UserRepositoryPort = {
  create: create,
  findByRegistration: findByRegistration,
  findByEmail: findByEmail,
  findById: findById,
  findAll: findAll,
  update: update,
};

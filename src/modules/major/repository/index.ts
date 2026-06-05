import type { MajorRepositoryPort } from '../interfaces/major-repository.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findById } from './core/find-by-id.core';
import { findByName } from './core/find-by-name.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const majorRepository: MajorRepositoryPort = {
  create: create,
  findAll: findAll,
  findById: findById,
  remove: remove,
  update: update,
  findByName: findByName,
};

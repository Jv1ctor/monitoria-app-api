import type { MajorRepositoryPort } from '../interfaces/major-repository.port';
import type { MajorServicePort } from '../interfaces/major-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const majorService = (
  repository: MajorRepositoryPort,
): MajorServicePort => ({
  create: create({ repository }),
  findAll: findAll({ repository }),
  findById: findById({ repository }),
  remove: remove({ repository }),
  update: update({ repository }),
});

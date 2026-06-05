import type { ClassRepositoryPort } from '../interfaces/class-repository.port';
import type { ClassServicePort } from '../interfaces/class-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const classService = (
  classRepo: ClassRepositoryPort,
): ClassServicePort => ({
  create: create({ repository: classRepo }),
  findAll: findAll({ repository: classRepo }),
  findById: findById({ repository: classRepo }),
  findByCode: findByCode({ repository: classRepo }),
  update: update({ repository: classRepo }),
  remove: remove({ classRepo }),
});

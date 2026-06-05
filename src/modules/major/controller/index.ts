import type { MajorServicePort } from '../interfaces/major-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const majorController = (deps: { majorService: MajorServicePort }) => ({
  create: create({ majorService: deps.majorService }),
  findAll: findAll({ majorService: deps.majorService }),
  findById: findById({ majorService: deps.majorService }),
  update: update({ majorService: deps.majorService }),
  remove: remove({ majorService: deps.majorService }),
});

import type { ClassServicePort } from '../interfaces/class-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const classController = (deps: { classService: ClassServicePort }) => ({
  create: create({ classService: deps.classService }),
  findAll: findAll({ classService: deps.classService }),
  findById: findById({ classService: deps.classService }),
  findByCode: findByCode({ classService: deps.classService }),
  update: update({ classService: deps.classService }),
  remove: remove({ classService: deps.classService }),
});

import type { RequestHandler } from 'express';

import type { MajorServicePort } from '../interfaces/major-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findById } from './core/find-by-id.core';
import { findByName } from './core/find-by-name.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

type MajorController = {
  create: RequestHandler;
  findAll: RequestHandler;
  findById: RequestHandler;
  findByName: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
};

export const majorController = (deps: {
  majorService: MajorServicePort;
}): MajorController => ({
  create: create({ majorService: deps.majorService }),
  findAll: findAll({ majorService: deps.majorService }),
  findById: findById({ majorService: deps.majorService }),
  findByName: findByName({ majorService: deps.majorService }),
  update: update({ majorService: deps.majorService }),
  remove: remove({ majorService: deps.majorService }),
});

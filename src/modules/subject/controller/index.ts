import type { RequestHandler } from 'express';

import type { SubjectServicePort } from '../interfaces/subject-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

type SubjectController = {
  create: RequestHandler;
  findAll: RequestHandler;
  findById: RequestHandler;
  findByCode: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
};

export const subjectController = (deps: {
  subjectService: SubjectServicePort;
}): SubjectController => ({
  create: create({ subjectService: deps.subjectService }),
  findAll: findAll({ subjectService: deps.subjectService }),
  findById: findById({ subjectService: deps.subjectService }),
  findByCode: findByCode({ subjectService: deps.subjectService }),
  update: update({ subjectService: deps.subjectService }),
  remove: remove({ subjectService: deps.subjectService }),
});

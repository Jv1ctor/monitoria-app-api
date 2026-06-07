import type { RequestHandler } from 'express';

import type { LessonServicePort } from '../interfaces/lesson-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByClassId } from './core/find-by-class-id.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

type LessonController = {
  create: RequestHandler;
  findAll: RequestHandler;
  findById: RequestHandler;
  findByClassId: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
};

export const lessonController = (deps: {
  lessonService: LessonServicePort;
}): LessonController => ({
  create: create({ lessonService: deps.lessonService }),
  findAll: findAll({ lessonService: deps.lessonService }),
  findById: findById({ lessonService: deps.lessonService }),
  findByClassId: findByClassId({ lessonService: deps.lessonService }),
  update: update({ lessonService: deps.lessonService }),
  remove: remove({ lessonService: deps.lessonService }),
});

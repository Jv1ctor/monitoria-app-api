import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';

import type { LessonRepositoryPort } from '../interfaces/lesson-repository.port';
import type { LessonServicePort } from '../interfaces/lesson-service.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByClassId } from './core/find-by-class-id.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const lessonService = (deps: {
  lessonRepo: LessonRepositoryPort;
  classRepo: ClassRepositoryPort;
}): LessonServicePort => ({
  create: create(deps),
  findAll: findAll(deps),
  findById: findById(deps),
  findByClassId: findByClassId(deps),
  update: update(deps),
  remove: remove(deps),
});

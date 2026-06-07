import type { LessonRepositoryPort } from '../interfaces/lesson-repository.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByClassId } from './core/find-by-class-id.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const lessonRepository: LessonRepositoryPort = {
  create,
  findAll,
  findById,
  findByClassId,
  update,
  remove,
};

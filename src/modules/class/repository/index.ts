import type { ClassRepositoryPort } from '../interfaces/class-repository.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { subjectInUse } from './core/subject-in-use.core';
import { update } from './core/update.core';

export const classRepository: ClassRepositoryPort = {
  create,
  findAll,
  findById,
  findByCode,
  update,
  remove,
  subjectInUse,
};

import type { SubjectRepositoryPort } from '../interfaces/subject-repository.port';
import { create } from './core/create.core';
import { findAll } from './core/find-all.core';
import { findByCode } from './core/find-by-code.core';
import { findById } from './core/find-by-id.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const subjectRepository: SubjectRepositoryPort = {
  create,
  findAll,
  findById,
  findByCode,
  update,
  remove,
};

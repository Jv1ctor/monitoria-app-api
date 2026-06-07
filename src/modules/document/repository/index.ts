import type { DocumentRepositoryPort } from '../interface/document-repository.port';
import { create } from './core/create.core';
import { findAllByClass } from './core/find-all-by-class.core';
import { findById } from './core/find-by-id.core';
import { findByKey } from './core/find-by-key.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const documentRepository: DocumentRepositoryPort = {
  create,
  findById,
  findAllByClass,
  findByKey,
  update,
  remove,
};

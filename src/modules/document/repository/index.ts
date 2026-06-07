import type { DocumentRepositoryPort } from '../interface/document-repository.port';
import { create } from './core/create.core';
import { findAllByClass } from './core/find-all-by-class.core';
import { findById } from './core/find-by-id.core';
import { findByKey } from './core/find-by-key.core';

export const documentRepository: DocumentRepositoryPort = {
  create,
  findById,
  findAllByClass,
  findByKey,
};

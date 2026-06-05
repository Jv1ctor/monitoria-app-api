import type { DocumentRepositoryPort } from '../interface/document-repository.port';
import { create } from './core/create.core';

export const documentRepository: DocumentRepositoryPort = {
  create,
};

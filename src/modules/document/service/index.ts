import type { StorageProvider } from '@/shared/storage/storage.provider';

import type { DocumentRepositoryPort } from '../interface/document-repository.port';
import type { DocumentServicePort } from '../interface/document-service.port';
import { getSignedUpload } from './core/get-signed-upload.core';

export const documentService = (deps: {
  documentRepo: DocumentRepositoryPort;
  storageProvider: StorageProvider;
}): DocumentServicePort => ({
  getSignedUpload: getSignedUpload(deps),
});

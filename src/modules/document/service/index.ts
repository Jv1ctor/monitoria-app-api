import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { StorageProvider } from '@/shared/storage/storage.provider';

import type { DocumentRepositoryPort } from '../interface/document-repository.port';
import type { DocumentServicePort } from '../interface/document-service.port';
import { findAllByClass } from './core/find-all-by-class.core';
import { findById } from './core/find-by-id.core';
import { getSignedDownloadAndPreviewUrl } from './core/get-signed-download-and-preview.core';
import { getSignedUpload } from './core/get-signed-upload.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const documentService = (deps: {
  documentRepo: DocumentRepositoryPort;
  storageProvider: StorageProvider;
  classRepo: ClassRepositoryPort;
}): DocumentServicePort => ({
  getSignedUpload: getSignedUpload(deps),
  getSignedDownloadAndPreview: getSignedDownloadAndPreviewUrl(deps),
  findById: findById(deps),
  findAllByClass: findAllByClass(deps),
  update: update(deps),
  remove: remove(deps),
});

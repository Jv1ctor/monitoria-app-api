import type { DocumentServicePort } from '../interface/document-service.port';
import { createUploadUrl } from './core/create-upload-url.core';
import { findAllByClass } from './core/find-all-by-class.core';
import { findById } from './core/find-by-id.core';
import { getSignedDownloadAndPreview } from './core/get-signed-download-and-preview.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const documentController = (deps: {
  documentService: DocumentServicePort;
}) => ({
  createUploadUrl: createUploadUrl(deps),
  findById: findById(deps),
  findAllByClass: findAllByClass(deps),
  getSignedDownloadAndPreview: getSignedDownloadAndPreview(deps),
  update: update(deps),
  remove: remove(deps),
});

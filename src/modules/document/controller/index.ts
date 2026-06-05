import type { DocumentServicePort } from '../interface/document-service.port';
import { createUploadUrl } from './core/create-upload-url.core';

export const documentController = (deps: {
  documentService: DocumentServicePort;
}) => ({
  createUploadUrl: createUploadUrl(deps),
});

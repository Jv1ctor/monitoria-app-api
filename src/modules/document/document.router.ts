import { Router } from 'express';

import { S3StorageProvider } from '@/shared/storage/s3-storage.provider';

import { documentController } from './controller';
import { documentRepository } from './repository';
import { documentService } from './service';

export const documentRouter = Router();

const service = documentService({
  documentRepo: documentRepository,
  storageProvider: S3StorageProvider,
});

const controller = documentController({
  documentService: service,
});

documentRouter.post('/', controller.createUploadUrl);

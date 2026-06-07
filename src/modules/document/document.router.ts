import { Router } from 'express';

import { S3StorageProvider } from '@/shared/storage/s3-storage.provider';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { classRepository } from '../class/repository';
import { userRepository } from '../user/repository/user';
import { documentController } from './controller';
import { documentRepository } from './repository';
import { documentService } from './service';

export const documentRouter = Router();

const service = documentService({
  documentRepo: documentRepository,
  storageProvider: S3StorageProvider,
  classRepo: classRepository,
});

const controller = documentController({
  documentService: service,
});

const userRepo = userRepository;
const authenticator = authenticatorMiddleware({ userRepo });

documentRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN']),
  controller.createUploadUrl,
);

documentRouter.get('/', authenticator, controller.findAllByClass);

documentRouter.get(
  '/by-key/:key/download-and-preview',
  authenticator,
  controller.getSignedDownloadAndPreview,
);

documentRouter.get('/:id', authenticator, controller.findById);

documentRouter.patch(
  '/:id',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN']),
  controller.update,
);

documentRouter.delete(
  '/:id',
  authenticator,
  authorizatorMiddleware(['MONITOR', 'ADMIN']),
  controller.remove,
);

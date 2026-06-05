import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { classRepository } from '../class/repository';
import { userRepository } from '../user/repository';
import { subjectController } from './controller';
import { subjectRepository } from './repository';
import { subjectService } from './service';

export const subjectRouter = Router();

const userRepo = userRepository;
const repository = subjectRepository;
const classRepo = classRepository;
const service = subjectService(repository, classRepo);
const authenticator = authenticatorMiddleware({ userRepo });

const controller = subjectController({
  subjectService: service,
});

subjectRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.create,
);
subjectRouter.get('/', authenticator, controller.findAll);
subjectRouter.get('/by-code', authenticator, controller.findByCode);
subjectRouter.get('/:id', authenticator, controller.findById);
subjectRouter.put(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.update,
);
subjectRouter.delete(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.remove,
);

import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { userRepository } from '../user/repository';
import { classController } from './controller';
import { classRepository } from './repository';
import { classService } from './service';

export const classRouter = Router();

const userRepo = userRepository;
const repository = classRepository;
const service = classService(repository);
const authenticator = authenticatorMiddleware({ userRepo });

const controller = classController({
  classService: service,
});

classRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.create,
);
classRouter.get('/', authenticator, controller.findAll);
classRouter.get('/by-code', authenticator, controller.findByCode);
classRouter.get('/:id', authenticator, controller.findById);
classRouter.put(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.update,
);
classRouter.delete(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.remove,
);

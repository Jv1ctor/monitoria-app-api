import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { authorizatorMiddleware } from '../auth/middleware/authorizator.middleawre';
import { academicProfileRepository } from '../student/repository';
import { userRepository } from '../user/repository';
import { majorController } from './controller';
import { majorRepository } from './repository';
import { majorService } from './service';

export const majorRouter = Router();

const userRepo = userRepository;
const repository = majorRepository;
const profileRepository = academicProfileRepository;
const service = majorService(repository, profileRepository);
const authenticator = authenticatorMiddleware({ userRepo });

const controller = majorController({
  majorService: service,
});

majorRouter.post(
  '/',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.create,
);
majorRouter.get('/', controller.findAll);
majorRouter.get('/by-name', (request, response, next) =>
  controller.findByName(request, response, next),
);
majorRouter.get('/:id', controller.findById);
majorRouter.put(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.update,
);
majorRouter.delete(
  '/:id',
  authenticator,
  authorizatorMiddleware(['ADMIN']),
  controller.remove,
);

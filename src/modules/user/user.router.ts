import { Router } from 'express';

import { authenticatorMiddleware } from '../auth/middleware/authenticator.middleware';
import { majorRepository } from '../major/repository';
import { academicProfileRepository } from '../user/repository/academic-profile';
import { userRepository } from '../user/repository/user';
import { userController } from './controller';
import { userService } from './service';

export const userRouter = Router();

const authenticator = authenticatorMiddleware({ userRepo: userRepository });
const service = userService({
  userRepo: userRepository,
  profileRepo: academicProfileRepository,
  majorRepo: majorRepository,
});
const controller = userController({ userService: service });

userRouter.get('/me', authenticator, controller.getMe);

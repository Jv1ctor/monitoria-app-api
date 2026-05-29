import { Router } from 'express';

import { majorRepository } from '../major/repository';
import { userRepository } from '../user/repository';
import { authController } from './controller';
import { authService } from './services';

export const authRouter = Router();

const userRepo = userRepository;
const majorRepo = majorRepository;
const controller = authController({
  authService: authService({ userRepo, majorRepo }),
});

authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);

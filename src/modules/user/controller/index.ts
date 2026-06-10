import type { RequestHandler } from 'express';

import type { UserServicePort } from '../interfaces/user-service.port';
import { getMe } from './core/get-me.core';

type UserController = {
  getMe: RequestHandler;
};

export const userController = (deps: {
  userService: UserServicePort;
}): UserController => ({
  getMe: getMe(deps),
});

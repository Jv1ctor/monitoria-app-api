import type { Request, Response } from 'express';

import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';

import type { UserServicePort } from '../../interfaces/user-service.port';

export const getMe =
  (deps: { userService: UserServicePort }) =>
  async (request: Request, response: Response) => {
    const { userService } = deps;

    if (!request.user) {
      throw new UnauthorizedError({ message: 'Usuário não autenticado' });
    }

    const result = await userService.getMe(request.user.id, request.user.role);

    response.status(200).json(result);
  };

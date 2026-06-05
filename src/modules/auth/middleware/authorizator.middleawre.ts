import type { NextFunction, Request, Response } from 'express';

import type { Role } from '@/generated/prisma/enums';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';

export const authorizatorMiddleware =
  (role: Role[]) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new UnauthorizedError({ message: 'Usuário não autenticado' });
    }

    if (!role.includes(request.user.role)) {
      throw new ForbiddenError({
        message: 'Não é possível acessar esse recurso',
      });
    }

    next();
  };

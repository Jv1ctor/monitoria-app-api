import type { NextFunction, Request, Response } from 'express';

import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';
import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';
import { verifyJwt } from '@/shared/jwt';

import type { PayloadJwtDto } from '../dto/payload-jwt.dto';

export const authenticatorMiddleware =
  (deps: { userRepo: UserRepositoryPort }) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    const { userRepo } = deps;
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError({ message: 'Token Não informado' });
    }

    const [authCode, token] = authHeader.split(' ');

    if (authCode !== 'Bearer' || !token) {
      throw new UnauthorizedError({ message: 'Token Inválido' });
    }

    let decoded: PayloadJwtDto;

    try {
      decoded = verifyJwt<PayloadJwtDto>(token);
    } catch {
      throw new UnauthorizedError({
        message: 'Token Inválido',
      });
    }

    const user = await userRepo.findById(decoded.user_id);

    if (!user) {
      throw new UnauthorizedError({ message: 'Token Inválido' });
    }

    request.user = {
      id: user.id,
      role: user.role,
      registration: user.registration,
    };

    next();
  };

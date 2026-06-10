import type { Request, Response } from 'express';

import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';

import type { RatingServicePort } from '../../interfaces/rating-service.port';

export const listGiven =
  (deps: { ratingService: RatingServicePort }) =>
  async (request: Request, response: Response) => {
    const { ratingService } = deps;

    if (!request.user) {
      throw new UnauthorizedError({ message: 'Usuário não autenticado' });
    }

    const result = await ratingService.listGiven(request.user.id);

    response.status(200).json(result);
  };

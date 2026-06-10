import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';
import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';

import { CreateRatingRequestDto } from '../../dto/request/create-rating-request.dto';
import type { RatingServicePort } from '../../interfaces/rating-service.port';

export const create =
  (deps: { ratingService: RatingServicePort }) =>
  async (request: Request, response: Response) => {
    const { ratingService } = deps;

    if (!request.user) {
      throw new UnauthorizedError({ message: 'Usuário não autenticado' });
    }

    const { success, data, error } =
      await CreateRatingRequestDto.safeParseAsync(request.body);

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await ratingService.create(request.user.id, data);

    response.status(200).json(result);
  };

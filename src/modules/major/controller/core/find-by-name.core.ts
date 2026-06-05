import type { Request, RequestHandler, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { MajorNameQueryDto } from '../../dto/major-name-query.dto';
import type { MajorServicePort } from '../../interfaces/major-service.port';

export const findByName = (deps: {
  majorService: MajorServicePort;
}): RequestHandler => {
  return async (request: Request, response: Response) => {
    const { majorService } = deps;

    const { success, data, error } = await MajorNameQueryDto.safeParseAsync(
      request.query,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await majorService.findByName(data.name);

    response.status(200).json(result);
  };
};

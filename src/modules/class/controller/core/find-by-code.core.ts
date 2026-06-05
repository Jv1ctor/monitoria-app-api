import type { Request, RequestHandler, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { ClassCodeQueryDto } from '../../dto/class-code-query.dto';
import type { ClassServicePort } from '../../interfaces/class-service.port';

export const findByCode = (deps: {
  classService: ClassServicePort;
}): RequestHandler => {
  return async (request: Request, response: Response) => {
    const { classService } = deps;

    const { success, data, error } = await ClassCodeQueryDto.safeParseAsync(
      request.query,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await classService.findByCode(data.code);

    response.status(200).json(result);
  };
};

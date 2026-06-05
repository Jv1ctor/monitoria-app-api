import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { ClassIdParameterDto } from '../../dto/class-id-params.dto';
import type { ClassServicePort } from '../../interfaces/class-service.port';

export const remove =
  (deps: { classService: ClassServicePort }) =>
  async (request: Request, response: Response) => {
    const { classService } = deps;

    const { success, data, error } = await ClassIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await classService.remove(data.id);

    response.status(200).json(result);
  };

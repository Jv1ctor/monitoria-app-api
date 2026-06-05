import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { ClassIdParameterDto } from '../../dto/class-id-params.dto';
import { UpdateClassDto } from '../../dto/update-class.dto';
import type { ClassServicePort } from '../../interfaces/class-service.port';

export const update =
  (deps: { classService: ClassServicePort }) =>
  async (request: Request, response: Response) => {
    const { classService } = deps;

    const parsedParams = await ClassIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!parsedParams.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedParams.error,
      });
    }

    const parsedBody = await UpdateClassDto.safeParseAsync(request.body);

    if (!parsedBody.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedBody.error,
      });
    }

    const result = await classService.update(
      parsedParams.data.id,
      parsedBody.data,
    );

    response.status(200).json(result);
  };

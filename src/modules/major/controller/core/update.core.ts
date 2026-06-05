import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { MajorIdParameterDto } from '../../dto/major-id-params.dto';
import { UpdateMajorDto } from '../../dto/update-major.dto';
import type { MajorServicePort } from '../../interfaces/major-service.port';

export const update =
  (deps: { majorService: MajorServicePort }) =>
  async (request: Request, response: Response) => {
    const { majorService } = deps;

    const parsedParams = await MajorIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!parsedParams.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedParams.error,
      });
    }

    const parsedBody = await UpdateMajorDto.safeParseAsync(request.body);

    if (!parsedBody.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedBody.error,
      });
    }

    const result = await majorService.update(
      parsedParams.data.id,
      parsedBody.data,
    );

    response.status(200).json(result);
  };

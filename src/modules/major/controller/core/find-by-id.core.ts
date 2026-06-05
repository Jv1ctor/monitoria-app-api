import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { MajorIdParameterDto } from '../../dto/major-id-params.dto';
import type { MajorServicePort } from '../../interfaces/major-service.port';

export const findById =
  (deps: { majorService: MajorServicePort }) =>
  async (request: Request, response: Response) => {
    const { majorService } = deps;

    const { success, data, error } = await MajorIdParameterDto.safeParseAsync(
      request.params,
    );

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await majorService.findById(data.id);

    response.status(200).json(result);
  };

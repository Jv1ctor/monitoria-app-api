import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { CreateMajorDto } from '../../dto/create-major.dto';
import type { MajorServicePort } from '../../interfaces/major-service.port';

export const create =
  (deps: { majorService: MajorServicePort }) =>
  async (request: Request, response: Response) => {
    const { majorService } = deps;
    const body = request.body;

    const { success, data, error } = await CreateMajorDto.safeParseAsync(body);

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await majorService.create(data);

    response.status(200).json(result);
  };

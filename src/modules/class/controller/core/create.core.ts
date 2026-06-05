import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { CreateClassDto } from '../../dto/create-class.dto';
import type { ClassServicePort } from '../../interfaces/class-service.port';

export const create =
  (deps: { classService: ClassServicePort }) =>
  async (request: Request, response: Response) => {
    const { classService } = deps;
    const body = request.body;

    const { success, data, error } = await CreateClassDto.safeParseAsync(body);

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await classService.create(data);

    response.status(200).json(result);
  };

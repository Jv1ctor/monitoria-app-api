import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { FrequencysIdParamsDto } from '../../dto/params/frequencys-id-params.dto';
import type { FrequencysServicePort } from '../../interfaces/frequencys-service.port';

export const remove =
  (deps: { frequencysService: FrequencysServicePort }) =>
  async (request: Request, response: Response) => {
    const { frequencysService } = deps;

    const parsed = await FrequencysIdParamsDto.safeParseAsync(request.params);
    if (!parsed.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsed.error,
      });
    }

    const user = request.user!;
    const result = await frequencysService.remove(parsed.data.id, {
      id: user.id,
      role: user.role,
    });

    response.status(200).json(result);
  };

import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { FrequencysIdParamsDto } from '../../dto/params/frequencys-id-params.dto';
import { UpdateFrequencysValueRequestDto } from '../../dto/request/update-frequencys-value-request.dto';
import type { FrequencysServicePort } from '../../interfaces/frequencys-service.port';

export const updateValue =
  (deps: { frequencysService: FrequencysServicePort }) =>
  async (request: Request, response: Response) => {
    const { frequencysService } = deps;

    const parsedParams = await FrequencysIdParamsDto.safeParseAsync(
      request.params,
    );
    if (!parsedParams.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedParams.error,
      });
    }

    const parsedBody = await UpdateFrequencysValueRequestDto.safeParseAsync(
      request.body,
    );
    if (!parsedBody.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsedBody.error,
      });
    }

    const user = request.user!;
    const result = await frequencysService.updateValue(
      parsedParams.data.id,
      parsedBody.data,
      { id: user.id, role: user.role },
    );

    response.status(200).json(result);
  };

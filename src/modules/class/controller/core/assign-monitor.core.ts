import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { ClassIdParameterDto } from '../../dto/class-id-params.dto';
import { AssignMonitorRequestDto } from '../../dto/request/assign-monitor-request.dto';
import type { ClassServicePort } from '../../interfaces/class-service.port';

export const assignMonitor =
  (deps: { classService: ClassServicePort }) =>
  async (request: Request, response: Response) => {
    const { classService } = deps;

    const {
      success: paramsOk,
      data: params,
      error: paramsError,
    } = await ClassIdParameterDto.safeParseAsync(request.params);

    if (!paramsOk) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: paramsError,
      });
    }

    const {
      success: bodyOk,
      data: body,
      error: bodyError,
    } = await AssignMonitorRequestDto.safeParseAsync(request.body);

    if (!bodyOk) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: bodyError,
      });
    }

    const result = await classService.assignMonitor(params.id, body);

    response.status(200).json(result);
  };

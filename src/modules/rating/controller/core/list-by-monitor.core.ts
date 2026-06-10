import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { RatingMonitorIdParamsDto } from '../../dto/params/rating-monitor-id-params.dto';
import type { RatingServicePort } from '../../interfaces/rating-service.port';

export const listByMonitor =
  (deps: { ratingService: RatingServicePort }) =>
  async (request: Request, response: Response) => {
    const { ratingService } = deps;

    const { success, data, error } =
      await RatingMonitorIdParamsDto.safeParseAsync(request.params);

    if (!success) {
      throw new BadRequestError({ message: 'erro de validacao', error });
    }

    const result = await ratingService.listByMonitor(data.monitor_id);

    response.status(200).json(result);
  };

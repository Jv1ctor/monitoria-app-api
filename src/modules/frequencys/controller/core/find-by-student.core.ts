import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { FrequencysStudentQueryDto } from '../../dto/query/frequencys-student-query.dto';
import type { FrequencysServicePort } from '../../interfaces/frequencys-service.port';

export const findByStudent =
  (deps: { frequencysService: FrequencysServicePort }) =>
  async (request: Request, response: Response) => {
    const { frequencysService } = deps;

    const parsed = await FrequencysStudentQueryDto.safeParseAsync(
      request.query,
    );
    if (!parsed.success) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: parsed.error,
      });
    }

    const user = request.user!;
    const result = await frequencysService.findByStudent(
      parsed.data.student_id,
      { id: user.id, role: user.role },
    );

    response.status(200).json(result);
  };

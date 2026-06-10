import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';
import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';

import { StudentIdParamsDto } from '../../dto/params/student-id-params.dto';
import { PromoteStudentRequestDto } from '../../dto/request/promote-student-request.dto';
import type { StudentServicePort } from '../../interfaces/student-service.port';

export const promote =
  (deps: { studentService: StudentServicePort }) =>
  async (request: Request, response: Response) => {
    const { studentService } = deps;

    if (!request.user) {
      throw new UnauthorizedError({ message: 'Usuário não autenticado' });
    }

    const {
      success: paramsOk,
      data: params,
      error: paramsError,
    } = await StudentIdParamsDto.safeParseAsync(request.params);

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
    } = await PromoteStudentRequestDto.safeParseAsync(request.body);

    if (!bodyOk) {
      throw new BadRequestError({
        message: 'erro de validacao',
        error: bodyError,
      });
    }

    const result = await studentService.promote(params.id, body);

    response.status(200).json(result);
  };

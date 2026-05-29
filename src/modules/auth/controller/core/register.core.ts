import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { RegisterUserRequestDto } from '../../dto/request/register-user-request.dto';
import type { AuthServicePort } from '../../interfaces/auth-service.port';

export const register =
  (deps: { authService: AuthServicePort }) =>
  async (request: Request, response: Response) => {
    const { authService } = deps;
    const body = request.body;

    const { success, data, error } =
      await RegisterUserRequestDto.safeParseAsync(body);

    if (!success) {
      throw new BadRequestError({ message: error.message });
    }

    const result = await authService.register(data);

    response.status(200).json(result);
  };

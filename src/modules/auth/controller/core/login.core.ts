import type { Request, Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import { LoginUserRequestDto } from '../../dto/request/login-user-request.dto';
import type { AuthServicePort } from '../../interfaces/auth-service.port';

export const login =
  (deps: { authService: AuthServicePort }) =>
  async (request: Request, response: Response) => {
    const { authService } = deps;
    const body = request.body;

    const { success, data, error } =
      await LoginUserRequestDto.safeParseAsync(body);

    if (!success) {
      throw new BadRequestError({ message: error.message });
    }

    const result = await authService.login(data);

    response.status(200).json(result);
  };

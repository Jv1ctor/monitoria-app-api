import bcrypt from 'bcrypt';

import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';
import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';
import { signJwt } from '@/shared/jwt';

import type { PayloadJwtDto } from '../../dto/payload-jwt.dto';
import { LoginUserRequestDto } from '../../dto/request/login-user-request.dto';
import type { LoginUserResponseDto } from '../../dto/response/login-user-response.dto';

export const login =
  (deps: { userRepo: UserRepositoryPort }) =>
  async (data: LoginUserRequestDto): Promise<LoginUserResponseDto> => {
    const { userRepo } = deps;

    const user = await userRepo.findByRegistration(data.registration);

    if (!user) {
      throw new BadRequestError({ message: 'Crednciais Inválidas' });
    }

    const compareResult = await bcrypt.compare(data.password, user.password);

    if (!compareResult) {
      throw new BadRequestError({ message: 'Credenciais Inválidas' });
    }

    const token = signJwt<PayloadJwtDto>({
      user_id: user.id,
      role: user.role,
      name: user.first_name,
    });

    return {
      token: token,
    };
  };

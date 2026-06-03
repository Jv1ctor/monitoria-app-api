import bcrypt from 'bcrypt';

import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import { RegisterUserRequestDto } from '../../dto/request/register-user-request.dto';
import type { RegisterUserResponseDto } from '../../dto/response/register-user-response.dto';

export const register =
  (deps: { userRepo: UserRepositoryPort; majorRepo: MajorRepositoryPort }) =>
  async (data: RegisterUserRequestDto): Promise<RegisterUserResponseDto> => {
    const { userRepo, majorRepo } = deps;

    const existRegistration = await userRepo.findByRegistration(
      data.registration,
    );
    if (existRegistration) {
      throw new ConflictError({ message: 'Matrícula já cadastrada' });
    }

    const existEmail = await userRepo.findByEmail(data.email);
    if (existEmail) {
      throw new ConflictError({ message: 'Email já cadastrada' });
    }

    const major = await majorRepo.findById(data.major_id);
    if (!major) {
      throw new NotFoundError({ message: 'Não foi possivel encontrar curso' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await userRepo.create({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: hashedPassword,
      registration: data.registration,
      major: { connect: major },
    });

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      major: major.name,
      registration: user.registration,
    };
  };

import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { ClassDto } from '../../dto/class.dto';
import type { CreateClassDto } from '../../dto/create-class.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const create =
  (deps: {
    classRepo: ClassRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
  }) =>
  async (input: CreateClassDto): Promise<ClassDto> => {
    const { classRepo, profileRepo } = deps;

    const exist = await classRepo.findByCode(input.code);

    if (exist) {
      throw new ConflictError({ message: 'Turma já cadastrada' });
    }

    const existMonitor = await profileRepo.findByUserId(input.monitor_id, {
      role: 'MONITOR',
    });

    if (!existMonitor) {
      throw new NotFoundError({ message: 'Monitor não existe' });
    }

    const classEntity = await classRepo.create({
      code: input.code,
      monitor: { connect: { user_id: input.monitor_id } },
      subject: { connect: { id: input.subject_id } },
    });

    return {
      id: classEntity.id,
      code: classEntity.code,
      monitor_id: classEntity.monitor_id,
      subject_id: classEntity.subject_id,
      createdAt: classEntity.created_at,
    };
  };

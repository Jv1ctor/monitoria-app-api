import { ConflictError } from '@/shared/handle-error/errors/conflict.error';

import type { ClassDto } from '../../dto/class.dto';
import type { CreateClassDto } from '../../dto/create-class.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const create =
  (deps: { repository: ClassRepositoryPort }) =>
  async (input: CreateClassDto): Promise<ClassDto> => {
    const { repository } = deps;

    const exist = await repository.findByCode(input.code);

    if (exist) {
      throw new ConflictError({ message: 'Turma já cadastrada' });
    }

    const classEntity = await repository.create({
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

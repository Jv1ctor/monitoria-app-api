import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { ClassDto } from '../../dto/class.dto';
import type { UpdateClassDto } from '../../dto/update-class.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const update =
  (deps: { repository: ClassRepositoryPort }) =>
  async (id: number, input: UpdateClassDto): Promise<ClassDto> => {
    const { repository } = deps;

    const existing = await repository.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'turma nao encontrada' });
    }

    const classEntity = await repository.update(id, {
      ...(input.code !== undefined && { code: input.code }),
      ...(input.monitor_id !== undefined && {
        monitor: { connect: { user_id: input.monitor_id } },
      }),
      ...(input.subject_id !== undefined && {
        subject: { connect: { id: input.subject_id } },
      }),
    });

    return {
      id: classEntity.id,
      code: classEntity.code,
      monitor_id: classEntity.monitor_id,
      subject_id: classEntity.subject_id,
      createdAt: classEntity.created_at,
    };
  };

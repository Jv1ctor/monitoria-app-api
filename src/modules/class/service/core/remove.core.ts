import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { ClassDto } from '../../dto/class.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const remove =
  (deps: { classRepo: ClassRepositoryPort }) =>
  async (id: number): Promise<ClassDto> => {
    const { classRepo } = deps;

    const existing = await classRepo.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'turma nao encontrada' });
    }

    // const inUse = await lessonRepo.classInUse(id);

    // if (inUse) {
    //   throw new ConflictError({ message: 'turma em uso' });
    // }

    const classEntity = await classRepo.remove(id);

    return {
      id: classEntity.id,
      code: classEntity.code,
      monitor_id: classEntity.monitor_id,
      subject_id: classEntity.subject_id,
      createdAt: classEntity.created_at,
    };
  };

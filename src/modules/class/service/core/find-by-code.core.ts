import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { ClassDto } from '../../dto/class.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const findByCode =
  (deps: { classRepo: ClassRepositoryPort }) =>
  async (code: string): Promise<ClassDto> => {
    const { classRepo } = deps;

    const classEntity = await classRepo.findByCode(code);

    if (!classEntity) {
      throw new NotFoundError({ message: 'turma nao encontrada' });
    }

    return {
      id: classEntity.id,
      code: classEntity.code,
      monitor_id: classEntity.monitor_id,
      subject_id: classEntity.subject_id,
      createdAt: classEntity.created_at,
    };
  };

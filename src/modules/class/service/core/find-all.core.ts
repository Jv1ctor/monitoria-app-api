import type { ClassDto } from '../../dto/class.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const findAll =
  (deps: { classRepo: ClassRepositoryPort }) =>
  async (): Promise<ClassDto[]> => {
    const { classRepo } = deps;

    const classes = await classRepo.findAll();

    return classes.map(classEntity => ({
      id: classEntity.id,
      code: classEntity.code,
      monitor_id: classEntity.monitor_id,
      subject_id: classEntity.subject_id,
      createdAt: classEntity.created_at,
    }));
  };

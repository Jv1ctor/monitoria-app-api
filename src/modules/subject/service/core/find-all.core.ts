import type { SubjectDto } from '../../dto/subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const findAll =
  (deps: { repository: SubjectRepositoryPort }) =>
  async (): Promise<SubjectDto[]> => {
    const { repository } = deps;

    const subjects = await repository.findAll();

    return subjects.map(subject => ({
      id: subject.id,
      code: subject.code,
      name: subject.name,
      major_id: subject.major_id,
      createdAt: subject.created_at,
    }));
  };

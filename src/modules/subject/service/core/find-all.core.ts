import type { SubjectDto } from '../../dto/subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const findAll =
  (deps: { subjectRepo: SubjectRepositoryPort }) =>
  async (): Promise<SubjectDto[]> => {
    const { subjectRepo } = deps;

    const subjects = await subjectRepo.findAll();

    return subjects.map(subject => ({
      id: subject.id,
      code: subject.code,
      name: subject.name,
      major_id: subject.major_id,
      createdAt: subject.created_at,
    }));
  };

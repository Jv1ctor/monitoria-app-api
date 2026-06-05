import type { MajorDto } from '../../dto/major.dto';
import type { MajorRepositoryPort } from '../../interfaces/major-repository.port';

export const findAll =
  (deps: { repository: MajorRepositoryPort }) =>
  async (): Promise<MajorDto[]> => {
    const { repository } = deps;

    const majors = await repository.findAll();

    return majors.map(major => ({
      id: major.id,
      name: major.name,
      createdAt: major.created_at,
    }));
  };

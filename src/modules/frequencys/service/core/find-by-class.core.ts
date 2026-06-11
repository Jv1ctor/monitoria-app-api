import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { FrequencysResponseDto } from '../../dto/response/frequencys-response.dto';
import type { FrequencysRepositoryPort } from '../../interfaces/frequencys-repository.port';
import type { AuthoredUser } from '../../interfaces/frequencys-service.port';

export const findByClass =
  (deps: {
    frequencysRepo: FrequencysRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (
    classId: number,
    user: AuthoredUser,
  ): Promise<FrequencysResponseDto[]> => {
    const { frequencysRepo, classRepo } = deps;

    const cls = await classRepo.findById(classId);
    if (!cls) {
      throw new NotFoundError({ message: 'Turma nao encontrada' });
    }

    if (user.role === 'MONITOR' && cls.monitor_id !== user.id) {
      throw new ForbiddenError({
        message: 'Monitor so pode ver frequencias das proprias turmas',
      });
    }

    const frequencysList = await frequencysRepo.findByClass(classId);

    const filtered =
      user.role === 'STUDENT'
        ? frequencysList.filter(f => f.student_id === user.id)
        : frequencysList;

    return Promise.all(
      filtered.map(async frequencys => {
        const enrolled = await frequencysRepo.isEnrolled(
          classId,
          frequencys.student_id,
        );
        return {
          id: frequencys.id,
          status: frequencys.status,
          value: frequencys.value,
          student_id: frequencys.student_id,
          lesson_id: frequencys.lesson_id,
          createdAt: frequencys.created_at.toISOString(),
          unboundAt: frequencys.unbound_at?.toISOString() ?? undefined,
          enrolled,
          student: {
            id: frequencys.student.user.id,
            first_name: frequencys.student.user.first_name,
            last_name: frequencys.student.user.last_name,
            registration: frequencys.student.user.registration,
          },
        };
      }),
    );
  };

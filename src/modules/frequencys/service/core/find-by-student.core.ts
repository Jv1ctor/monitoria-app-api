import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { LessonRepositoryPort } from '@/modules/lesson/interfaces/lesson-repository.port';
import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { FrequencysResponseDto } from '../../dto/response/frequencys-response.dto';
import type { FrequencysRepositoryPort } from '../../interfaces/frequencys-repository.port';
import type { AuthoredUser } from '../../interfaces/frequencys-service.port';

export const findByStudent =
  (deps: {
    frequencysRepo: FrequencysRepositoryPort;
    lessonRepo: LessonRepositoryPort;
    classRepo: ClassRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
  }) =>
  async (
    studentId: number,
    user: AuthoredUser,
  ): Promise<FrequencysResponseDto[]> => {
    const { frequencysRepo, lessonRepo, classRepo, profileRepo } = deps;

    if (user.role === 'STUDENT' && user.id !== studentId) {
      throw new ForbiddenError({
        message: 'Aluno so pode ver as proprias frequencias',
      });
    }

    const profile = await profileRepo.findByUserId(studentId);
    if (!profile) {
      throw new NotFoundError({ message: 'Perfil academico nao encontrado' });
    }

    const frequencysList = await frequencysRepo.findByStudent(studentId);

    let filtered = frequencysList;

    if (user.role === 'MONITOR') {
      const allowed: typeof frequencysList = [];
      for (const f of frequencysList) {
        if (f.lesson?.class && f.lesson.class.monitor?.user?.id === user.id) {
          allowed.push(f);
        } else {
          const lesson = await lessonRepo.findById(f.lesson_id);
          if (!lesson) continue;
          const cls = await classRepo.findById(lesson.class_id);
          if (cls && cls.monitor_id === user.id) {
            allowed.push(f);
          }
        }
      }
      filtered = allowed;
    }

    return Promise.all(
      filtered.map(async frequencys => {
        const lesson =
          frequencys.lesson ??
          (await lessonRepo.findById(frequencys.lesson_id));
        const classId = lesson?.class_id ?? 0;
        const enrolled = classId
          ? await frequencysRepo.isEnrolled(classId, frequencys.student_id)
          : false;
        return {
          id: frequencys.id,
          status: frequencys.status,
          value: frequencys.value,
          student_id: frequencys.student_id,
          lesson_id: frequencys.lesson_id,
          createdAt: frequencys.created_at.toISOString(),
          unboundAt: frequencys.unbound_at?.toISOString() ?? undefined,
          enrolled,
          lesson: frequencys.lesson
            ? {
                id: frequencys.lesson.id,
                modality: frequencys.lesson.modality,
                date_time: frequencys.lesson.date_time.toISOString(),
                description: frequencys.lesson.description,
                class_id: frequencys.lesson.class_id,
                createdAt: frequencys.lesson.created_at.toISOString(),
                class: frequencys.lesson.class
                  ? {
                      id: frequencys.lesson.class.id,
                      code: frequencys.lesson.class.code,
                      subject: frequencys.lesson.class.subject
                        ? {
                            id: frequencys.lesson.class.subject.id,
                            name: frequencys.lesson.class.subject.name,
                          }
                        : undefined,
                      monitor: frequencys.lesson.class.monitor?.user
                        ? {
                            id: frequencys.lesson.class.monitor.user.id,
                            first_name:
                              frequencys.lesson.class.monitor.user.first_name,
                            last_name:
                              frequencys.lesson.class.monitor.user.last_name,
                          }
                        : undefined,
                    }
                  : undefined,
              }
            : undefined,
        };
      }),
    );
  };

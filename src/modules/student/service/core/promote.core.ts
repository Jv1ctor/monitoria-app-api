import { Role } from '@/generated/prisma/browser';
import type { SubjectRepositoryPort } from '@/modules/subject/interfaces/subject-repository.port';
import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { PromoteStudentRequestDto } from '../../dto/request/promote-student-request.dto';
import type { StudentDto } from '../../dto/student.dto';

export const promote =
  (deps: {
    userRepo: UserRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
    subjectRepo: SubjectRepositoryPort;
  }) =>
  async (
    userId: number,
    input: PromoteStudentRequestDto,
  ): Promise<StudentDto> => {
    const { userRepo, profileRepo, subjectRepo } = deps;

    const user = await userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError({ message: 'Usuário não encontrado' });
    }
    if (user.role !== Role.STUDENT) {
      throw new ConflictError({ message: 'Usuário não é um student' });
    }

    const subject = await subjectRepo.findById(input.subject_id);
    if (!subject) {
      throw new NotFoundError({ message: 'Disciplina não encontrada' });
    }

    const profile = await profileRepo.findByUserId(userId);
    if (profile && profile.major_id !== subject.major_id) {
      throw new ConflictError({
        message: 'Disciplina não compatível com o curso do aluno',
      });
    }

    const updated = await userRepo.update(userId, { role: Role.MONITOR });

    return {
      id: updated.id,
      registration: updated.registration,
      email: updated.email,
      first_name: updated.first_name,
      last_name: updated.last_name,
      role: updated.role,
      createdAt: updated.created_at,
    };
  };

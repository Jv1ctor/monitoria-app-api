import type { Role } from '@/generated/prisma/enums';
import type { FrequencysResponseDto } from '@/modules/frequencys/dto/response/frequencys-response.dto';

import type { CreateLessonDto } from '../dto/create-lesson.dto';
import type { LessonDto } from '../dto/lesson.dto';
import type { UpdateLessonDto } from '../dto/update-lesson.dto';

export type AuthoredUser = {
  id: number;
  role: Role;
};

export type LessonServicePort = {
  create(input: CreateLessonDto): Promise<LessonDto>;
  findById(id: number): Promise<LessonDto>;
  findAll(): Promise<LessonDto[]>;
  findByClassId(classId: number): Promise<LessonDto[]>;
  update(id: number, input: UpdateLessonDto): Promise<LessonDto>;
  remove(id: number): Promise<LessonDto>;
  enroll: (
    lessonId: number,
    user: AuthoredUser,
  ) => Promise<{ lesson_user_id: number; frequencys: FrequencysResponseDto }>;
  findEnrolled: (user: AuthoredUser) => Promise<LessonDto[]>;
  leave: (lessonId: number, user: AuthoredUser) => Promise<{ id: number }>;
};

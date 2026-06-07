import type { CreateLessonDto } from '../dto/create-lesson.dto';
import type { LessonDto } from '../dto/lesson.dto';
import type { UpdateLessonDto } from '../dto/update-lesson.dto';

export type LessonServicePort = {
  create(input: CreateLessonDto): Promise<LessonDto>;
  findById(id: number): Promise<LessonDto>;
  findAll(): Promise<LessonDto[]>;
  findByClassId(classId: number): Promise<LessonDto[]>;
  update(id: number, input: UpdateLessonDto): Promise<LessonDto>;
  remove(id: number): Promise<LessonDto>;
};

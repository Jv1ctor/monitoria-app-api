import type { CreateSubjectDto } from '../dto/create-subject.dto';
import type { SubjectDto } from '../dto/subject.dto';
import type { UpdateSubjectDto } from '../dto/update-subject.dto';

export type SubjectServicePort = {
  create(input: CreateSubjectDto): Promise<SubjectDto>;
  findById(id: number): Promise<SubjectDto>;
  findByCode(code: string): Promise<SubjectDto>;
  findAll(): Promise<SubjectDto[]>;
  update(id: number, input: UpdateSubjectDto): Promise<SubjectDto>;
  remove(id: number): Promise<SubjectDto>;
};

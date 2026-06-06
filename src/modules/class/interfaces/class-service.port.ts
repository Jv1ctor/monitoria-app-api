import type { ClassDto } from '../dto/class.dto';
import type { CreateClassDto } from '../dto/create-class.dto';
import type { UpdateClassDto } from '../dto/update-class.dto';

export type ClassServicePort = {
  create(input: CreateClassDto): Promise<ClassDto>;
  findById(id: number): Promise<ClassDto>;
  findByCode(code: string): Promise<ClassDto>;
  findAll(): Promise<ClassDto[]>;
  update(id: number, input: UpdateClassDto): Promise<ClassDto>;
  remove(id: number): Promise<ClassDto>;
};

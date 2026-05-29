import type { CreateMajorDto } from '../dto/create-major.dto';
import type { MajorDto } from '../dto/major.dto';
import type { UpdateMajorDto } from '../dto/update-major.dto';

export type MajorServicePort = {
  create(input: CreateMajorDto): Promise<MajorDto>;
  findById(id: number): Promise<MajorDto>;
  findAll(): Promise<MajorDto[]>;
  update(id: number, input: UpdateMajorDto): Promise<MajorDto>;
  remove(id: number): Promise<MajorDto>;
};

import { randomUUID } from 'node:crypto';

import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';
import type { StorageProvider } from '@/shared/storage/storage.provider';

import type { CreateUploadUrlRequestDto } from '../../dto/request/create-upload-url-request.dto';
import type { GetUploadUrlResponseDto } from '../../dto/response/get-upload-url-response.dto';
import type { DocumentRepositoryPort } from '../../interface/document-repository.port';

export const getSignedUpload =
  (deps: {
    documentRepo: DocumentRepositoryPort;
    storageProvider: StorageProvider;
    classRepo: ClassRepositoryPort;
  }) =>
  async (data: CreateUploadUrlRequestDto): Promise<GetUploadUrlResponseDto> => {
    const { storageProvider, documentRepo, classRepo } = deps;

    const extension = data.file_name.split('.').pop()?.toLowerCase();
    const key = `uploads/${randomUUID()}.${extension}`;

    const existClass = await classRepo.findById(data.class_id);

    if (!existClass) {
      throw new NotFoundError({ message: 'Turma não encontrada' });
    }

    await documentRepo.create({
      filename: data.file_name,
      mime_type: data.contentType,
      size: data.size,
      description: data.description,
      class: { connect: { id: data.class_id } },
      key,
    });

    const upload_url = await storageProvider.getSignedUploadUrl(key);

    return {
      key,
      upload_url,
    };
  };

import { randomUUID } from 'node:crypto';

import type { StorageProvider } from '@/shared/storage/storage.provider';

import type { CreateUploadUrlRequestDto } from '../../dto/request/create-upload-url-request.dto';
import type { GetUploadUrlResponseDto } from '../../dto/response/get-upload-url-response.dto';
import type { DocumentRepositoryPort } from '../../interface/document-repository.port';

export const getSignedUpload =
  (deps: {
    documentRepo: DocumentRepositoryPort;
    storageProvider: StorageProvider;
  }) =>
  async (data: CreateUploadUrlRequestDto): Promise<GetUploadUrlResponseDto> => {
    const { storageProvider, documentRepo } = deps;

    // TODO: fazer modulo de class
    const extension = data.file_name.split('.').pop()?.toLowerCase();

    const key = `uploads/${randomUUID()}.${extension}`;

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

import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';
import type { StorageProvider } from '@/shared/storage/storage.provider';

import type { DocumentDto } from '../../dto/document.dto';
import type { DocumentRepositoryPort } from '../../interface/document-repository.port';

export const remove =
  (deps: {
    documentRepo: DocumentRepositoryPort;
    storageProvider: StorageProvider;
  }) =>
  async (id: number): Promise<DocumentDto> => {
    const { documentRepo, storageProvider } = deps;

    const existing = await documentRepo.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'Documento nao encontrado' });
    }

    await storageProvider.delete(existing.key);

    const document = await documentRepo.remove(id);

    return {
      id: document.id,
      key: document.key,
      filename: document.filename,
      mime_type: document.mime_type,
      size: document.size,
      description: document.description,
      class_id: document.class_id,
      createdAt: document.created_at,
    };
  };

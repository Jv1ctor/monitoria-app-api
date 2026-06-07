import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { DocumentDto } from '../../dto/document.dto';
import type { DocumentRepositoryPort } from '../../interface/document-repository.port';

export const findById =
  (deps: { documentRepo: DocumentRepositoryPort }) =>
  async (id: number): Promise<DocumentDto> => {
    const { documentRepo } = deps;

    const document = await documentRepo.findById(id);

    if (!document) {
      throw new NotFoundError({ message: 'Documento nao encontrado' });
    }

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

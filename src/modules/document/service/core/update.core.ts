import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { DocumentDto } from '../../dto/document.dto';
import type { UpdateDocumentRequestDto } from '../../dto/request/update-document-request.dto';
import type { DocumentRepositoryPort } from '../../interface/document-repository.port';

export const update =
  (deps: { documentRepo: DocumentRepositoryPort }) =>
  async (id: number, input: UpdateDocumentRequestDto): Promise<DocumentDto> => {
    const { documentRepo } = deps;

    const existing = await documentRepo.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'Documento nao encontrado' });
    }

    const updated = await documentRepo.update(id, {
      ...(input.description !== undefined && {
        description: input.description,
      }),
    });

    return {
      id: updated.id,
      key: updated.key,
      filename: updated.filename,
      mime_type: updated.mime_type,
      size: updated.size,
      description: updated.description,
      class_id: updated.class_id,
      createdAt: updated.created_at,
    };
  };

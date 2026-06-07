import type { DocumentDto } from '../../dto/document.dto';
import type { DocumentRepositoryPort } from '../../interface/document-repository.port';

export const findAllByClass =
  (deps: { documentRepo: DocumentRepositoryPort }) =>
  async (classId: number): Promise<DocumentDto[]> => {
    const { documentRepo } = deps;

    const documents = await documentRepo.findAllByClass(classId);

    return documents.map(document => ({
      id: document.id,
      key: document.key,
      filename: document.filename,
      mime_type: document.mime_type,
      size: document.size,
      description: document.description,
      class_id: document.class_id,
      createdAt: document.created_at,
    }));
  };

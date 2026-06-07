import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';
import type { StorageProvider } from '@/shared/storage/storage.provider';

import type { GetSignedDownloadAndPreviewResponseDto } from '../../dto/response/get-download-and-preview-response.dto';
import type { DocumentRepositoryPort } from '../../interface/document-repository.port';

export const getSignedDownloadAndPreviewUrl =
  (deps: {
    documentRepo: DocumentRepositoryPort;
    storageProvider: StorageProvider;
  }) =>
  async (key: string): Promise<GetSignedDownloadAndPreviewResponseDto> => {
    const { documentRepo, storageProvider } = deps;

    const document = await documentRepo.findByKey(key);

    if (!document) {
      throw new NotFoundError({ message: 'Documento não encontrado' });
    }

    const downloadUrl = await storageProvider.getSignedDownloadUrl(
      document.key,
      document.filename,
    );
    const previewUrl = await storageProvider.getSignedPreviewUrl(document.key);

    return {
      download_url: downloadUrl,
      preview_url: previewUrl,
    };
  };

import type { DocumentDto } from '../dto/document.dto';
import type { CreateUploadUrlRequestDto } from '../dto/request/create-upload-url-request.dto';
import type { UpdateDocumentRequestDto } from '../dto/request/update-document-request.dto';
import type { GetSignedDownloadAndPreviewResponseDto } from '../dto/response/get-download-and-preview-response.dto';
import type { GetUploadUrlResponseDto } from '../dto/response/get-upload-url-response.dto';

export type DocumentServicePort = {
  getSignedUpload(
    data: CreateUploadUrlRequestDto,
  ): Promise<GetUploadUrlResponseDto>;
  getSignedDownloadAndPreview(
    key: string,
  ): Promise<GetSignedDownloadAndPreviewResponseDto>;
  findById(id: number): Promise<DocumentDto>;
  findAllByClass(classId: number): Promise<DocumentDto[]>;
  update(id: number, input: UpdateDocumentRequestDto): Promise<DocumentDto>;
  remove(id: number): Promise<DocumentDto>;
};

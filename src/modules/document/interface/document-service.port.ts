import type { CreateUploadUrlRequestDto } from '../dto/request/create-upload-url-request.dto';
import type { GetSignedDownloadAndPreviewResponseDto } from '../dto/response/get-download-and-preview-response.dto';
import type { GetUploadUrlResponseDto } from '../dto/response/get-upload-url-response.dto';

export type DocumentServicePort = {
  getSignedUpload(
    data: CreateUploadUrlRequestDto,
  ): Promise<GetUploadUrlResponseDto>;
  getSignedDownloadAndPreview(
    key: string,
  ): Promise<GetSignedDownloadAndPreviewResponseDto>;
};

import type { CreateUploadUrlRequestDto } from '../dto/request/create-upload-url-request.dto';
import type { GetUploadUrlResponseDto } from '../dto/response/get-upload-url-response.dto';

export type DocumentServicePort = {
  getSignedUpload(
    data: CreateUploadUrlRequestDto,
  ): Promise<GetUploadUrlResponseDto>;
};

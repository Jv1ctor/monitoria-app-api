export type StorageProvider = {
  delete(key: string): Promise<void>;

  getSignedUploadUrl(key: string, expiresIn?: number): Promise<string>;

  getSignedDownloadUrl(
    key: string,
    filename: string,
    expiresIn?: number,
  ): Promise<string>;

  getSignedPreviewUrl(key: string, expiresIn?: number): Promise<string>;
};

export type DocumentDto = {
  id: number;
  key: string;
  filename: string;
  mime_type: string;
  size: number;
  description: string | null;
  class_id: number;
  createdAt: Date;
};

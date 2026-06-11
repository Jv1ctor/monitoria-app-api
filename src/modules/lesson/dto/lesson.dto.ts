export type LessonDto = {
  id: number;
  modality: string;
  date_time: Date;
  description: string | null;
  class_id: number;
  createdAt: Date;
  class?: {
    id: number;
    code: string;
    subject?: { id: number; name: string };
    monitor?: { id: number; first_name: string; last_name: string };
  };
};

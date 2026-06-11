export type ClassDto = {
  id: number;
  code: string;
  monitor_id: number;
  subject_id: number;
  createdAt: Date;
  subject?: { id: number; name: string; code: string };
  monitor?: { id: number; first_name: string; last_name: string };
};

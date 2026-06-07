export type FrequencysDto = {
  id: number;
  status: 'PENDING' | 'FINISHED';
  value: boolean;
  student_id: number;
  lesson_id: number;
  createdAt: Date;
  unboundAt: Date | null;
};

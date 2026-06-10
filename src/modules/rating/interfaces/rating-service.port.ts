import type { RatingDto } from '../dto/rating.dto';
import type { CreateRatingRequestDto } from '../dto/request/create-rating-request.dto';

export type RatingServicePort = {
  create(studentId: number, input: CreateRatingRequestDto): Promise<RatingDto>;
  listGiven(studentId: number): Promise<RatingDto[]>;
  listReceived(monitorId: number): Promise<RatingDto[]>;
  listByMonitor(monitorId: number): Promise<RatingDto[]>;
};

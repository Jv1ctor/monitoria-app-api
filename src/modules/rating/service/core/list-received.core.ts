import type { RatingDto } from '../../dto/rating.dto';
import type { RatingRepositoryPort } from '../../interfaces/rating-repository.port';

export const listReceived =
  (deps: { ratingRepo: RatingRepositoryPort }) =>
  async (monitorId: number): Promise<RatingDto[]> => {
    const { ratingRepo } = deps;
    const ratings = await ratingRepo.findAllByMonitor(monitorId);
    return ratings.map(r => ({
      id: r.id,
      rate: r.rate,
      monitor_id: r.monitor_id,
      createdAt: r.created_at,
    }));
  };

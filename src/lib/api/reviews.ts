import { apiGet } from './config';
import type { ApiReview } from './types';

/**
 * Recent, positive, written reviews across all merchants — for the home page
 * testimonials. `GET /review?target_type=merchant` returns newest-first; we
 * keep only 4★+ with a comment.
 */
export async function getHomeReviews(limit = 3): Promise<ApiReview[]> {
  const data = await apiGet<ApiReview[]>('review', {
    query: { target_type: 'merchant' },
  });
  if (!data) return [];
  return data
    .filter((r) => (r.rating ?? 0) >= 4 && !!r.comment && r.comment.trim().length > 0)
    .slice(0, limit);
}

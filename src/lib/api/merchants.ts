import { apiGet } from './config';
import type { ApiMerchant, ApiMerchantDetail, ApiReview } from './types';

/**
 * List restaurants for the marketing site. Coordinates are optional on the
 * backend — without them merchants come back ordered by rating, which is what
 * we want for a public storefront that has no user location.
 */
export async function getRestaurants(limit = 8): Promise<ApiMerchant[]> {
  const data = await apiGet<ApiMerchant[]>('merchant/customers', {
    query: { merchant_type: 'restaurant', limit },
  });
  return data ?? [];
}

/** The single top-rated restaurant, used for the featured `/merchant` page. */
export async function getFeaturedRestaurant(): Promise<ApiMerchant | null> {
  const list = await getRestaurants(1);
  return list[0] ?? null;
}

/** Full restaurant detail including the menu (categories → products). */
export async function getMerchant(id: string): Promise<ApiMerchantDetail | null> {
  return apiGet<ApiMerchantDetail>(`merchant/customers/${id}`);
}

/** Public reviews for a merchant, newest first. */
export async function getMerchantReviews(id: string): Promise<ApiReview[]> {
  const data = await apiGet<ApiReview[]>(`review/merchant/${id}`);
  return data ?? [];
}

/** Distinct restaurant names for the home marquee. */
export async function getRestaurantNames(limit = 12): Promise<string[]> {
  const list = await getRestaurants(limit);
  return list.map((m) => m.business_name).filter(Boolean);
}

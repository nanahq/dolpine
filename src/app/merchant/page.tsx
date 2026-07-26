import React from 'react';
import { StoreDetail } from '../components/site/StoreDetail';
import { getFeaturedRestaurant, getMerchant, getMerchantReviews } from '../../lib/api/merchants';
import { SAMPLE_MERCHANT_DETAIL, SAMPLE_REVIEWS } from '../../lib/api/sample';

export const revalidate = 300;

export const metadata = {
  title: 'Browse a store',
  description: 'A live look at a Nana restaurant — menu, prices and ratings. Ordering happens in the app.',
};

/**
 * Featured store page. Shows the top-rated live restaurant; falls back to a
 * representative sample when the API returns nothing (e.g. offline build).
 */
export default async function MerchantPage() {
  const featured = await getFeaturedRestaurant();

  if (featured) {
    const [detail, reviews] = await Promise.all([
      getMerchant(featured.id),
      getMerchantReviews(featured.id),
    ]);
    if (detail) {
      return <StoreDetail detail={detail} reviews={reviews} />;
    }
  }

  return <StoreDetail detail={SAMPLE_MERCHANT_DETAIL} reviews={SAMPLE_REVIEWS} />;
}

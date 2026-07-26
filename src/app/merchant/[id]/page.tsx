import React from 'react';
import { notFound } from 'next/navigation';
import { StoreDetail } from '../../components/site/StoreDetail';
import { getMerchant, getMerchantReviews } from '../../../lib/api/merchants';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const detail = await getMerchant(params.id);
  return {
    title: detail ? detail.business_name : 'Store',
    description: detail
      ? `${detail.business_name} on Nana — menu, prices and ratings. Ordering happens in the app.`
      : undefined,
  };
}

/** Live restaurant detail, fetched server-side from nana-v2 by id. */
export default async function MerchantDetailPage({ params }: { params: { id: string } }) {
  const [detail, reviews] = await Promise.all([
    getMerchant(params.id),
    getMerchantReviews(params.id),
  ]);

  if (!detail) notFound();

  return <StoreDetail detail={detail} reviews={reviews} />;
}

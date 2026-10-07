import React from 'react';
import { notFound } from 'next/navigation';
import { getMerchant } from '../../../lib/api/merchants';
import { toStoreMenu } from '../../../lib/shop/catalog';
import { hoursSummary, openStatusLabel } from '../../../lib/format';
import { StoreView } from '../../components/store/StoreView';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const detail = await getMerchant(params.id);
  return {
    title: detail ? detail.business_name : 'Store',
    description: detail
      ? `Order from ${detail.business_name} on Nana — see the menu and prices, pay by card or bank transfer, and track your rider live.`
      : undefined,
  };
}

/** A live store: menu fetched server-side from nana-v2, ordering handled client-side. */
export default async function MerchantDetailPage({ params }: { params: { id: string } }) {
  const detail = await getMerchant(params.id);
  if (!detail) notFound();

  return (
    <StoreView
      store={toStoreMenu(detail)}
      hours={hoursSummary(detail.operating_hours)}
      openLabel={openStatusLabel(detail.is_open, detail.operating_hours)}
    />
  );
}

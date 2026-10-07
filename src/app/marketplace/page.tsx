import React from 'react';
import type { Metadata } from 'next';
import { getAppConstants, getMarketplace } from '../../lib/api/marketplace';
import { MarketplaceView } from '../components/market/MarketplaceView';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Order from restaurants, groceries and stores near you and pay by card or bank transfer. Delivered by Nana riders.',
};

export default async function MarketplacePage() {
  const [stores, constants] = await Promise.all([getMarketplace(), getAppConstants()]);
  const minFee = constants ? constants.delivery_min_fee * (constants.delivery_fee_multiplier || 1) : null;

  return (
    <MarketplaceView stores={stores} minDeliveryFee={minFee} />
  );
}

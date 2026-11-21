import React from 'react';
import { notFound } from 'next/navigation';
import { getMerchant } from '../../../lib/api/merchants';
import { toStoreMenu } from '../../../lib/shop/catalog';
import { hoursSummary, openStatusLabel } from '../../../lib/format';
import { StoreView } from '../../components/store/StoreView';
import { JsonLd, breadcrumbLd } from '../../components/site/JsonLd';
import { SITE_URL } from '../../../lib/kano';
import type { ApiMerchantDetail } from '../../../lib/api/types';

const LD_TYPE: Record<string, string> = { restaurant: 'Restaurant', grocery: 'GroceryStore', pharmacy: 'Pharmacy' };

function storeLd(d: ApiMerchantDetail, image: string | null) {
  const a = d.address;
  return {
    '@type': LD_TYPE[d.merchant_type] ?? 'Store',
    name: d.business_name.trim(),
    url: `${SITE_URL}/merchant/${d.id}`,
    ...(image ? { image } : {}),
    ...(d.merchant_type === 'restaurant' && d.cuisine_types?.length ? { servesCuisine: d.cuisine_types.filter(Boolean).slice(0, 3) } : {}),
    ...(a
      ? {
          address: { '@type': 'PostalAddress', streetAddress: a.address_line_1.trim(), addressLocality: a.city, addressRegion: a.state, addressCountry: 'NG' },
          ...(a.latitude != null && a.longitude != null ? { geo: { '@type': 'GeoCoordinates', latitude: a.latitude, longitude: a.longitude } } : {}),
        }
      : {}),
  };
}

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const detail = await getMerchant(params.id);
  return {
    title: detail ? detail.business_name : 'Store',
    alternates: { canonical: `/merchant/${params.id}` },
    description: detail
      ? `Order from ${detail.business_name} on Nana — see the menu and prices, pay by card or bank transfer, and track your rider live.`
      : undefined,
  };
}

/** A live store: menu fetched server-side from nana-v2, ordering handled client-side. */
export default async function MerchantDetailPage({ params }: { params: { id: string } }) {
  const detail = await getMerchant(params.id);
  if (!detail) notFound();

  const store = toStoreMenu(detail);
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Kano', path: '/kano' },
              { name: store.card.name, path: `/merchant/${detail.id}` },
            ]),
            storeLd(detail, store.card.banner),
          ],
        }}
      />
      <StoreView store={store} hours={hoursSummary(detail.operating_hours)} openLabel={openStatusLabel(detail.is_open, detail.operating_hours)} />
    </>
  );
}

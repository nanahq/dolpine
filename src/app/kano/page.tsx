import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllMerchants } from '@/lib/api/merchants';
import { getAppConstants } from '@/lib/api/marketplace';
import { toStoreCard } from '@/lib/shop/catalog';
import { KANO_TAGLINE, sortStores } from '@/lib/kano';
import { PageHero } from '../components/pages/PageParts';
import { AreaLinks, Faq, JsonLd, StoreSection, breadcrumbLd, kanoFaq, storeListLd } from '../components/kano/KanoParts';
import { GetTheApp } from '../components/home/GetTheApp';

export const revalidate = 300;

const DESCRIPTION = `Order food online in Kano with Nana, ${KANO_TAGLINE}. Kano restaurants, groceries and errands delivered to your door — pay by card or transfer and track your rider live.`;

export const metadata: Metadata = {
  title: { absolute: 'Food Delivery in Kano — Order Food Online | Nana' },
  description: DESCRIPTION,
  alternates: { canonical: '/kano' },
  openGraph: { url: 'https://trynanaapp.com/kano', title: 'Food Delivery in Kano — Order Food Online | Nana', description: DESCRIPTION },
};

export default async function KanoPage() {
  const [merchants, constants] = await Promise.all([getAllMerchants(), getAppConstants()]);
  const stores = sortStores(merchants.map(toStoreCard));
  const restaurants = stores.filter((s) => s.cat === 'food');
  const shops = stores.filter((s) => s.cat !== 'food');
  const faq = kanoFaq(constants, 'Kano');

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Kano', path: '/kano' }]),
            storeListLd(restaurants, 'Kano restaurants on Nana'),
          ],
        }}
      />
      <PageHero
        bg="var(--blue)"
        eyebrow={KANO_TAGLINE}
        title="Order food online in Kano"
        size="clamp(56px,8.4vw,132px)"
        lede="Food delivery from Kano’s favourite restaurants, plus groceries and errands — delivered by Nana riders and tracked live."
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/marketplace" className="v-btn v-btn--yellow v-btn--lg">Order now</Link>
          <Link href="#get-app" className="v-btn v-btn--ink v-btn--lg">Get the app</Link>
        </div>
      </PageHero>
      <StoreSection
        title="Kano restaurants on Nana"
        lede="Suya, shawarma, fried chicken, pizza, rice dishes and more — order from any of them and get it delivered anywhere in the city."
        stores={restaurants}
      />
      <StoreSection
        title="Kano groceries & stores"
        lede="Fresh meat, vegetables and everyday shopping. Can’t find your shop? Send a rider on an errand from the app."
        stores={shops}
      />
      <AreaLinks />
      <Faq items={faq} />
      <GetTheApp />
    </>
  );
}

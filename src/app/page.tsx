import React from 'react';
import type { Metadata } from 'next';
import { getAllMerchants } from '../lib/api/merchants';
import { toStoreCard } from '../lib/shop/catalog';
import { HeroSearch } from './components/home/HeroSearch';
import {
  FirstOrderPromo,
  GuaranteeBand,
  HowItWorks,
  LovedAroundTown,
  PartnerCards,
  WordSlide,
} from './components/home/HomeSections';
import { ServicesGrid } from './components/home/ServicesRail';
import { GetTheApp } from './components/home/GetTheApp';
import { JsonLd } from './components/site/JsonLd';
import { SITE_URL } from '../lib/kano';
import { APP_STORE_URL, INSTAGRAM_URL, PLAY_STORE_URL } from '../lib/site';

export const revalidate = 300;

export const metadata: Metadata = { alternates: { canonical: '/' } };

const SITE_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Nana', alternateName: ['Nana Delivery', 'Nana App'], publisher: { '@id': `${SITE_URL}/#org` } },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Nana',
      legalName: 'Imagyne Ventures Ltd',
      parentOrganization: { '@type': 'Organization', name: 'Imagyne Ventures Ltd' },
      url: SITE_URL,
      logo: `${SITE_URL}/nana.png`,
      sameAs: [INSTAGRAM_URL, PLAY_STORE_URL, APP_STORE_URL],
      areaServed: { '@type': 'City', name: 'Kano' },
      address: { '@type': 'PostalAddress', streetAddress: 'Suite 60, MYCA7 Plaza, Zoo Road', addressLocality: 'Kano', addressRegion: 'Kano', addressCountry: 'NG' },
      contactPoint: { '@type': 'ContactPoint', telephone: '+234-812-222-9693', contactType: 'customer service', areaServed: 'NG', availableLanguage: 'en' },
    },
  ],
};

export default async function HomePage() {
  // Open stores first, the ones with photos ahead of monogram tiles.
  const stores = (await getAllMerchants())
    .map(toStoreCard)
    .sort((a, b) => Number(b.isOpen) - Number(a.isOpen) || Number(!!b.banner) - Number(!!a.banner))
    .slice(0, 10);

  return (
    <>
      <JsonLd data={SITE_LD} />
      <HeroSearch />
      <GuaranteeBand />
      <ServicesGrid />
      <WordSlide />
      <HowItWorks />
      <FirstOrderPromo />
      <LovedAroundTown stores={stores} />
      <PartnerCards />
      <GetTheApp />
    </>
  );
}

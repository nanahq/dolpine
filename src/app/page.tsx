import React from 'react';
import { getAllMerchants } from '../lib/api/merchants';
import { toStoreCard } from '../lib/shop/catalog';
import { HeroSearch } from './components/home/HeroSearch';
import {
  FirstOrderPromo,
  GuaranteeBand,
  HowItWorks,
  LovedAroundTown,
  PartnerCards,
  ServicesGrid,
  WordSlide,
} from './components/home/HomeSections';
import { GetTheApp } from './components/home/GetTheApp';

export const revalidate = 300;

export default async function HomePage() {
  // Open stores first, the ones with photos ahead of monogram tiles.
  const stores = (await getAllMerchants())
    .map(toStoreCard)
    .sort((a, b) => Number(b.isOpen) - Number(a.isOpen) || Number(!!b.banner) - Number(!!a.banner))
    .slice(0, 10);

  return (
    <>
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

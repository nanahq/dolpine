import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllMerchants } from '@/lib/api/merchants';
import { getAppConstants } from '@/lib/api/marketplace';
import { toStoreCard } from '@/lib/shop/catalog';
import { distanceKm } from '@/lib/shop/address';
import { KANO_AREAS, KANO_TAGLINE, NEAR_KM, findArea, sortStores } from '@/lib/kano';
import { PageHero } from '../../components/pages/PageParts';
import { AreaLinks, Faq, JsonLd, StoreSection, breadcrumbLd, kanoFaq, storeListLd } from '../../components/kano/KanoParts';
import { GetTheApp } from '../../components/home/GetTheApp';

export const revalidate = 300;
export const dynamicParams = false;

type Params = { params: { area: string } };

export function generateStaticParams() {
  return KANO_AREAS.map((a) => ({ area: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const area = findArea(params.area);
  if (!area) return {};
  const title = `Food Delivery in ${area.name}, Kano — Restaurants & Groceries | Nana`;
  const description = `Order food online in ${area.name}, Kano. ${area.lede} Nana is ${KANO_TAGLINE}.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/kano/${area.slug}` },
    openGraph: { url: `https://trynanaapp.com/kano/${area.slug}`, title, description },
  };
}

export default async function KanoAreaPage({ params }: Params) {
  const area = findArea(params.area);
  if (!area) notFound();

  const [merchants, constants] = await Promise.all([getAllMerchants(), getAppConstants()]);
  const withKm = sortStores(merchants.map(toStoreCard)).map((s) => ({
    store: s,
    km: s.lat != null && s.lng != null ? distanceKm(area.centre, { lat: s.lat, lng: s.lng }) : null,
  }));
  const kmById = new Map(withKm.map((x) => [x.store.id, x.km]));
  const near = withKm.filter((x) => x.km != null && x.km <= NEAR_KM).sort((a, b) => a.km! - b.km!).map((x) => x.store);
  const rest = withKm.filter((x) => !near.includes(x.store)).map((x) => x.store);
  const distanceMeta = (id: string) => {
    const km = kmById.get(id);
    return km == null ? undefined : `${km < 1 ? '<1' : km.toFixed(1)} km from ${area.name}`;
  };

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Kano', path: '/kano' },
              { name: area.name, path: `/kano/${area.slug}` },
            ]),
            storeListLd([...near, ...rest], `Restaurants and stores delivering to ${area.name}, Kano`),
          ],
        }}
      />
      <PageHero bg="var(--yellow)" eyebrow={`Kano · ${area.name}`} title={`Food delivery in ${area.name}`} size="clamp(52px,7.6vw,120px)" lede={area.lede}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/marketplace" className="v-btn v-btn--ink v-btn--lg">Order now</Link>
          <Link href="#get-app" className="v-btn v-btn--white v-btn--lg">Get the app</Link>
        </div>
      </PageHero>
      <section className="v-wrap" style={{ paddingTop: 'clamp(48px,6vw,80px)', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 820 }}>
        <p className="v-lede" style={{ margin: 0 }}>{area.about}</p>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--muted)' }}>
          We deliver around {area.landmarks.join(', ')} and the rest of {area.name}.
        </p>
      </section>
      <StoreSection title={`Near ${area.name}`} stores={near} meta={(s) => distanceMeta(s.id)} />
      <StoreSection
        title={near.length ? 'More across Kano' : `Restaurants & stores delivering to ${area.name}`}
        stores={rest}
        meta={(s) => distanceMeta(s.id)}
      />
      <AreaLinks current={area.slug} />
      <Faq items={kanoFaq(constants, area.name)} />
      <GetTheApp />
    </>
  );
}

import React from 'react';
import Link from 'next/link';
import type { StoreCard as StoreCardData } from '@/lib/shop/catalog';
import type { ApiAppConstants } from '@/lib/api/types';
import { formatNaira } from '@/lib/format';
import { KANO_AREAS, SITE_URL } from '@/lib/kano';
import { StoreCard } from '../shop/StoreCard';

export function StoreSection({ title, lede, stores, meta }: { title: string; lede?: string; stores: StoreCardData[]; meta?: (s: StoreCardData) => string | undefined }) {
  if (!stores.length) return null;
  return (
    <section className="v-wrap" style={{ paddingTop: 'clamp(48px,6vw,80px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h2 className="v-h2" style={{ fontSize: 'clamp(36px,4.4vw,60px)' }}>{title}</h2>
        {lede && <p className="v-lede" style={{ margin: 0, maxWidth: 640 }}>{lede}</p>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap: '36px 20px' }}>
        {stores.map((s) => (
          <StoreCard key={s.id} store={s} meta={meta?.(s)} />
        ))}
      </div>
    </section>
  );
}

export function AreaLinks({ current }: { current?: string }) {
  const areas = KANO_AREAS.filter((a) => a.slug !== current);
  return (
    <section className="v-wrap" style={{ paddingTop: 'clamp(64px,8vw,110px)', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="v-h2" style={{ fontSize: 'clamp(36px,4.4vw,60px)' }}>Delivery across Kano</h2>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {current && (
          <Link href="/kano" className="v-chip v-chip--lg">All of Kano</Link>
        )}
        {areas.map((a) => (
          <Link key={a.slug} href={`/kano/${a.slug}`} className="v-chip v-chip--lg">
            Food delivery in {a.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Questions answered from live app constants so hours and fees never go stale. */
export function kanoFaq(constants: ApiAppConstants | null, place: string): { q: string; a: string }[] {
  const minFee = constants ? constants.delivery_min_fee * (constants.delivery_fee_multiplier || 1) : null;
  const hours = constants?.platform_open_time && constants.platform_close_time ? `${constants.platform_open_time} to ${constants.platform_close_time}` : null;
  return [
    {
      q: `How do I order food online in ${place}?`,
      a: `Pick a restaurant or store on the Nana app or on trynanaapp.com, add your items and enter your ${place} address. Pay by card or bank transfer (or your Nana wallet in the app), then follow your rider live until they reach you.`,
    },
    {
      q: `How much is delivery in ${place}?`,
      a: minFee
        ? `Delivery starts from ${formatNaira(minFee)} and depends on how far the store is from you. You always see the exact fee before you pay.`
        : 'Delivery depends on how far the store is from you. You always see the exact fee before you pay.',
    },
    ...(hours ? [{ q: 'What time does Nana deliver?', a: `Nana takes orders from ${hours} every day. Each store also keeps its own opening hours, shown on its page.` }] : []),
    {
      q: 'Can Nana buy from a shop that isn’t on the app?',
      a: 'Yes. Send an errand from the Nana app and a rider will buy what you need from the shop or market you choose and bring it to you.',
    },
    {
      q: `Does Nana deliver groceries in ${place}?`,
      a: 'Yes. Order fresh meat, vegetables and everyday groceries from the Nana Store and other shops, delivered by the same riders who bring your food.',
    },
  ];
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="v-wrap" style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 120, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
      <h2 className="v-h2" style={{ fontSize: 'clamp(36px,4.4vw,60px)' }}>Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((f) => (
          <details key={f.q} style={{ padding: '20px 0', boxShadow: 'inset 0 -1px 0 var(--line)' }}>
            <summary style={{ cursor: 'pointer', fontSize: 19, fontWeight: 600, color: 'var(--text)' }}>{f.q}</summary>
            <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.6, color: 'var(--muted)' }}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function storeListLd(stores: StoreCardData[], name: string) {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: stores.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/merchant/${s.id}`,
      name: s.name,
    })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${SITE_URL}${t.path}` })),
  };
}

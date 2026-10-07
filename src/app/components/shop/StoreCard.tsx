/* eslint-disable @next/next/no-img-element -- banners come from merchant CDNs */
import React from 'react';
import Link from 'next/link';
import type { StoreCard as StoreCardData } from '@/lib/shop/catalog';

/** Banner photo, or a coloured monogram tile when the store has none. */
export function StoreArt({ store, height, radius = 20, monoSize = 80 }: { store: StoreCardData; height?: number | string; radius?: number; monoSize?: number }) {
  const box: React.CSSProperties = {
    position: 'relative',
    borderRadius: radius,
    overflow: 'hidden',
    ...(height ? { height } : { aspectRatio: '16/9' }),
  };
  if (store.banner) {
    return (
      <div style={{ ...box, background: 'var(--line)' }}>
        <img src={store.banner} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div style={{ ...box, background: store.monoBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="v-display v-display--black" style={{ fontSize: monoSize, lineHeight: 1, color: store.monoFg }}>
        {store.mono}
      </span>
    </div>
  );
}

type Props = {
  store: StoreCardData;
  /** Third line under the tags, e.g. "2.4 km away" or "Delivery from ₦1,100". */
  meta?: string;
  width?: string | number;
};

/** Store card from the marketplace grid and rails. */
export function StoreCard({ store, meta, width }: Props) {
  return (
    <Link href={`/merchant/${store.id}`} className="v-tap v-lift" style={{ width, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <StoreArt store={store} />
        {store.isErrand && (
          <span style={pill('var(--yellow)', 'var(--ink)', { left: 12, top: 12 })} title="Not a Nana partner — a rider buys your order at the counter">
            Errand · rider shops for you
          </span>
        )}
        {!store.isOpen && <span style={pill('var(--ink)', '#fff', { left: 12, top: 12 })}>Closed now</span>}
        <span className="v-num" style={{ ...pill('#fff', 'var(--text)', { right: 12, bottom: -14 }), boxShadow: 'var(--chip-shadow)' }}>
          {store.eta}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '4px 2px 0' }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{store.name}</span>
        <span style={{ fontSize: 14, color: 'var(--muted)' }}>{store.tags}</span>
        {meta && <span className="v-num" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-ink)' }}>{meta}</span>}
      </div>
    </Link>
  );
}

function pill(bg: string, fg: string, pos: React.CSSProperties): React.CSSProperties {
  return {
    position: 'absolute',
    ...pos,
    height: 30,
    borderRadius: 999,
    background: bg,
    color: fg,
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  };
}

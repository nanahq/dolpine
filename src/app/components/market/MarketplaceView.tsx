'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { formatNaira } from '@/lib/format';
import { distanceKm } from '@/lib/shop/address';
import type { StoreCard as StoreCardData, StoreMenu } from '@/lib/shop/catalog';
import { NanaIcon } from '../site/NanaIcon';
import { StoreCard } from '../shop/StoreCard';
import { ProductTile } from '../shop/ProductTile';
import { GuaranteeStrip } from '../shop/GuaranteeStrip';
import { useShop } from '../shop/ShopProvider';
import { AppBanner } from './AppBanner';
import { CATEGORIES, CategoryRail, type CatFilter } from './CategoryRail';
import { PromoCarousel } from './PromoCarousel';

type Props = { stores: StoreMenu[]; minDeliveryFee: number | null };

const FAST_MINUTES = 30;

export function MarketplaceView({ stores, minDeliveryFee }: Props) {
  const router = useRouter();
  const path = usePathname();
  const { address } = useShop();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<CatFilter>('all');
  const [urlRead, setUrlRead] = useState(false);

  // Read ?q= and ?cat= after mount rather than via useSearchParams, which would
  // stop the store grid from being server-rendered.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get('q') ?? '');
    const c = params.get('cat');
    if (CATEGORIES.some((x) => x.key === c)) setCat(c as CatFilter);
    setUrlRead(true);
  }, []);

  // Keep the URL shareable without adding a history entry per keystroke.
  useEffect(() => {
    if (!urlRead) return;
    const t = setTimeout(() => {
      const next = new URLSearchParams();
      if (q.trim()) next.set('q', q.trim());
      if (cat !== 'all') next.set('cat', cat);
      const qs = next.toString();
      router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
    }, 400);
    return () => clearTimeout(t);
  }, [q, cat, path, router, urlRead]);

  const km = (s: StoreCardData) => (address && s.lat != null && s.lng != null ? distanceKm(address, { lat: s.lat, lng: s.lng }) : null);
  const meta = (s: StoreCardData) => {
    const d = km(s);
    if (d != null) return `${d.toFixed(1)} km away`;
    return minDeliveryFee ? `Delivery from ${formatNaira(minDeliveryFee)}` : undefined;
  };

  const ql = q.trim().toLowerCase();
  const inCat = (s: StoreMenu) => cat === 'all' || (cat === 'fast' ? s.card.prepMinutes <= FAST_MINUTES : s.card.cat === cat);
  const matches = (s: StoreMenu) =>
    !ql ||
    s.card.name.toLowerCase().includes(ql) ||
    s.card.tags.toLowerCase().includes(ql) ||
    s.sections.some((x) => x.products.some((p) => p.name.toLowerCase().includes(ql)));

  const byOpen = (a: StoreMenu, b: StoreMenu) => Number(b.card.isOpen) - Number(a.card.isOpen);
  const visible = stores.filter((s) => inCat(s) && matches(s)).sort(byOpen);

  const hits = useMemo(() => {
    if (!ql) return [];
    return stores
      .filter(inCat)
      .flatMap((s) => s.sections.flatMap((x) => x.products.filter((p) => p.name.toLowerCase().includes(ql)).map((p) => ({ p, s }))))
      .slice(0, 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores, ql, cat]);

  const rows = useMemo(() => {
    const open = stores.filter((s) => s.card.isOpen);
    const near = address
      ? [...open].sort((a, b) => (km(a.card) ?? 99) - (km(b.card) ?? 99))
      : [...open].sort((a, b) => a.card.prepMinutes - b.card.prepMinutes);
    const fresh = [...open].sort((a, b) => (b.card.createdAt ?? '').localeCompare(a.card.createdAt ?? ''));
    return [
      { title: address ? 'Closest to you' : 'Fast near you', items: near.slice(0, 8), seeAll: address ? null : ('fast' as const) },
      { title: 'New on Nana', items: fresh.slice(0, 6), seeAll: null },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stores, address]);

  const popular = useMemo(
    () =>
      stores
        .filter((s) => s.card.isOpen && s.card.cat === 'food')
        .flatMap((s) => {
          const p = s.sections.flatMap((x) => x.products).find((x) => x.image);
          return p ? [{ p, s }] : [];
        })
        .slice(0, 10),
    [stores],
  );

  const available: CatFilter[] = ['all', ...CATEGORIES.map((c) => c.key).filter((k) => k !== 'all' && k !== 'fast' && stores.some((s) => s.card.cat === k)), 'fast'];
  const browse = !ql && cat === 'all';

  return (
    <>
      <div style={{ position: 'sticky', top: 72, zIndex: 30, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: 'inset 0 -1px 0 var(--line)' }}>
        <div className="v-wrap" style={{ paddingTop: 12, paddingBottom: 12 }}>
          <label className="v-search" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--fill)', borderRadius: 999, padding: '0 20px', height: 54, maxWidth: 760 }}>
            <NanaIcon name="SearchSize20" size={20} style={{ color: '#6E787F' }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search stores, dishes or items"
              aria-label="Search stores, dishes or items"
              style={{ flex: 1, minWidth: 0, height: 50, border: 0, outline: 'none', fontSize: 17, background: 'none' }}
            />
            {q && (
              <button type="button" onClick={() => { setQ(''); setCat('all'); }} style={{ border: 0, background: '#fff', borderRadius: 999, height: 32, padding: '0 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Clear
              </button>
            )}
          </label>
        </div>
      </div>

      <div className="v-wrap" style={{ paddingTop: 'clamp(20px,3vw,32px)', paddingBottom: 140, display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vw,44px)' }}>
        <AppBanner />
        <GuaranteeStrip style={{ animation: 'nRise .6s .05s both' }} />
        <h1 className="v-display v-rise" style={{ fontSize: 'clamp(40px,6.4vw,96px)', color: 'var(--ink)' }}>
          What are we
          <br />
          getting today?
        </h1>
        <CategoryRail value={cat} available={available} onChange={setCat} />

        {browse && (
          <>
            <PromoCarousel />
            {rows.map((r) => r.items.length > 0 && (
              <Rail key={r.title} title={r.title} onSeeAll={r.seeAll ? () => setCat(r.seeAll!) : undefined}>
                {r.items.map((s) => <StoreCard key={s.card.id} store={s.card} meta={meta(s.card)} width="min(300px,74vw)" />)}
              </Rail>
            ))}
            {popular.length > 0 && (
              <Rail title="Popular dishes" gap={14}>
                {popular.map(({ p, s }) => <ProductTile key={p.id} product={p} merchant={s.merchant} width="min(190px,40vw)" />)}
              </Rail>
            )}
          </>
        )}

        {hits.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={railTitle}>Items matching “{q.trim()}”</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: '24px 16px' }}>
              {hits.map(({ p, s }) => <ProductTile key={`${s.card.id}-${p.id}`} product={p} merchant={s.merchant} />)}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={railTitle}>
            {browse ? 'All stores' : `${visible.length} ${visible.length === 1 ? 'store' : 'stores'}${ql ? ' match' : ''}`}
          </span>
          {visible.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap: '36px 20px' }}>
              {visible.map((s) => <StoreCard key={s.card.id} store={s.card} meta={meta(s.card)} />)}
            </div>
          ) : (
            <div style={{ borderRadius: 28, background: 'var(--fill)', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
              <span className="v-h3" style={{ fontSize: 30 }}>Nothing yet</span>
              <span style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 420, lineHeight: 1.5 }}>
                Try another word — or send a rider with a list from the app. They’ll shop any store.
              </span>
              <button type="button" className="v-btn v-btn--ink v-btn--md" onClick={() => { setQ(''); setCat('all'); }}>
                Show all stores
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const railTitle: React.CSSProperties = { fontSize: 26, fontWeight: 600, letterSpacing: '-.025em' };

function Rail({ title, onSeeAll, gap = 16, children }: { title: string; onSeeAll?: () => void; gap?: number; children: React.ReactNode }) {
  return (
    <div className="v-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
        <span style={railTitle}>{title}</span>
        {onSeeAll && (
          <button type="button" onClick={onSeeAll} className="v-btn" style={{ height: 36, padding: '0 14px', fontSize: 14, background: 'var(--blue-tint)', color: 'var(--blue-ink)' }}>
            See all
          </button>
        )}
      </div>
      <div className="v-rail" style={{ gap, paddingTop: 4, paddingBottom: 18 }}>
        {children}
      </div>
    </div>
  );
}

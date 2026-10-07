'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { StoreMenu } from '@/lib/shop/catalog';
import { Chevron, NanaIcon } from '../site/NanaIcon';
import { StoreArt } from '../shop/StoreCard';
import { MenuRow } from '../shop/MenuRow';
import { GuaranteeStrip } from '../shop/GuaranteeStrip';
import { useShop } from '../shop/ShopProvider';

type Props = { store: StoreMenu; hours: string; openLabel: string };

const TAB_OFFSET = 140;

export function StoreView({ store, hours, openLabel }: Props) {
  const { card, merchant, sections } = store;
  const shop = useShop();
  const [tab, setTab] = useState(0);

  // Links from search results land here with ?product= to open that item.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('product');
    const product = id && sections.flatMap((s) => s.products).find((p) => p.id === id);
    if (product) shop.openProduct(merchant, product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let active = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(`sec-${s.id}`);
        if (el && el.getBoundingClientRect().top < TAB_OFFSET + 30) active = i;
      });
      setTab(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  const goTo = (i: number) => {
    const el = document.getElementById(`sec-${sections[i].id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - TAB_OFFSET, behavior: 'smooth' });
    setTab(i);
  };

  return (
    <>
      <div className="v-wrap" style={{ paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Link href="/marketplace" className="v-btn v-btn--soft" style={{ alignSelf: 'flex-start', height: 40, padding: '0 16px', fontSize: 14, gap: 8 }}>
          <Chevron dir="left" />
          All stores
        </Link>
        <div className="v-rise" style={{ position: 'relative', animationDuration: '.7s' }}>
          <StoreArt store={card} height="clamp(200px,26vw,340px)" radius={28} monoSize={180} />
          {card.isErrand && (
            <div className="v-sticker v-pop" style={{ position: 'absolute', right: 20, bottom: -20, padding: '12px 18px 10px', transform: 'rotate(3deg)', boxShadow: '0 12px 28px rgba(12,18,22,.2)', fontSize: 20, letterSpacing: '.04em', animationDelay: '.3s' }}>
              Errand · we buy it for you
            </div>
          )}
        </div>
        <div className="v-rise" style={{ display: 'flex', flexDirection: 'column', gap: 14, animationDelay: '.1s', animationDuration: '.7s' }}>
          <h1 className="v-display" style={{ fontSize: 'clamp(48px,6.4vw,96px)', color: 'var(--ink)' }}>{card.name}</h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={chip}>{card.tags}</span>
            <span className="v-num" style={{ ...chip, gap: 6 }}>
              <NanaIcon name="IconsansBoldTimer" size={14} />
              {card.eta}
            </span>
            <span style={{ ...chip, background: card.isOpen ? 'var(--blue-tint)' : 'var(--fill)', color: card.isOpen ? 'var(--blue-ink)' : 'var(--muted)', fontWeight: 600 }}>
              {openLabel}
            </span>
            <span style={chip}>{hours}</span>
          </div>
          {card.isErrand && (
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)', maxWidth: 640 }}>
              {card.name} isn’t a Nana partner yet. A rider goes to the counter, buys your order and brings it to you, for a flat errand fee
              instead of the usual service fee.
            </p>
          )}
          {!card.isOpen && (
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--danger)', fontWeight: 600 }}>
              This store is closed right now. You can browse the menu, but ordering opens when they do.
            </p>
          )}
          <GuaranteeStrip style={{ maxWidth: 640 }} />
        </div>
      </div>

      {sections.length > 1 && (
        <div style={{ position: 'sticky', top: 72, zIndex: 25, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: 'inset 0 -1px 0 var(--line)', marginTop: 24 }}>
          <div className="v-wrap v-rail" style={{ paddingTop: 10, paddingBottom: 10, gap: 4, margin: '0 auto' }}>
            {sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className="v-btn"
                style={{ height: 40, padding: '0 16px', fontSize: 15, background: tab === i ? 'var(--ink)' : 'transparent', color: tab === i ? '#fff' : 'var(--text)', fontWeight: tab === i ? 600 : 500 }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="v-wrap" style={{ paddingTop: 12, paddingBottom: 140, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sections.length === 0 && (
          <div style={{ borderRadius: 28, background: 'var(--fill)', padding: '48px 32px', marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>The menu is on its way</span>
            <span style={{ fontSize: 15, color: 'var(--muted)' }}>This store hasn’t listed items on the website yet. Try the Nana app, or pick another store.</span>
          </div>
        )}
        {sections.map((s) => (
          <section key={s.id} id={`sec-${s.id}`} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 28 }}>
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: '-.025em' }}>{s.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,400px),1fr))', gap: 12 }}>
              {s.products.map((p) => <MenuRow key={p.id} product={p} merchant={merchant} />)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

const chip: React.CSSProperties = {
  height: 36,
  borderRadius: 999,
  background: 'var(--fill)',
  padding: '0 14px',
  display: 'flex',
  alignItems: 'center',
  fontSize: 14,
};

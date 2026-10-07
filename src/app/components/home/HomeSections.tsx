import React from 'react';
import Link from 'next/link';
import type { StoreCard } from '@/lib/shop/catalog';
import { WELCOME_CODE } from '@/lib/site';
import { NanaIcon } from '../site/NanaIcon';
import { StoreArt } from '../shop/StoreCard';

export function GuaranteeBand() {
  return (
    <section className="v-wrap" style={{ paddingTop: 'clamp(20px,3vw,32px)' }}>
      <div
        className="v-reveal"
        style={{ borderRadius: 'clamp(24px,3vw,36px)', background: 'var(--green)', padding: 'clamp(24px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(20px,4vw,48px)', flexWrap: 'wrap' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px,3vw,32px)', flexWrap: 'wrap', minWidth: 0 }}>
          <div className="v-reveal-pop" style={{ width: 'clamp(72px,9vw,112px)', height: 'clamp(72px,9vw,112px)', borderRadius: 999, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <NanaIcon name="IconsansBoldTimer" size={44} style={{ color: 'var(--yellow)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff' }}>On-time guarantee</span>
            <span className="v-display" style={{ fontSize: 'clamp(48px,7vw,104px)', color: '#fff' }}>
              Late? You
              <br />
              don’t pay.
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          <span style={{ fontSize: 'clamp(16px,1.5vw,18px)', lineHeight: 1.5, color: '#fff' }}>
            We show your delivery time before you order. If we miss it, the order is on us.
          </span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/marketplace" className="v-btn v-btn--yellow">Order now</Link>
            <Link href="/terms" style={{ fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'underline' }}>Terms apply</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { n: '01', title: 'Food', copy: 'Restaurants near you, hot and on time.', href: '/marketplace?cat=food', bg: 'var(--blue)', fg: 'var(--ink)', dot: ['var(--ink)', '#fff'] },
  { n: '02', title: 'Groceries', copy: 'Staples, produce and household, picked fresh.', href: '/marketplace?cat=grocery', bg: 'var(--green)', fg: '#fff', dot: ['var(--yellow)', 'var(--ink)'] },
  { n: '03 · In the app', title: 'Errands', copy: 'Write a list. A rider shops any store.', href: '#get-app', bg: 'var(--yellow)', fg: 'var(--ink)', dot: ['var(--ink)', '#fff'] },
  { n: '04 · In the app', title: 'Parcels', copy: 'Send anything across the city, tracked live.', href: '#get-app', bg: 'var(--ink)', fg: '#fff', dot: ['var(--blue)', 'var(--ink)'] },
];

export function ServicesGrid() {
  return (
    <section className="v-wrap" style={{ paddingTop: 'clamp(96px,10vw,140px)', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div className="v-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
        <h2 className="v-h2">
          One app.
          <br />
          Four ways
          <br />
          to get it done.
        </h2>
        <p className="v-lede" style={{ maxWidth: 380 }}>Order from a menu, shop a store, send a rider with a list, or move a parcel across town.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 16 }}>
        {SERVICES.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="v-tap v-lift-tilt v-reveal"
            style={{ height: 360, borderRadius: 28, background: s.bg, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: s.fg }}>{s.n}</span>
              <span style={{ width: 44, height: 44, borderRadius: 999, background: s.dot[0], color: s.dot[1], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>→</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="v-h3" style={{ fontSize: 40, color: s.fg }}>{s.title}</span>
              <span style={{ fontSize: 16, lineHeight: 1.45, color: s.fg }}>{s.copy}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function WordSlide() {
  return (
    <section style={{ overflow: 'hidden', padding: '40px 0 20px' }} aria-hidden="true">
      <div className="v-display v-display--black v-slide" style={{ whiteSpace: 'nowrap', fontSize: 'clamp(120px,20vw,300px)', lineHeight: 0.9, letterSpacing: '-.02em' }}>
        <span style={{ color: 'var(--ink)' }}>Fast </span>
        <span style={{ color: 'transparent', WebkitTextStroke: '3px var(--ink)' }}>delivery </span>
        <span style={{ color: 'var(--blue)' }}>Local</span>
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', title: 'Pick a store', copy: 'Restaurants, supermarkets, pharmacies and the shop on your corner.', bg: 'var(--blue)', num: 'var(--ink)', fg: 'var(--ink)', sub: 'var(--ink)', top: 110 },
  { n: '02', title: 'We shop and ride', copy: 'A Nana rider picks up, checks your order and heads straight to you.', bg: 'var(--yellow)', num: 'var(--ink)', fg: 'var(--ink)', sub: 'var(--ink)', top: 134 },
  { n: '03', title: 'At your door', copy: 'Track every turn, then say hi. Most orders arrive in about 25 minutes.', bg: 'var(--ink)', num: 'var(--blue)', fg: '#fff', sub: 'var(--faint)', top: 158 },
];

export function HowItWorks() {
  return (
    <section className="v-wrap" style={{ padding: '80px var(--gutter) 120px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 56, alignItems: 'start' }}>
      <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span className="v-eyebrow" style={{ color: 'var(--blue-ink)' }}>How it works</span>
        <h2 className="v-h2">
          Three taps.
          <br />
          Then relax.
        </h2>
        <p className="v-lede" style={{ maxWidth: 400 }}>No minimums on most stores. Pay by card, transfer or wallet. Follow your rider live.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            style={{ position: 'sticky', top: s.top, minHeight: 380, borderRadius: 32, background: s.bg, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: `0 -10px 40px rgba(12,18,22,${0.08 + i * 0.03})` }}
          >
            <span className="v-display v-display--black" style={{ fontSize: 140, lineHeight: 0.8, color: s.num }}>{s.n}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="v-h3" style={{ fontSize: 34, color: s.fg }}>{s.title}</span>
              <span style={{ fontSize: 17, lineHeight: 1.5, color: s.sub, maxWidth: 440 }}>{s.copy}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FirstOrderPromo() {
  return (
    <section className="v-wrap">
      <div
        className="v-reveal"
        style={{ borderRadius: 40, background: 'var(--ink)', padding: 'clamp(36px,6vw,80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 40, alignItems: 'center', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="v-display v-display--black" style={{ fontSize: 'clamp(96px,12vw,200px)', lineHeight: 0.78, color: 'var(--blue)' }}>₦1,000</span>
          <span className="v-h3" style={{ fontSize: 'clamp(26px,2.9vw,39px)', color: '#fff' }}>
            Off your
            <br />
            first order
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
          <div className="v-reveal-pop" style={{ background: 'var(--yellow)', padding: '18px 26px 14px', transform: 'rotate(4deg)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="v-h3" style={{ fontSize: 'clamp(32px,3.1vw,42px)', color: 'var(--ink)' }}>{WELCOME_CODE}</span>
            <span className="v-display" style={{ fontSize: 18, letterSpacing: '.08em', color: 'var(--ink)', lineHeight: 1 }}>Use code at checkout</span>
          </div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: 'var(--faint)', maxWidth: 380 }}>
            New to Nana? Take ₦1,000 off your first order — food, groceries or errands.
          </p>
          <Link href="/marketplace" className="v-btn v-btn--sky v-btn--lg">Start shopping →</Link>
        </div>
      </div>
    </section>
  );
}

export function LovedAroundTown({ stores }: { stores: StoreCard[] }) {
  if (!stores.length) return null;
  const loop = [...stores, ...stores];
  return (
    <section style={{ padding: 'clamp(96px,10vw,140px) 0 40px', display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div className="v-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
        <h2 className="v-h2">
          Loved
          <br />
          around town
        </h2>
        <Link href="/marketplace" className="v-link-btn" style={{ fontSize: 16 }}>See all stores →</Link>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div className="v-marquee" style={{ display: 'flex', gap: 20, width: 'max-content', padding: '10px 0 20px' }}>
          {loop.map((s, i) => (
            <Link key={`${s.id}-${i}`} href={`/merchant/${s.id}`} className="v-tap v-lift" style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 14 }} tabIndex={i >= stores.length ? -1 : undefined}>
              <StoreArt store={s} height={200} radius={24} monoSize={96} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 4px' }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>{s.name}</span>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>{s.tags}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerCards() {
  const cards = [
    { href: '/vendors', eyebrow: 'For restaurants and stores', title: ['Sell on', 'Nana'], copy: 'Reach more customers. We bring the riders.', cta: 'Register interest →', bg: 'var(--blue)' },
    { href: '/riders', eyebrow: 'For riders', title: ['Ride with', 'Nana'], copy: 'Your hours, your city. Paid every week.', cta: 'Apply to ride →', bg: 'var(--yellow)' },
  ];
  return (
    <section className="v-wrap" style={{ paddingTop: 60, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 20 }}>
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="v-tap v-lift-big v-reveal" style={{ minHeight: 440, borderRadius: 36, background: c.bg, padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 40, color: 'var(--ink)' }}>
          <span className="v-eyebrow">{c.eyebrow}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span className="v-h3" style={{ fontSize: 'clamp(42px,5vw,70px)' }}>
              {c.title[0]}
              <br />
              {c.title[1]}
            </span>
            <span style={{ fontSize: 17, lineHeight: 1.5, maxWidth: 400 }}>{c.copy}</span>
            <span className="v-btn v-btn--ink" style={{ alignSelf: 'flex-start' }}>{c.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}

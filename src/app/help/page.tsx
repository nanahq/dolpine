'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, CreditCard, Store } from 'lucide-react';
import { Container, Section, Dot } from '../components/site/primitives';

type Article = { href: string; title: string; blurb: string };
type Group = { icon: React.ComponentType<{ style?: React.CSSProperties }>; title: string; items: Article[] };

const GROUPS: Group[] = [
  {
    icon: ShoppingBag,
    title: 'Orders & delivery',
    items: [
      { href: '/help/track-order', title: 'How to track your order', blurb: 'Follow your rider on the map and see the live ETA.' },
      { href: '/help/schedule-order', title: 'How to schedule an order for later', blurb: 'Pick a delivery window up to two days ahead.' },
      { href: '/help/landmark-address', title: 'Saving an address with a landmark', blurb: 'The trick to riders finding you first time, every time.' },
    ],
  },
  {
    icon: CreditCard,
    title: 'Payments & refunds',
    items: [
      { href: '/help/payment-methods', title: 'Ways to pay on Nana', blurb: 'Card, transfer, wallet or cash on delivery.' },
      { href: '/help/refunds', title: 'Refunds and missing items', blurb: 'What we refund, how fast, and how to report it.' },
    ],
  },
  {
    icon: Store,
    title: 'Vendors & riders',
    items: [
      { href: '/help/vendor-payouts', title: 'When vendors get paid', blurb: 'Payout schedule, statements and commission.' },
      { href: '/riders', title: 'Becoming a Nana rider', blurb: 'Requirements, earnings and onboarding days.' },
      { href: '/vendors', title: 'Listing your store on Nana', blurb: 'What we need from you and how long it takes.' },
    ],
  },
];

const FAQS = [
  { q: 'Can I order from this website?', a: 'No — ordering happens in the Nana app, where we can verify your address and track the rider. The website is for browsing stores and menus.' },
  { q: 'Which cities does Nana cover?', a: 'Kano today, with three more northern cities in preparation. The app only shows stores that can actually reach your address.' },
  { q: 'How much is delivery?', a: 'From ₦500 within your zone, shown clearly before you pay. Longer trips cost more, and we never add a fee at the last step.' },
  { q: 'What if my order is late or wrong?', a: 'Open chat in the app within 24 hours. Missing items are refunded to your wallet the same day, or to your card in 3–5 working days.' },
  { q: 'Can I pay cash?', a: 'Yes. Choose cash on delivery at checkout and pay the rider. Please have close to the exact amount where you can.' },
];

export default function HelpPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GROUPS;
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((it) =>
        `${it.title} ${it.blurb}`.toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <>
      <Section noReveal style={{ padding: 'clamp(36px,6vw,60px) 0 clamp(30px,5vw,48px)', background: '#fff', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px,5.6vw,44px)', lineHeight: 1.06, letterSpacing: '-0.045em', fontWeight: 900, color: 'var(--text-strong)' }}>
            Help centre
            <Dot />
          </h1>
          <p style={{ margin: '14px 0 26px', fontSize: 17, lineHeight: 1.5, color: 'var(--text-muted)' }}>
            How-tos, answers and the small print — search or browse below.
          </p>
          <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'left' }}>
            <input
              className="n-input"
              placeholder="Search help articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </Section>

      <Section style={{ padding: 'clamp(36px,6vw,64px) 0 clamp(46px,7vw,80px)' }}>
        <Container>
          {filtered.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <Icon style={{ width: 18, height: 18, color: 'var(--color-primary)' }} />
                  <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>{g.title}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(268px,1fr))', gap: 14 }}>
                  {g.items.map((it) => (
                    <Link key={it.href} href={it.href} className="n-lift-shadow" style={{ display: 'block', padding: 20, borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-sm)', color: 'inherit' }}>
                      <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text-strong)' }}>{it.title}</div>
                      <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.45, color: 'var(--text-muted)' }}>{it.blurb}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: 36, borderRadius: 18, background: '#fff', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--text-strong)' }}>Nothing matched that</div>
              <p style={{ margin: '8px 0 0', fontSize: 14.5, color: 'var(--text-muted)' }}>
                Try fewer words, or <Link href="/contact">message support</Link> and we&apos;ll answer directly.
              </p>
            </div>
          )}

          <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(22px,3.6vw,30px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--text-strong)' }}>
            Quick answers
            <Dot />
          </h2>
          <div style={{ display: 'grid', gap: 10, maxWidth: 860 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: '#fff', borderRadius: 16, boxShadow: 'var(--shadow-sm)', padding: '18px 22px' }}>
                <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>
                  {f.q}
                  <span className="n-faq-plus" style={{ color: 'var(--text-subtle)' }}>+</span>
                </summary>
                <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--text-muted)' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

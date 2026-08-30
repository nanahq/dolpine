'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, CreditCard, Store, MapPin, LifeBuoy } from 'lucide-react';
import { Container, Section, Dot } from '../components/site/primitives';
import { track } from '@/lib/analytics';
import type { HelpCategory } from '@/lib/api/help';

type IconType = React.ComponentType<{ style?: React.CSSProperties }>;

/**
 * Categories are free text in the admin, so an unknown one still renders —
 * it just gets the generic icon instead of a bespoke one.
 */
const CATEGORY_ICONS: Record<string, IconType> = {
  'orders & delivery': ShoppingBag,
  'payments & refunds': CreditCard,
  'vendors & riders': Store,
  'account & addresses': MapPin,
};

const iconFor = (title: string): IconType =>
  CATEGORY_ICONS[title.trim().toLowerCase()] ?? LifeBuoy;

/** Links that aren't articles but belong in the help centre's browse list. */
const EXTRA_LINKS: HelpCategory = {
  title: 'Join Nana',
  items: [
    {
      id: 'riders',
      slug: '',
      title: 'Becoming a Nana rider',
      category: 'Join Nana',
      summary: 'Requirements, earnings and onboarding days.',
      position: 0,
      published_at: null,
      updated_at: '',
    },
    {
      id: 'vendors',
      slug: '',
      title: 'Listing your store on Nana',
      category: 'Join Nana',
      summary: 'What we need from you and how long it takes.',
      position: 1,
      published_at: null,
      updated_at: '',
    },
  ],
};

const hrefFor = (id: string, slug: string) => (slug ? `/help/${slug}` : `/${id}`);

export function HelpBrowser({ categories }: { categories: HelpCategory[] }) {
  const [query, setQuery] = useState('');

  const groups = useMemo(() => [...categories, EXTRA_LINKS], [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => `${it.title} ${it.summary}`.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, groups]);

  // Debounced so a search reports once the visitor stops typing, rather than
  // once per keystroke — otherwise every prefix lands as its own event.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const timer = setTimeout(() => {
      track('help_searched', {
        query: q.toLowerCase(),
        results: filtered.reduce((n, g) => n + g.items.length, 0),
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [query, filtered]);

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

      <Section style={{ padding: 'clamp(36px,6vw,64px) 0 0' }}>
        <Container>
          {filtered.map((g) => {
            const Icon = iconFor(g.title);
            return (
              <div key={g.title} style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <Icon style={{ width: 18, height: 18, color: 'var(--color-primary)' }} />
                  <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>{g.title}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(268px,1fr))', gap: 14 }}>
                  {g.items.map((it) => (
                    <Link key={it.id} href={hrefFor(it.id, it.slug)} className="n-lift-shadow" style={{ display: 'block', padding: 20, borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-sm)', color: 'inherit' }}>
                      <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text-strong)' }}>{it.title}</div>
                      <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.45, color: 'var(--text-muted)' }}>{it.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ marginBottom: 40, padding: 36, borderRadius: 18, background: '#fff', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--text-strong)' }}>Nothing matched that</div>
              <p style={{ margin: '8px 0 0', fontSize: 14.5, color: 'var(--text-muted)' }}>
                Try fewer words, or <Link href="/contact">message support</Link> and we&apos;ll answer directly.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

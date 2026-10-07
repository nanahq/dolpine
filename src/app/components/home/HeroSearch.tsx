'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NanaIcon, Chevron } from '../site/NanaIcon';

const WORDS = ['Cosmetics.', 'Burgers.', 'Groceries.', 'Medicine.', 'Parcels.'];
const HINTS = ['Jollof rice', 'Shawarma', 'Fried chicken', 'Suya', 'Pizza'];

/** Blue hero: the rotating "X. Delivered." headline and the marketplace search. */
export function HeroSearch() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [q, setQ] = useState('');

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const go = () => router.push(q.trim() ? `/marketplace?q=${encodeURIComponent(q.trim())}` : '/marketplace');

  return (
    <section style={{ background: 'var(--blue)', minHeight: 'clamp(560px,78vh,800px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: 880,
          padding: 'clamp(64px,8vw,110px) var(--gutter) clamp(120px,11vw,160px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          textAlign: 'center',
        }}
      >
        <h1 className="v-display v-rise" style={{ fontSize: 'clamp(64px,9.6vw,150px)', color: '#fff', textWrap: 'balance' as React.CSSProperties['textWrap'], animationDelay: '.1s' }}>
          <span style={{ display: 'block', overflow: 'hidden', padding: '.04em 0' }}>
            <span key={i} style={{ display: 'inline-block', animation: 'nSwapUp .6s cubic-bezier(.2,.8,.2,1) both' }}>
              {WORDS[i]}
            </span>
          </span>
          <span style={{ display: 'block' }}>Delivered.</span>
        </h1>
        <form
          className="v-rise"
          onSubmit={(e) => {
            e.preventDefault();
            go();
          }}
          style={{
            display: 'flex',
            gap: 8,
            background: '#fff',
            borderRadius: 999,
            padding: 6,
            width: 'min(640px,100%)',
            boxShadow: '0 20px 50px rgba(12,18,22,.2)',
            animationDelay: '.25s',
          }}
        >
          <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', minWidth: 0 }}>
            <NanaIcon name="SearchSize20" size={20} style={{ color: '#6E787F' }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`${HINTS[i]}…`}
              aria-label="Search stores, dishes or items"
              style={{ flex: 1, minWidth: 0, height: 52, border: 0, outline: 'none', fontSize: 17, background: 'none', color: 'var(--text)' }}
            />
          </label>
          <button type="submit" className="v-btn v-btn--yellow v-btn--yellow-outline" style={{ height: 56, padding: '0 28px' }}>
            Find it
          </button>
        </form>
        <Link href="#get-app" className="v-rise" style={{ padding: '6px 4px', fontSize: 16, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, animationDelay: '.35s' }}>
          Or get the Nana app
          <Chevron dir="right" />
        </Link>
      </div>
    </section>
  );
}

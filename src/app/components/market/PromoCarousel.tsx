'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { WELCOME_CODE } from '@/lib/site';
import { Chevron } from '../site/NanaIcon';

const CARDS = [
  { eyebrow: `Code ${WELCOME_CODE}`, title: '₦1,000 off your first order', copy: 'Food, groceries or errands — the code works on all of them.', cta: 'Start an order', href: '/marketplace?cat=food', bg: 'var(--blue)', fg: 'var(--ink)', eyebrowFg: 'var(--ink)', btn: ['var(--ink)', 'var(--blue)'] },
  { eyebrow: 'Groceries', title: 'Fresh produce, picked for you', copy: 'Staples, meat, vegetables and household — straight from the store to your door.', cta: 'Shop groceries', href: '/marketplace?cat=grocery', bg: 'var(--green)', fg: '#fff', eyebrowFg: 'var(--yellow)', btn: ['#fff', 'var(--green)'] },
  { eyebrow: 'Errands', title: 'Big names, bought for you', copy: 'Stores marked Errand aren’t partners yet — a rider queues, pays and brings it over.', cta: 'See all stores', href: '/marketplace', bg: 'var(--yellow)', fg: 'var(--ink)', eyebrowFg: 'var(--ink)', btn: ['var(--ink)', 'var(--yellow)'] },
  { eyebrow: 'In the app', title: 'Spin and win on every order', copy: 'Spin the wheel at checkout and the discount applies itself.', cta: 'Get the app', href: '/#get-app', bg: 'var(--ink)', fg: '#fff', eyebrowFg: 'var(--blue)', btn: ['#fff', 'var(--ink)'] },
];

/** Auto-advancing promo cards with prev/next buttons. */
export function PromoCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  function slide(dir: 1 | -1, wrap = false) {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    if (dir > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      if (wrap) el.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    el.scrollBy({ left: dir * (first.offsetWidth + 16), behavior: 'smooth' });
  }

  useEffect(() => {
    const t = setInterval(() => slide(1, true), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="v-rise" style={{ display: 'flex', flexDirection: 'column', gap: 14, animationDelay: '.2s' }}>
      <div ref={ref} className="v-rail v-rail--mandatory" style={{ gap: 16 }}>
        {CARDS.map((c) => (
          <div
            key={c.title}
            style={{ width: 'min(560px,84vw)', minHeight: 'clamp(210px,30vw,250px)', borderRadius: 'clamp(22px,3vw,28px)', background: c.bg, padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: c.eyebrowFg }}>{c.eyebrow}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
              <span className="v-h3" style={{ fontSize: 'clamp(26px,2.6vw,34px)', lineHeight: 1.05, color: c.fg }}>{c.title}</span>
              <span style={{ fontSize: 15, lineHeight: 1.5, color: c.fg }}>{c.copy}</span>
            </div>
            <Link href={c.href} className="v-btn" style={{ alignSelf: 'flex-start', height: 46, padding: '0 20px', fontSize: 15, background: c.btn[0], color: c.btn[1] }}>
              {c.cta}
            </Link>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" className="v-icon-btn" aria-label="Previous" onClick={() => slide(-1)}>
          <Chevron dir="left" size={14} />
        </button>
        <button type="button" className="v-icon-btn" aria-label="Next" onClick={() => slide(1, true)}>
          <Chevron dir="right" size={14} />
        </button>
      </div>
    </div>
  );
}

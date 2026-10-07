'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '../shop/ShopProvider';
import { AddressSearch } from '../shop/AddressSearch';
import { NanaIcon, Chevron } from './NanaIcon';

const NAV = [
  { href: '/marketplace', label: 'Marketplace', strong: true },
  { href: '/vendors', label: 'Vendors' },
  { href: '/riders', label: 'Riders' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
];

const MORE = [
  { href: '/marketplace', label: 'Marketplace', strong: true },
  { href: '/vendors', label: 'Sell on Nana' },
  { href: '/riders', label: 'Ride with Nana' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/investors', label: 'Investors' },
  { href: '/help', label: 'Help centre' },
  { href: '/contact', label: 'Contact' },
];

type Menu = 'addr' | 'more' | null;

export function SiteHeader() {
  const shop = useShop();
  const path = usePathname();
  const [menu, setMenu] = useState<Menu>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMenu(null), [path]);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  const toggle = (m: Menu) => setMenu((cur) => (cur === m ? null : m));

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255,255,255,.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: 'inset 0 -1px 0 var(--line)',
      }}
    >
      <div ref={ref} className="v-wrap" style={{ height: 72, display: 'flex', alignItems: 'center', gap: 'clamp(8px,2vw,28px)' }}>
        <Link href="/" style={{ display: 'flex', flexShrink: 0 }} aria-label="Nana home">
          <Image src="/nana.png" alt="Nana" width={114} height={28} priority className="v-logo" style={{ width: 'auto' }} />
        </Link>

        <div style={{ position: 'relative', flexShrink: 1, minWidth: 0 }}>
          <button
            type="button"
            onClick={() => toggle('addr')}
            aria-expanded={menu === 'addr'}
            style={{
              height: 44,
              border: 0,
              borderRadius: 999,
              background: 'var(--blue-tint)',
              padding: '0 14px 0 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              maxWidth: '100%',
              overflow: 'hidden',
            }}
          >
            <NanaIcon name="MapPinSize20" size={18} style={{ color: 'var(--blue-ink)' }} />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15, minWidth: 0, overflow: 'hidden' }}>
              <span className="v-desk-only" style={{ fontSize: 11, color: 'var(--blue-ink)', fontWeight: 600, whiteSpace: 'nowrap' }}>Deliver to</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', width: '100%', maxWidth: 'clamp(96px,26vw,170px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {shop.address?.label ?? 'Set address'}
              </span>
            </span>
            <Chevron style={{ flexShrink: 0 }} />
          </button>
          {menu === 'addr' && (
            <div style={{ ...popover, left: 0, width: 360, maxWidth: '88vw', padding: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--subtle)', padding: '4px 4px 10px', display: 'block' }}>
                Where should we deliver?
              </span>
              {shop.address && (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '4px 4px 12px' }}>
                  <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--blue)', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.4 }}>{shop.address.line}</span>
                </div>
              )}
              <AddressSearch
                autoFocus
                onPick={(a) => {
                  shop.setAddress(a);
                  setMenu(null);
                }}
              />
            </div>
          )}
        </div>

        <nav className="v-desk-only" style={{ display: 'flex', columnGap: 'clamp(14px,1.8vw,24px)', flex: 1, flexWrap: 'wrap', minWidth: 0, height: 44, overflow: 'hidden', alignItems: 'center', whiteSpace: 'nowrap' }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`v-nav-link${path === n.href ? ' is-on' : ''}`} style={n.strong ? { fontWeight: 600 } : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div style={{ position: 'relative', flexShrink: 0, marginLeft: 'auto' }}>
          <button
            type="button"
            onClick={() => toggle('more')}
            aria-expanded={menu === 'more'}
            className="v-btn v-btn--sm"
            style={{ background: menu === 'more' ? 'var(--fill)' : 'transparent', color: 'var(--text)', fontWeight: 500, padding: '0 10px', gap: 6 }}
            aria-label="More pages"
          >
            <span className="v-desk-only">More</span>
            <Chevron />
          </button>
          {menu === 'more' && (
            <div style={{ ...popover, right: 0, width: 220 }}>
              {MORE.map((m) => (
                <Link key={m.label} href={m.href} className="v-menu-item" style={m.strong ? { fontWeight: 600 } : undefined}>
                  {m.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          <button type="button" onClick={() => shop.setCartOpen(true)} className="v-btn v-btn--sm v-btn--soft" style={{ padding: '0 12px', gap: 8 }} aria-label={`Cart, ${shop.count} items`}>
            <span className="v-desk-only">Cart</span>
            <NanaIcon name="ShoppingCartSize20" size={20} className="v-mob-only" />
            <span className="v-num" style={{ minWidth: 24, height: 24, borderRadius: 999, background: 'var(--blue)', color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 7px' }}>
              {shop.ready ? shop.count : 0}
            </span>
          </button>
          <Link href="/#get-app" className="v-btn v-btn--sm v-btn--ink v-desk-only">
            Get the app
          </Link>
        </div>
      </div>
    </header>
  );
}

const popover: React.CSSProperties = {
  position: 'absolute',
  top: 54,
  background: '#fff',
  borderRadius: 22,
  boxShadow: 'var(--pop-shadow)',
  padding: 8,
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
  animation: 'nRise .25s both',
};

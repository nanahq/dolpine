'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppStoreLink } from './AppStoreLink';

const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app';

const NAV = [
  { href: '/merchant', label: 'Restaurants' },
  { href: '/vendors', label: 'For vendors' },
  { href: '/riders', label: 'For riders' },
  { href: '/about', label: 'About' },
  { href: '/investors', label: 'Investors' },
  { href: '/help', label: 'Help' },
];

export const SiteHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.86)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-subtle)',
        boxShadow: scrolled ? '0 4px 20px rgba(28,25,23,.07)' : 'none',
        transition:
          'box-shadow 240ms var(--ease-standard), background 240ms var(--ease-standard)',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <Link
          href="/"
          style={{ flex: 'none', display: 'flex', alignItems: 'center' }}
        >
          <Image
            src="/nana.png"
            alt="Nana"
            width={459}
            height={114}
            priority
            style={{ height: 26, width: 'auto', display: 'block' }}
          />
        </Link>
        <nav
          className="no-scrollbar"
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            gap: 22,
            overflowX: 'auto',
            alignItems: 'center',
          }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--text-body)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <AppStoreLink
          href={PLAY_STORE}
          platform="android"
          placement="header"
          target="_blank"
          rel="noreferrer"
          className="n-btn n-btn--dark"
          style={{ flex: 'none', height: 42, padding: '0 20px', fontSize: 15 }}
        >
          Get the app
        </AppStoreLink>
      </div>
    </header>
  );
};

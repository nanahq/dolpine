import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppStoreLink } from './AppStoreLink';

const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app';
const APP_STORE =
  'https://apps.apple.com/us/app/nana-delivery-more/id6499050428';

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Partner with Nana',
    links: [
      { href: '/vendors', label: 'For vendors' },
      { href: '/riders', label: 'For riders' },
      { href: '/contact', label: 'For businesses' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/careers', label: 'Careers' },
      { href: '/investors', label: 'Investors' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/help', label: 'Help centre' },
      { href: '/contact', label: 'Contact us' },
      { href: '/merchant', label: 'Browse stores' },
    ],
  },
];

const linkStyle: React.CSSProperties = {
  fontSize: 14,
  color: 'var(--text-body)',
};

export const SiteFooter: React.FC = () => {
  return (
    <footer
      style={{
        background: '#fff',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(38px,5vw,56px) 0 30px',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            marginBottom: 'clamp(28px,4vw,40px)',
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--color-primary)' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--nana-blue-300)' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--nana-blue-100)' }} />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
            gap: 32,
          }}
        >
          <div>
            <Image
              src="/nana.png"
              alt="Nana"
              width={459}
              height={114}
              style={{ height: 26, width: 'auto', display: 'block' }}
            />
            <p
              style={{
                margin: '14px 0 0',
                fontSize: 14,
                lineHeight: 1.5,
                color: 'var(--text-muted)',
                maxWidth: '20em',
              }}
            >
              Reliable delivery for the cities everyone else skipped. Founded in
              Kano, Nigeria.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <AppStoreLink
                href={PLAY_STORE}
                platform="android"
                placement="footer"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  height: 40,
                  padding: '0 16px',
                  borderRadius: 999,
                  background: 'var(--stone-900)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/google-icon.svg" alt="" style={{ width: 15, height: 15 }} />
                Google Play
              </AppStoreLink>
              <AppStoreLink
                href={APP_STORE}
                platform="ios"
                placement="footer"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  height: 40,
                  padding: '0 16px',
                  borderRadius: 999,
                  color: 'var(--text-strong)',
                  fontSize: 13,
                  fontWeight: 600,
                  boxShadow: 'inset 0 0 0 1.5px var(--border-default)',
                }}
              >
                {/* app-store.svg ships white; darken it for this light button */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app-store.svg" alt="" style={{ width: 15, height: 15, filter: 'brightness(0)' }} />
                App Store
              </AppStoreLink>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              style={{ display: 'flex', flexDirection: 'column', gap: 11 }}
            >
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: 'var(--text-strong)',
                }}
              >
                {col.title}
              </div>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} style={linkStyle}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 38,
            paddingTop: 22,
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--text-subtle)' }}>
            © Nana 2026 · An Imagyne Ventures company
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <Link href="/privacy" style={{ fontSize: 13, color: 'var(--text-subtle)' }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-subtle)' }}>
              Terms
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 13, color: 'var(--text-subtle)' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

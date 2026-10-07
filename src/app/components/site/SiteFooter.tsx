import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { INSTAGRAM_URL } from '@/lib/site';

const COLUMNS = [
  { title: 'Shop', links: [['/marketplace', 'Marketplace'], ['/#get-app', 'Get the app'], ['/help', 'Help centre']] },
  { title: 'Partners', links: [['/vendors', 'Sell on Nana'], ['/riders', 'Ride with Nana']] },
  { title: 'Company', links: [['/about', 'About'], ['/careers', 'Careers'], ['/investors', 'Investors'], ['/contact', 'Contact']] },
];

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--ink)', color: '#fff' }}>
      <div className="v-wrap" style={{ padding: 'clamp(64px,8vw,100px) var(--gutter) 40px', display: 'flex', flexDirection: 'column', gap: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, gridColumn: 'span 2', minWidth: 0 }}>
            <Image src="/nana.png" alt="Nana" width={139} height={34} style={{ height: 34, width: 'auto', alignSelf: 'flex-start', filter: 'brightness(0) invert(1)' }} />
            <span className="v-h3" style={{ fontSize: 'clamp(24px,2.5vw,32px)', color: 'var(--blue)' }}>
              Food. Groceries.
              <br />
              Errands.
            </span>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--subtle)' }}>{c.title}</span>
              {c.links.map(([href, label]) => (
                <Link key={href} href={href} className="v-footer-link">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingTop: 24, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14)' }}>
          <span style={{ fontSize: 14, color: 'var(--subtle)' }}>© {new Date().getFullYear()} Nana Technologies</span>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link href="/privacy" className="v-footer-link v-footer-link--sm">Privacy</Link>
            <Link href="/terms" className="v-footer-link v-footer-link--sm">Terms</Link>
            <a href={INSTAGRAM_URL} className="v-footer-link v-footer-link--sm" target="_blank" rel="noreferrer">@nanahq_</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import Image from 'next/image';
import QrCode from '@/assets/qr-code.jpg';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/site';
import { AppStoreLink } from '../site/AppStoreLink';

/** Green "Faster in the app" block with store badges and the download QR. Anchored at #get-app. */
export function GetTheApp() {
  return (
    <section id="get-app" className="v-wrap" style={{ paddingTop: 20, paddingBottom: 'clamp(96px,10vw,140px)', scrollMarginTop: 80 }}>
      <div
        className="v-reveal"
        style={{ borderRadius: 40, background: 'var(--green)', padding: 'clamp(36px,6vw,80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 48, alignItems: 'center' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 className="v-h2" style={{ color: '#fff' }}>
            Faster
            <br />
            in the app
          </h2>
          <p className="v-lede" style={{ color: '#fff', maxWidth: 420 }}>Errands, parcels, live tracking and spin-and-win — all in your pocket.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StoreBadge href={APP_STORE_URL} platform="ios" small="Download on the" big="App Store" />
            <StoreBadge href={PLAY_STORE_URL} platform="android" small="Get it on" big="Google Play" />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', transform: 'rotate(-4deg)' }}>
            <div style={{ width: 'clamp(220px,24vw,300px)', aspectRatio: '1/1', background: '#fff', borderRadius: 28, padding: 22, boxShadow: '0 30px 60px rgba(0,0,0,.25)', animation: 'nFloat 5s ease-in-out infinite alternate' }}>
              <Image src={QrCode} alt="QR code to download Nana" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <div className="v-sticker" style={{ position: 'absolute', right: -28, top: -22, padding: '12px 18px 10px', transform: 'rotate(10deg)', fontSize: 24, letterSpacing: '.04em' }}>
              Scan me
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreBadge({ href, platform, small, big }: { href: string; platform: 'ios' | 'android'; small: string; big: string }) {
  return (
    <AppStoreLink
      href={href}
      platform={platform}
      placement="home_get_app"
      target="_blank"
      rel="noreferrer"
      className="v-store-badge"
    >
      <span style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1 }}>{small}</span>
      <span style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{big}</span>
    </AppStoreLink>
  );
}

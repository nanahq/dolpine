'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QrCode from '@/assets/qr-code.jpg';
import { readJson, writeJson } from '@/lib/storage';

const KEY = 'nana_web_app_banner_dismissed';

/** Dark "It's faster in the app" banner at the top of the marketplace; dismissal is remembered. */
export function AppBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(!readJson<boolean>(KEY)), []);
  if (!show) return null;

  return (
    <div className="v-rise" style={{ borderRadius: 22, background: 'var(--ink)', padding: '14px 14px 14px 18px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', animationDuration: '.6s' }}>
      <div className="v-desk-only" style={{ width: 56, height: 56, borderRadius: 14, background: '#fff', padding: 6, flexShrink: 0 }}>
        <Image src={QrCode} alt="QR code to download Nana" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      </div>
      <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#fff', letterSpacing: '-.015em' }}>It’s faster in the app</span>
          <span className="v-sticker" style={{ padding: '4px 9px 3px', transform: 'rotate(-3deg)', fontSize: 13 }}>₦1,000 off</span>
        </div>
        <span style={{ fontSize: 14, color: 'var(--faint)', lineHeight: 1.45 }}>
          Live tracking, spin-and-win at checkout, and ₦1,000 off your first order.
        </span>
      </div>
      <Link href="/open" className="v-btn v-btn--sky v-btn--sm">
        <span className="v-desk-only">Get the app</span>
        <span className="v-mob-only">Open the app</span>
      </Link>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          writeJson(KEY, true);
          setShow(false);
        }}
        style={{ width: 40, height: 40, border: 0, borderRadius: 999, background: 'rgba(255,255,255,.1)', color: '#fff', fontSize: 14, cursor: 'pointer', flexShrink: 0 }}
      >
        ✕
      </button>
    </div>
  );
}

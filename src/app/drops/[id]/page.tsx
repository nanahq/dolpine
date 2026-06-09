'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

function isInstagramWebView(ua: string) {
  return /Instagram/i.test(ua);
}

function isIOS(ua: string) {
  return /iPhone|iPad|iPod/i.test(ua);
}

export default function DropsRedirectPage() {
  const { id } = useParams<{ id: string }>();
  const [platform, setPlatform] = useState<'instagram-ios' | 'instagram-android' | 'other'>('other');
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;

    if (isInstagramWebView(ua)) {
      setPlatform(isIOS(ua) ? 'instagram-ios' : 'instagram-android');
      return;
    }

    // Outside Instagram — try the custom scheme, fall back gracefully
    const deepLink = `nanadelivery://drops/${id}`;
    const fallback = isIOS(ua)
      ? 'https://apps.apple.com/app/nana-food-delivery/id6499050428'
      : 'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app';

    window.location.href = deepLink;

    const timer = setTimeout(() => {
      setRedirectAttempted(true);
      window.location.href = fallback;
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const deepLink = `nanadelivery://drops/${id}`;

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <Image src="/new-log.jpg" alt="Nana" width={64} height={64} style={styles.logo} />
        </div>

        <h1 style={styles.heading}>Open in the Nana app</h1>

        {platform === 'other' && (
          <>
            <p style={styles.sub}>
              {redirectAttempted
                ? "Looks like the app isn't installed yet."
                : 'Opening the Nana app…'}
            </p>

            <a href={deepLink} style={styles.primaryBtn}>
              Open in Nana
            </a>

            <div style={styles.storeRow}>
              <a
                href="https://apps.apple.com/app/nana-food-delivery/id6499050428"
                style={styles.storeBtn}
              >
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.nanaeats.nana_app"
                style={styles.storeBtn}
              >
                Google Play
              </a>
            </div>
          </>
        )}

        {platform === 'instagram-ios' && (
          <>
            <p style={styles.sub}>
              Instagram's browser can't open the app directly.
            </p>
            <div style={styles.steps}>
              <Step n={1} text='Tap the three dots (•••) at the bottom right' />
              <Step n={2} text='Select "Open in Safari"' />
              <Step n={3} text='The Nana app will open automatically' />
            </div>
            <p style={styles.hint}>
              Or tap below to download the app first:
            </p>
            <a
              href="https://apps.apple.com/app/nana-food-delivery/id6499050428"
              style={styles.primaryBtn}
            >
              Download on App Store
            </a>
          </>
        )}

        {platform === 'instagram-android' && (
          <>
            <p style={styles.sub}>
              Instagram's browser can't open the app directly.
            </p>
            <div style={styles.steps}>
              <Step n={1} text='Tap the three dots (⋮) in the top right corner' />
              <Step n={2} text='Select "Open in Chrome" or "Open in browser"' />
              <Step n={3} text='The Nana app will open automatically' />
            </div>
            <p style={styles.hint}>
              Or tap below to download the app first:
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.nanaeats.nana_app"
              style={styles.primaryBtn}
            >
              Download on Google Play
            </a>
          </>
        )}
      </div>
    </div>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <div style={stepStyles.row}>
      <div style={stepStyles.badge}>{n}</div>
      <p style={stepStyles.text}>{text}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f9ff',
    padding: '24px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '32px 24px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  logoWrap: {
    width: '72px',
    height: '72px',
    borderRadius: '18px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '18px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#181c20',
    margin: 0,
    textAlign: 'center',
  },
  sub: {
    fontSize: '15px',
    color: '#404750',
    margin: 0,
    textAlign: 'center',
    lineHeight: '1.5',
  },
  hint: {
    fontSize: '13px',
    color: '#707881',
    margin: 0,
    textAlign: 'center',
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    background: '#f1f4f9',
    borderRadius: '14px',
    padding: '16px',
  },
  primaryBtn: {
    display: 'block',
    width: '100%',
    padding: '14px',
    background: '#00639a',
    color: '#ffffff',
    borderRadius: '14px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '16px',
    textDecoration: 'none',
    boxSizing: 'border-box',
  },
  storeRow: {
    display: 'flex',
    gap: '10px',
    width: '100%',
  },
  storeBtn: {
    flex: 1,
    padding: '12px',
    background: '#f1f4f9',
    color: '#00639a',
    borderRadius: '12px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '14px',
    textDecoration: 'none',
  },
};

const stepStyles: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  badge: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#00639a',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  text: {
    fontSize: '14px',
    color: '#181c20',
    margin: 0,
    lineHeight: '1.5',
    paddingTop: '4px',
  },
};

import React from 'react';
import Link from 'next/link';
import { NanaIcon } from '../site/NanaIcon';

/** Green "Late? You don't pay." strip shown on the marketplace, store pages and checkout. */
export function GuaranteeStrip({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: 20, background: 'var(--green)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, ...style }}>
      <div style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <NanaIcon name="IconsansBoldTimer" size={20} style={{ color: 'var(--yellow)' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '-.015em' }}>Late? You don’t pay.</span>
        <span style={{ fontSize: 13, color: '#fff', lineHeight: 1.4 }}>
          Miss the time we promise and the order is on us.{' '}
          <Link href="/terms" style={{ color: '#fff', textDecoration: 'underline' }}>
            Terms
          </Link>
        </span>
      </div>
    </div>
  );
}

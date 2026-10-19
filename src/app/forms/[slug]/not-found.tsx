import React from 'react';
import Link from 'next/link';

/** Draft, unknown or deleted form — Nana Form Page.dc.html's not-found state. */
export default function FormNotFound() {
  return (
    <div
      style={{
        maxWidth: 760,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(56px,9vw,120px) clamp(16px,4vw,32px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'flex-start',
      }}
    >
      <span className="v-display v-display--black" style={{ fontSize: 'clamp(96px,16vw,180px)', lineHeight: 0.85, color: 'var(--blue)' }}>
        404
      </span>
      <span style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 600, letterSpacing: '-.025em' }}>We can’t find that form</span>
      <span style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--muted)', maxWidth: 460 }}>
        The link may be old, or the form isn’t published yet.
      </span>
      <Link href="/" className="v-btn v-btn--ink">
        Back to Nana
      </Link>
    </div>
  );
}

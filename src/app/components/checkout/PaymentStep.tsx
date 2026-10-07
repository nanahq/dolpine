                                               'use client';

import React from 'react';

export type PayMethod = 'bank_transfer' | 'card';

type Props = {
  method: PayMethod;
  setMethod: (m: PayMethod) => void;
  promo: {
    code: string;
    setCode: (v: string) => void;
    apply: () => void;
    clear: () => void;
    applied: string | null;
    busy: boolean;
    error: string | null;
    canApply: boolean;
  };
};

const METHODS: { key: PayMethod; label: string; sub: string }[] = [
  { key: 'bank_transfer', label: 'Bank transfer', sub: 'One-time account, exact amount' },
  { key: 'card', label: 'Card', sub: 'Visa, Mastercard, Verve' },
];

/** Step 3: how the customer pays, and exactly what happens after they press Place order. */
export function PaymentStep({ method, setMethod, promo }: Props) {
  return (
    <div className="v-panel" style={{ gap: 14 }}>
      <span style={{ fontSize: 20, fontWeight: 600 }}>3 · Payment</span>
      {METHODS.map((m) => {
        const on = m.key === method;
        return (
          <div
            key={m.key}
            style={{ borderRadius: 16, background: on ? 'var(--blue-tint)' : '#fff', boxShadow: on ? 'inset 0 0 0 2px var(--blue)' : 'inset 0 0 0 1px var(--line)', overflow: 'hidden' }}
          >
            <button
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setMethod(m.key)}
              style={{ width: '100%', border: 0, background: 'none', cursor: 'pointer', textAlign: 'left', padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <span style={{ width: 20, height: 20, borderRadius: 999, flexShrink: 0, boxShadow: on ? 'inset 0 0 0 6px var(--blue)' : 'inset 0 0 0 1.5px var(--line-strong)' }} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: 14, color: on ? 'var(--blue-ink)' : 'var(--muted)' }}>{m.sub}</span>
              </span>
              {m.key === 'card' && <CardMarks />}
            </button>
            {on && <div style={{ padding: '0 18px 18px 52px' }}>{m.key === 'bank_transfer' ? <TransferHow /> : <CardHow />}</div>}
          </div>
        );
      })}

      <div className="v-field" style={{ marginTop: 6 }}>
        <label className="v-label" htmlFor="co-promo">
          Promo code <small>· optional</small>
        </label>
        {promo.applied ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 14, background: 'var(--fill)', padding: '0 8px 0 16px', height: 52 }}>
            <span className="v-sticker" style={{ padding: '4px 9px 3px', fontSize: 14, transform: 'rotate(-2deg)' }}>{promo.applied}</span>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--muted)' }}>Applied</span>
            <button type="button" className="v-link-btn" style={{ fontSize: 14, padding: '0 8px' }} onClick={promo.clear}>
              Remove
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="co-promo"
              className="v-input"
              style={{ textTransform: 'uppercase', flex: 1 }}
              value={promo.code}
              onChange={(e) => promo.setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), promo.apply())}
              placeholder="e.g. NANA500"
              autoCapitalize="characters"
            />
            <button type="button" className="v-btn v-btn--soft" onClick={promo.apply} disabled={promo.busy || !promo.code.trim() || !promo.canApply}>
              {promo.busy ? <span className="v-spinner" /> : 'Apply'}
            </button>
          </div>
        )}
        {promo.error ? (
          <span className="v-err">{promo.error}</span>
        ) : (
          !promo.canApply && !promo.applied && <span style={{ fontSize: 13, color: 'var(--subtle)' }}>Verify your phone and add an address to check a code.</span>
        )}
      </div>
    </div>
  );
}

function TransferHow() {
  return (
    <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, lineHeight: 1.5, color: 'var(--text)' }}>
      <li>Place the order and we show you a Nana account number made for this order only.</li>
      <li>Transfer the <strong>exact amount</strong> from any bank app or USSD before the timer runs out (about 30 minutes).</li>
      <li>This page confirms by itself within a minute of the money landing. No receipt upload needed.</li>
    </ol>
  );
}

function CardHow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, lineHeight: 1.5, color: 'var(--text)' }}>
      <span>
        You’ll enter your card on our payment provider’s secure page, approve it with your bank’s OTP, then come straight back here.
      </span>
      <span style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--muted)', fontSize: 13 }}>
        <LockGlyph />
        Nana never sees or stores your card number.
      </span>
    </div>
  );
}

function CardMarks() {
  const mark = (label: string, bg: string, fg: string) => (
    <span style={{ height: 24, padding: '0 6px', borderRadius: 5, background: bg, color: fg, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', display: 'flex', alignItems: 'center' }}>{label}</span>
  );
  return (
    <span className="v-desk-only" style={{ display: 'flex', gap: 4 }} aria-hidden="true">
      {mark('VISA', '#1A1F71', '#fff')}
      {mark('MC', '#EB001B', '#fff')}
      {mark('VERVE', '#00425F', '#fff')}
    </span>
  );
}

function LockGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

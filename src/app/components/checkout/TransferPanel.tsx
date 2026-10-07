'use client';

import React, { useEffect, useState } from 'react';
import { formatNaira } from '@/lib/format';
import { usePaymentStatus } from './usePaymentStatus';

export interface TransferDetails {
  orderId: string;
  bankName: string;
  accountNumber: string;
  accountName: string | null;
  /** Naira, as the gateway will expect it — not our estimate. */
  amount: number;
  expiresAt: string | null;
}

type Props = {
  transfer: TransferDetails;
  onPaid: (orderNumber: string | null) => void;
  onStartOver: () => void;
};

const FALLBACK_WINDOW_MS = 30 * 60_000;

/**
 * The bank-transfer leg of checkout: a one-time account for this order only.
 * Confirms itself — the gateway's webhook moves the order off `pending`, and
 * this panel is polling for exactly that.
 */
export function TransferPanel({ transfer, onPaid, onStartOver }: Props) {
  const { status, orderNumber, checking, checkNow } = usePaymentStatus(transfer.orderId);
  const [deadline] = useState(() => (transfer.expiresAt ? new Date(transfer.expiresAt).getTime() : Date.now() + FALLBACK_WINDOW_MS));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (status === 'paid') onPaid(orderNumber);
  }, [status, orderNumber, onPaid]);

  const left = Math.max(0, deadline - now);
  const expired = status === 'expired' || left === 0;
  const mm = Math.floor(left / 60_000);
  const ss = Math.floor((left % 60_000) / 1000);

  if (expired) {
    return (
      <div className="v-panel" style={{ alignItems: 'flex-start', maxWidth: 640 }}>
        <span className="v-h3" style={{ fontSize: 30 }}>This account has expired</span>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--muted)' }}>
          We didn’t see a transfer in time, so the order was cancelled. If you already sent money to{' '}
          <strong className="v-num">{transfer.accountNumber}</strong>, WhatsApp us on 0812 222 9693 with the time you paid and we’ll sort it out.
        </p>
        <button type="button" className="v-btn v-btn--ink" onClick={onStartOver}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 24, alignItems: 'start' }}>
      <div className="v-panel" style={{ gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="v-eyebrow" style={{ color: 'var(--blue-ink)' }}>Bank transfer</span>
          <span style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.5 }}>
            Send exactly this amount to the account below from any bank app. The account is for this order only.
          </span>
        </div>

        <CopyRow label="Amount to send" value={formatNaira(transfer.amount)} copyValue={String(Math.round(transfer.amount))} big />
        <CopyRow label="Account number" value={transfer.accountNumber} copyValue={transfer.accountNumber} big />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16 }}>
          <Detail label="Bank" value={transfer.bankName || '—'} />
          <Detail label="Account name" value={transfer.accountName || '—'} />
        </div>

        <div style={{ borderRadius: 16, background: '#FFF4C2', padding: '12px 16px', fontSize: 14, lineHeight: 1.5, color: '#5C4500' }}>
          Send the exact amount in one transfer — a different amount can’t be matched to your order automatically.
        </div>
      </div>

      <div style={{ borderRadius: 24, background: 'var(--ink)', color: '#fff', padding: 'clamp(22px,3vw,30px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--subtle)' }}>Expires in</span>
          <span className="v-display v-display--black v-num" style={{ fontSize: 'clamp(64px,8vw,96px)', color: left < 5 * 60_000 ? 'var(--yellow)' : 'var(--blue)' }}>
            {mm}:{String(ss).padStart(2, '0')}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="v-pulse-dot" />
          <span style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--faint)' }}>
            Waiting for your transfer. This page updates by itself — keep it open.
          </span>
        </div>
        <button type="button" className="v-btn v-btn--sky" onClick={() => void checkNow()} disabled={checking}>
          {checking ? <span className="v-spinner" /> : 'I’ve sent the money'}
        </button>
        <span style={{ fontSize: 13, color: 'var(--subtle)', lineHeight: 1.5 }}>
          Banks usually take under a minute. If it’s been longer, your bank may still be processing — don’t send it twice.
        </span>
      </div>
    </div>
  );
}

function CopyRow({ label, value, copyValue, big }: { label: string; value: string; copyValue: string; big?: boolean }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (http or permissions); the number is on screen to type.
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderRadius: 18, background: 'var(--fill)', padding: '14px 14px 14px 18px' }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{label}</span>
        <span className="v-num" style={{ fontSize: big ? 'clamp(26px,3vw,32px)' : 18, fontWeight: 600, letterSpacing: big ? '.02em' : undefined }}>{value}</span>
      </span>
      <button type="button" className="v-btn v-btn--sm" onClick={copy} style={{ background: copied ? 'var(--green)' : '#fff', color: copied ? '#fff' : 'var(--text)', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontSize: 17, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

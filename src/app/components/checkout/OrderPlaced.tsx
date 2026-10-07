import React from 'react';
import Link from 'next/link';
import { formatNaira } from '@/lib/format';
import { formatNgPhone } from '@/lib/phone';

type Props = { orderId: string; orderNumber: string | null; total: number | null; phone: string | null };

/** Payment confirmed. */
export function OrderPlaced({ orderId, orderNumber, total, phone }: Props) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(32px,6vw,80px) 0 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, textAlign: 'center' }}>
      <div className="v-pop" style={{ width: 120, height: 120, borderRadius: 999, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 56, color: '#fff', lineHeight: 1 }}>✓</span>
      </div>
      <h1 className="v-display v-rise" style={{ fontSize: 'clamp(56px,8vw,104px)', color: 'var(--ink)', animationDelay: '.2s' }}>Order placed</h1>
      <p className="v-rise" style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: 'var(--muted)', animationDelay: '.3s' }}>
        Payment received{orderNumber ? ` for order ${orderNumber}` : ''}
        {total != null ? ` · ${formatNaira(total)}` : ''}. Follow it live from the tracking page
        {phone ? ` — the rider has ${formatNgPhone(phone)} if they need you` : ''}.
      </p>
      <div className="v-rise" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', animationDelay: '.4s' }}>
        <Link href={`/track/${orderId}`} className="v-btn v-btn--ink" style={{ height: 54 }}>
          Track your order
        </Link>
        <Link href="/marketplace" className="v-btn v-btn--soft" style={{ height: 54 }}>
          Keep shopping
        </Link>
      </div>
      <span style={{ fontSize: 14, color: 'var(--muted)' }}>
        You can also follow it in the <Link href="/open">Nana app</Link> — sign in with the same number.
      </span>
    </div>
  );
}

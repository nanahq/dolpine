'use client';

import React from 'react';
import { formatNaira } from '@/lib/format';
import type { Breakdown } from '@/lib/checkout/pricing';
import { lineUnitPrice, type Cart } from '@/lib/shop/cart';
import { GuaranteeStrip } from '../shop/GuaranteeStrip';
import type { PayMethod } from './PaymentStep';

type Props = {
  cart: Cart;
  price: Breakdown;
  method: PayMethod;
  placing: boolean;
  blocker: string | null;
  error: string | null;
  onPlace: () => void;
};

/** Sticky "Your order" card: lines, fees, total and the Place order button. */
export function OrderSummary({ cart, price, method, placing, blocker, error, onPlace }: Props) {
  const total = price.total;
  return (
    <div style={{ position: 'sticky', top: 100, borderRadius: 24, background: 'var(--fill)', padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <span style={{ fontSize: 20, fontWeight: 600 }}>Your order</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 16, boxShadow: 'inset 0 -1px 0 var(--line-strong)' }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>{cart.merchant?.name}</span>
        {cart.lines.map((l) => (
          <div key={l.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 15 }}>
              {l.qty} × {l.name}
              {l.variants.length > 0 && <span style={{ color: 'var(--muted)' }}> · {l.variants.map((v) => v.name).join(', ')}</span>}
            </span>
            <span className="v-num" style={{ fontSize: 15, whiteSpace: 'nowrap' }}>{formatNaira(l.qty * lineUnitPrice(l))}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Row label="Subtotal" value={formatNaira(price.subtotal)} />
        <Row label="Delivery" value={price.delivery == null ? 'Add address' : price.delivery === 0 ? 'Free' : formatNaira(price.delivery)} />
        <Row label={price.serviceLabel} value={formatNaira(price.service)} />
        {price.charges.map((c) => <Row key={c.label} label={c.label} value={formatNaira(c.amount)} />)}
        {price.discount > 0 && <Row label="Promo" value={`−${formatNaira(price.discount)}`} accent />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 6 }}>
        <span style={{ fontSize: 18, fontWeight: 600 }}>Total</span>
        <span className="v-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-.02em' }}>{total == null ? '—' : formatNaira(total)}</span>
      </div>
      <GuaranteeStrip style={{ padding: '12px 14px' }} />
      <button type="button" className="v-btn v-btn--blue v-btn--xl v-btn--block" onClick={onPlace} disabled={placing || !!blocker}>
        {placing ? (
          <>
            <span className="v-spinner" /> Placing your order…
          </>
        ) : (
          <>
            {method === 'card' ? 'Pay by card' : 'Place order'}
            {total != null && ` · ${formatNaira(total)}`}
          </>
        )}
      </button>
      {(blocker || error) && <span style={{ fontSize: 14, color: 'var(--danger)', textAlign: 'center', lineHeight: 1.45 }}>{blocker ?? error}</span>}
      <span style={{ fontSize: 12.5, color: 'var(--subtle)', textAlign: 'center', lineHeight: 1.5 }}>
        Final amount is confirmed by our server when you place the order, including any live promotions.
      </span>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 15, color: 'var(--muted)' }}>{label}</span>
      <span className="v-num" style={{ fontSize: 15, color: accent ? 'var(--green)' : undefined, fontWeight: accent ? 600 : undefined }}>{value}</span>
    </div>
  );
}

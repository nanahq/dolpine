import React from 'react';
import { formatNaira } from '@/lib/format';
import type { CookDay, KitchenPage } from '@/lib/homemade';
import type { Delivery } from './KitchenApp';
import { Lines, Row } from './KitchenMenu';
import { dayLabels, priceCart } from './kitchen-cart';

type Props = {
  data: KitchenPage;
  day: CookDay;
  priced: ReturnType<typeof priceCart>;
  delivery: Delivery;
  showAddress: boolean;
};

/** The checkout's summary. Uses the server quote once there is one; until then, the menu prices. */
export function OrderAside({ data, day, priced, delivery, showAddress }: Props) {
  const { quote, address } = delivery;
  const l = dayLabels(day);
  const sub = quote?.subtotal ?? priced.subtotal;
  const deliveryFee = quote?.delivery_fee ?? data.fees.delivery_fee;
  const total = quote?.total ?? Math.round((sub + deliveryFee) / 10) * 10;
  const name = delivery.firstName.trim() || 'you';
  return (
    <aside className="k-card" style={{ background: 'var(--fill)', boxShadow: 'none', gap: 12 }}>
      <span style={{ fontSize: 18, fontWeight: 600 }}>{data.kitchen.name}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-ink)' }}>
        {l.full} · {l.window}
      </span>
      <Lines priced={priced} />
      <div style={{ height: 1, background: 'var(--line-strong)' }} />
      <Row label="Plates" value={formatNaira(sub)} />
      <Row label="Delivery · flat" value={formatNaira(deliveryFee)} />
      {quote && quote.service_fee > 0 && <Row label="Service fee" value={formatNaira(quote.service_fee)} />}
      {!data.fees.service_fee_enabled && (
        <span className="k-chip" style={{ height: 24, fontSize: 12, fontWeight: 700, background: '#E7F5EC', color: 'var(--green)', alignSelf: 'flex-start' }}>
          No service fee
        </span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Total</span>
        <span className="v-num" style={{ fontSize: 24, fontWeight: 600 }}>
          {formatNaira(total)}
        </span>
      </div>
      {showAddress && address && (
        <div style={{ borderRadius: 14, background: '#fff', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Deliver to {name}</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{address.line}</span>
        </div>
      )}
    </aside>
  );
}

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api/client';
import { formatNaira } from '@/lib/format';
import { getWalletBalance, placeHomemadeOrder, type CookDay, type HomemadeQuote } from '@/lib/homemade';
import { savePendingCard, type WebSession } from '@/lib/checkout/session';
import { track } from '@/lib/analytics';
import { NanaIcon } from '../../components/site/NanaIcon';
import { TransferPanel, type TransferDetails } from '../../components/checkout/TransferPanel';
import type { Delivery } from './KitchenApp';
import { quoteBody, type KitchenCart } from './kitchen-cart';

type Props = {
  slug: string;
  day: CookDay;
  cart: KitchenCart;
  session: WebSession;
  delivery: Delivery;
  holdMinutes: number;
  onBack: () => void;
  onQuoteChanged: (q: HomemadeQuote) => void;
};

type Method = 'wallet' | 'bank_transfer' | 'card';

export function PayStep({ slug, day, cart, session, delivery, holdMinutes, onBack, onQuoteChanged }: Props) {
  const router = useRouter();
  const quote = delivery.quote!;
  const [balance, setBalance] = useState(0);
  const [method, setMethod] = useState<Method>('bank_transfer');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [transfer, setTransfer] = useState<TransferDetails | null>(null);

  useEffect(() => {
    getWalletBalance(session.token)
      .then((w) => setBalance(Number(w.balance) || 0))
      .catch(() => {});
  }, [session.token]);

  const orderPage = useCallback((id: string) => `/k/${slug}/order?id=${encodeURIComponent(id)}`, [slug]);
  const onPaid = useCallback(() => {
    if (transfer) router.push(orderPage(transfer.orderId));
  }, [transfer, router, orderPage]);

  async function pay() {
    setBusy(true);
    setMsg(null);
    // A wallet short of the total pays what it can; the rest goes by transfer.
    const charge = method === 'card' ? 'card' : 'bank_transfer';
    try {
      const placed = await placeHomemadeOrder(session.token, day.id, {
        ...quoteBody(cart, delivery.address!, delivery.landmark),
        ...(delivery.note.trim() ? { note_for_cook: delivery.note.trim() } : {}),
        ...(delivery.firstName.trim() ? { first_name: delivery.firstName.trim() } : {}),
        payment_method: method === 'wallet' ? 'wallet' : 'online',
        charge_method: charge,
        ...(charge === 'card' ? { callback_url: `${window.location.origin}/k/${slug}/order` } : {}),
        quoted_total: quote.total,
      });
      const id = placed.order.id;
      const data = placed.payment?.data;
      if (method !== 'wallet') track('web_order_placed', { payment_method: charge, order_type: 'homemade', item_count: quote.plates });
      if (!placed.payment) return router.push(orderPage(id));
      if (data?.authorization_url) {
        savePendingCard({ orderId: id, orderNumber: placed.order.order_number, total: quote.total, phone: session.phone });
        window.location.assign(data.authorization_url);
        return;
      }
      if (data?.account_number) {
        const hold = new Date(placed.hold_expires_at).getTime();
        const account = data.account_expires_at ? new Date(data.account_expires_at).getTime() : Infinity;
        setTransfer({
          orderId: id,
          bankName: data.bank?.name ?? '',
          accountNumber: data.account_number,
          accountName: data.account_name ?? null,
          amount: data.amount ? data.amount / 100 : quote.total,
          expiresAt: new Date(Math.min(hold, account)).toISOString(),
        });
        return;
      }
      router.push(orderPage(id));
    } catch (e) {
      const p = e instanceof ApiError ? (e.payload as { code?: string; quote?: HomemadeQuote } | null) : null;
      if (p?.code === 'PRICE_CHANGED' && p.quote) {
        onQuoteChanged(p.quote);
        setMsg(`The total changed to ${formatNaira(p.quote.total)}. Check it, then pay.`);
      } else {
        setMsg(e instanceof ApiError ? e.message : 'Could not place the order. Try again.');
      }
    } finally {
      setBusy(false);
    }
  }

  if (transfer) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.03em' }}>Send the transfer</span>
        <TransferPanel
          transfer={transfer}
          onPaid={onPaid}
          countdownLabel="Plates held for"
          expired={{
            title: 'Your hold expired',
            body: 'Check the plates are still available and try again. If you already sent the money, we’ll confirm the order if the plates are still there — otherwise it goes back to your Nana wallet.',
            action: 'Hold again',
          }}
          onStartOver={() => setTransfer(null)}
        />
      </div>
    );
  }

  const methods: { id: Method; label: string; sub: string }[] = [
    ...(balance > 0
      ? [{ id: 'wallet' as const, label: 'Nana wallet', sub: balance >= quote.total ? `${formatNaira(balance)} balance` : `${formatNaira(balance)} balance · rest by bank transfer` }]
      : []),
    { id: 'bank_transfer', label: 'Bank transfer', sub: 'One-time account, exact amount' },
    { id: 'card', label: 'Card', sub: 'Visa, Mastercard, Verve' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.03em' }}>How would you like to pay?</span>
      <div style={{ borderRadius: 14, background: '#FFF4C2', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, maxWidth: 560 }}>
        <NanaIcon name="IconsansBoldTimer" size={18} />
        <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>We hold your plates for {holdMinutes} minutes once you tap Pay.</span>
      </div>
      <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560 }}>
        {methods.map((m) => {
          const on = method === m.id;
          return (
            <button key={m.id} type="button" role="radio" aria-checked={on} onClick={() => setMethod(m.id)} style={{ border: 0, cursor: 'pointer', textAlign: 'left', borderRadius: 16, background: on ? 'var(--blue-tint)' : '#fff', boxShadow: on ? 'inset 0 0 0 2px var(--blue)' : 'inset 0 0 0 1px var(--line)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, background: '#fff', boxShadow: on ? 'inset 0 0 0 7px var(--blue)' : 'inset 0 0 0 1.5px var(--faint)' }} />
              <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{m.sub}</span>
              </span>
            </button>
          );
        })}
      </div>
      {msg && <span className="v-err">{msg}</span>}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" className="v-btn v-btn--blue v-btn--lg v-num" onClick={pay} disabled={busy}>
          {busy ? <span className="v-spinner" /> : `Pay ${formatNaira(quote.total)}`}
        </button>
        <button type="button" className="v-btn v-btn--soft v-btn--lg" onClick={onBack} disabled={busy}>
          Back
        </button>
      </div>
    </div>
  );
}

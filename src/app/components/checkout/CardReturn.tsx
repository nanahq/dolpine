'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loadPendingCard, savePendingCard, type PendingCardOrder } from '@/lib/checkout/session';
import { track } from '@/lib/analytics';
import { useShop } from '../shop/ShopProvider';
import { usePaymentStatus } from './usePaymentStatus';
import { OrderPlaced } from './OrderPlaced';

const SLOW_AFTER_MS = 90_000;

/**
 * Where the card gateway sends the customer back. The query string only says
 * the customer finished the gateway's page — payment is confirmed by our
 * webhook, so this waits for the order to leave `pending` before saying so.
 */
export function CardReturn() {
  const params = useSearchParams();
  const shop = useShop();
  const [pending, setPending] = useState<PendingCardOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    setPending(loadPendingCard());
    setLoaded(true);
    const t = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  // Paystack sends `reference`/`trxref`, Flutterwave `tx_ref` — all set to our order id.
  const orderId = params.get('reference') ?? params.get('trxref') ?? params.get('tx_ref') ?? pending?.orderId ?? null;
  const cancelled = ['cancelled', 'failed'].includes(params.get('status') ?? '');
  const { status, orderNumber } = usePaymentStatus(cancelled ? null : orderId);

  useEffect(() => {
    if (status !== 'paid') return;
    track('web_payment_confirmed', { payment_method: 'card' });
    savePendingCard(null);
    shop.clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === 'paid' && orderId) {
    return <OrderPlaced orderId={orderId} orderNumber={orderNumber ?? pending?.orderNumber ?? null} total={pending?.total ?? null} phone={pending?.phone ?? null} />;
  }

  if (!loaded) return <div style={{ minHeight: 420 }} />;

  const failed = cancelled || status === 'expired' || !orderId;
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(56px,8vw,110px) var(--gutter) 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
      {failed ? (
        <>
          <h1 className="v-display" style={{ fontSize: 'clamp(48px,7vw,88px)' }}>Payment didn’t go through</h1>
          <p className="v-lede">Your card wasn’t charged for this order. Your cart is still saved — try again, or pay by bank transfer.</p>
          <Link href="/checkout" className="v-btn v-btn--ink">Back to checkout</Link>
        </>
      ) : (
        <>
          <span className="v-spinner" style={{ width: 40, height: 40, color: 'var(--blue)' }} />
          <h1 className="v-display" style={{ fontSize: 'clamp(48px,7vw,88px)' }}>Confirming payment</h1>
          <p className="v-lede">
            {slow
              ? 'This is taking longer than usual. If your bank approved the payment it will confirm here shortly — you don’t need to pay again.'
              : 'Your bank has handed back to us. This usually takes a few seconds.'}
          </p>
          {slow && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href={`/track/${orderId}`} className="v-btn v-btn--ink">Check order status</Link>
              <Link href="/contact" className="v-btn v-btn--soft">Contact us</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

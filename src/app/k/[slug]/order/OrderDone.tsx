'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ApiError } from '@/lib/api/client';
import { formatNaira } from '@/lib/format';
import { trackOrder } from '@/lib/checkout/api';
import { loadPendingCard, loadSession, savePendingCard, saveSession, type WebSession } from '@/lib/checkout/session';
import { getKitchen, getOrderDetail, type HomemadeOrderDetail, type KitchenPage } from '@/lib/homemade';
import { track } from '@/lib/analytics';
import { NotifyCard } from '../NotifyCard';
import { saveCart } from '../kitchen-cart';

type Status = 'waiting' | 'paid' | 'lapsed' | 'missing';

const POLL_MS = 5000;

/**
 * Where checkout lands: straight after a wallet or transfer payment, or back from the card gateway.
 * A lapsed hold isn't final — a late payment is still confirmed if plates are left — so it keeps polling.
 */
export function OrderDone({ initial }: { initial: KitchenPage }) {
  const params = useSearchParams();
  const slug = initial.kitchen.slug;
  const cook = initial.kitchen.cook_name ?? initial.kitchen.name;
  const [data, setData] = useState(initial);
  const [session, setSessionState] = useState<WebSession | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('waiting');
  const [detail, setDetail] = useState<HomemadeOrderDetail | null>(null);
  const [ready, setReady] = useState(false);
  const gatewayFailed = ['cancelled', 'failed'].includes(params.get('status') ?? '');

  useEffect(() => {
    // Paystack sends `reference`/`trxref`, Flutterwave `tx_ref` — all set to our order id.
    setOrderId(params.get('id') ?? params.get('reference') ?? params.get('trxref') ?? params.get('tx_ref') ?? loadPendingCard()?.orderId ?? null);
    setSessionState(loadSession());
    setReady(true);
  }, [params]);

  useEffect(() => {
    if (!orderId || gatewayFailed || status === 'paid') return;
    let live = true;
    const check = async () => {
      try {
        const o = await trackOrder(orderId);
        if (!live) return;
        if (o.status === 'cancelled') setStatus('lapsed');
        else if (o.status !== 'pending') setStatus('paid');
      } catch (e) {
        if (live && e instanceof ApiError && e.status === 404) setStatus('missing');
      }
    };
    void check();
    const t = setInterval(check, POLL_MS);
    return () => {
      live = false;
      clearInterval(t);
    };
  }, [orderId, gatewayFailed, status]);

  useEffect(() => {
    if (status !== 'paid' || !orderId) return;
    saveCart(slug, null);
    track('web_payment_confirmed', { payment_method: loadPendingCard() ? 'card' : 'bank_transfer' });
    savePendingCard(null);
    if (!session) return;
    getOrderDetail(session.token, orderId)
      .then(setDetail)
      .catch(() => {});
    getKitchen(slug, session.token)
      .then(setData)
      .catch(() => {});
  }, [status, orderId, slug, session]);

  if (gatewayFailed || status === 'missing' || (ready && !orderId)) {
    return (
      <Shell>
        <h1 className="v-display" style={{ fontSize: 'clamp(48px,7vw,72px)' }}>Payment didn’t go through</h1>
        <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0 }}>You weren’t charged. Your plates are still in your order — try again, or pay by bank transfer.</p>
        <Link href={`/k/${slug}`} className="v-btn v-btn--ink" style={{ alignSelf: 'flex-start' }}>
          Back to {initial.kitchen.name}
        </Link>
      </Shell>
    );
  }

  if (status !== 'paid') {
    return (
      <Shell>
        <span className="v-spinner" style={{ width: 36, height: 36, color: 'var(--blue)' }} />
        <h1 className="v-display" style={{ fontSize: 'clamp(48px,7vw,72px)' }}>Confirming payment</h1>
        <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0, color: 'var(--muted)' }}>
          {status === 'lapsed'
            ? 'Your plate hold ran out before the payment arrived. If you paid, we’ll confirm the order here if the plates are still there — otherwise the money goes back to your Nana wallet.'
            : 'This usually takes a few seconds. Keep this page open.'}
        </p>
        {status === 'lapsed' && (
          <Link href={`/k/${slug}`} className="v-btn v-btn--soft" style={{ alignSelf: 'flex-start' }}>
            Back to {initial.kitchen.name}
          </Link>
        )}
      </Shell>
    );
  }

  const label = detail?.bag_label;
  return (
    <Shell>
      <h1 className="k-title" style={{ fontSize: 'clamp(56px,8vw,72px)', color: 'var(--green)' }}>
        Order placed
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0 }}>{initial.kitchen.name} is cooking for you. We sent the details to WhatsApp.</p>
      {label && (
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <div className="k-bag">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>Your bag</span>
            <span className="k-bag__label">{label}</span>
          </div>
          <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)', maxWidth: 320 }}>
            {cook} writes <b style={{ color: 'var(--text)' }}>{label}</b> on your bag. Your rider matches it at pickup.
          </span>
        </div>
      )}
      {detail && (
        <span style={{ fontSize: 14, color: 'var(--muted)' }}>
          {detail.order_items.reduce((n, i) => n + i.quantity, 0)} plates · <span className="v-num">{formatNaira(detail.total_amount)}</span> paid
        </span>
      )}
      {session && (
        <NotifyCard
          slug={slug}
          cook={cook}
          following={data.following}
          session={session}
          setSession={(s) => {
            saveSession(s);
            setSessionState(s);
          }}
        />
      )}
      <div style={{ borderRadius: 16, boxShadow: 'inset 0 0 0 1px var(--line)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <span style={{ flex: 1, fontSize: 15, minWidth: 180 }}>Track your next order in the Nana app</span>
        <Link href="/download" className="v-btn v-btn--ink v-btn--sm" style={{ height: 40 }}>
          Get the app
        </Link>
      </div>
      {orderId && (
        <Link href={`/track/${orderId}`} style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue-ink)' }}>
          Track this order
        </Link>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="v-fade" style={{ maxWidth: 1120, width: '100%', margin: '0 auto', padding: 'clamp(32px,5vw,48px) var(--gutter) 80px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 560 }}>{children}</div>
    </div>
  );
}

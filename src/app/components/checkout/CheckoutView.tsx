'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import type { ApiAppConstants } from '@/lib/api/types';
import { ApiError } from '@/lib/api/client';
import { quoteDelivery, validateCoupon, type DeliveryQuote } from '@/lib/checkout/api';
import { clock, orderTypeFor, platformOpen, priceOrder } from '@/lib/checkout/pricing';
import { loadSession, saveSession, savePendingCard, type WebSession } from '@/lib/checkout/session';
import { formatNaira } from '@/lib/format';
import { isValidEmail } from '@/lib/phone';
import type { DeliveryAddress } from '@/lib/shop/address';
import { readJson, writeJson } from '@/lib/storage';
import { track } from '@/lib/analytics';
import { useShop } from '../shop/ShopProvider';
import { ContactStep } from './ContactStep';
import { DeliveryStep } from './DeliveryStep';
import { PaymentStep, type PayMethod } from './PaymentStep';
import { OrderSummary } from './OrderSummary';
import { TransferPanel, type TransferDetails } from './TransferPanel';
import { OrderPlaced } from './OrderPlaced';
import { placeOrder } from './placeOrder';

type Stage =
  | { kind: 'form' }
  | { kind: 'transfer'; transfer: TransferDetails }
  | { kind: 'redirecting' }
  | { kind: 'done'; orderId: string; orderNumber: string | null; total: number | null; phone: string | null };

type Coupon = { code: string; discount: number; freeDelivery: boolean };

const TRANSFER_KEY = 'nana_web_pending_transfer_v1';

export function CheckoutView({ constants }: { constants: ApiAppConstants }) {
  const shop = useShop();
  const { cart, subtotal } = shop;
  const merchant = cart.merchant;

  const [stage, setStage] = useState<Stage>({ kind: 'form' });
  const [session, setSessionState] = useState<WebSession | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState<DeliveryAddress | null>(null);
  const [landmark, setLandmark] = useState('');
  const [note, setNote] = useState('');
  const [quote, setQuote] = useState<DeliveryQuote | null>(null);
  const [quoting, setQuoting] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [method, setMethod] = useState<PayMethod>('bank_transfer');
  const [promoCode, setPromoCode] = useState('');
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [promoBusy, setPromoBusy] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [tried, setTried] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSessionState(loadSession());
    // A reload mid-transfer must not lose the account number.
    const pending = readJson<TransferDetails>(TRANSFER_KEY);
    if (pending) setStage({ kind: 'transfer', transfer: pending });
  }, []);

  useEffect(() => {
    if (shop.ready && !address && shop.address) setAddress(shop.address);
  }, [shop.ready, shop.address, address]);

  const setSession = (s: WebSession | null) => {
    setSessionState(s);
    saveSession(s);
    setCoupon(null);
  };

  const pickAddress = (a: DeliveryAddress | null) => {
    setAddress(a);
    if (a) shop.setAddress(a);
  };

  const pickup = merchant?.address ?? null;
  useEffect(() => {
    setQuote(null);
    setQuoteError(null);
    if (!pickup || !address) return;
    let live = true;
    setQuoting(true);
    quoteDelivery(pickup, address)
      .then((q) => live && setQuote(q))
      .catch(() => live && setQuoteError('Couldn’t price delivery to this address. Try another nearby point.'))
      .finally(() => live && setQuoting(false));
    return () => {
      live = false;
    };
  }, [pickup, address]);

  // A code is quoted against a basket; a different basket needs a fresh quote.
  useEffect(() => setCoupon(null), [subtotal, merchant?.id]);

  const onPaid = useCallback(
    (orderNumber: string | null) => {
      if (stage.kind !== 'transfer') return;
      writeJson(TRANSFER_KEY, null);
      track('web_payment_confirmed', { payment_method: 'bank_transfer' });
      shop.clearCart();
      setStage({ kind: 'done', orderId: stage.transfer.orderId, orderNumber, total: stage.transfer.amount, phone: session?.phone ?? null });
    },
    [stage, session, shop],
  );

  if (stage.kind === 'done') return <OrderPlaced {...stage} />;

  if (stage.kind === 'transfer') {
    return (
      <Shell title="Pay by transfer">
        <TransferPanel
          transfer={stage.transfer}
          onPaid={onPaid}
          onStartOver={() => {
            writeJson(TRANSFER_KEY, null);
            setStage({ kind: 'form' });
          }}
        />
      </Shell>
    );
  }

  if (!shop.ready) return <Shell title="Checkout"><div style={{ height: 300 }} /></Shell>;

  if (!merchant || cart.lines.length === 0) {
    return (
      <Shell title="Checkout" back>
        <div style={{ borderRadius: 28, background: 'var(--fill)', padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20, fontWeight: 600 }}>Your cart is empty</span>
          <Link href="/marketplace" className="v-btn v-btn--ink v-btn--md">Browse stores</Link>
        </div>
      </Shell>
    );
  }

  const price = priceOrder({ subtotal, merchant, quotedFee: quote?.fee ?? null, constants, coupon });
  const maxKm = constants.max_delivery_distance_km;
  const tooFar = quote != null && quote.distance > maxKm;

  const blocker = !platformOpen(constants)
    ? `We deliver between ${clock(constants.platform_open_time)} and ${clock(constants.platform_close_time)}. Come back then — your cart will wait.`
    : !merchant.isOpen
      ? `${merchant.name} is closed right now.`
      : !pickup
        ? `${merchant.name} can’t take website orders yet. Order in the Nana app.`
        : subtotal < merchant.minimumOrder
          ? `${merchant.name} has a ${formatNaira(merchant.minimumOrder)} minimum order.`
          : tooFar
            ? 'This address is outside our delivery range for this store.'
            : null;

  const needsName = !!session && !session.fullName;
  const needsEmail = !session?.email;
  const missing = {
    phone: !session,
    name: needsName && name.trim().split(/\s+/).length < 2,
    email: needsEmail && !isValidEmail(email),
    address: !address,
    landmark: !!address?.approximate && landmark.trim().length < 3,
  };
  const errors = tried ? missing : {};

  async function applyPromo() {
    if (!session || !merchant || price.delivery == null) return;
    setPromoBusy(true);
    setPromoError(null);
    try {
      const code = promoCode.trim().toUpperCase();
      const r = await validateCoupon(session.token, {
        code,
        order_amount: subtotal,
        delivery_fee: price.delivery,
        service_fee: price.service,
        merchant_id: merchant.id,
        order_type: orderTypeFor(merchant.merchantType),
      });
      setCoupon({ code, discount: r.discount_amount, freeDelivery: r.is_free_delivery });
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) setSession(null);
      setPromoError(e instanceof ApiError ? e.message : 'Could not check that code.');
    } finally {
      setPromoBusy(false);
    }
  }

  async function onPlace() {
    setTried(true);
    setError(null);
    // The fields flag what's missing once `tried` is set.
    if (!session || !address || Object.values(missing).some(Boolean)) return;
    if (price.total == null) {
      setError(quoteError ?? 'Still working out delivery — try again in a moment.');
      return;
    }
    setPlacing(true);
    try {
      const { placed, session: next } = await placeOrder({
        session,
        profile: { email: needsEmail ? email.trim() : undefined, fullName: needsName ? name.trim() : undefined },
        cart,
        price,
        address,
        landmark: landmark.trim(),
        note,
        method,
        couponCode: coupon?.code ?? null,
      });
      setSession(next);
      const order = placed.order;
      const pay = placed.payment?.data;
      const charged = pay?.amount ? pay.amount / 100 : Number(order.total_amount);
      track('web_order_placed', { payment_method: method, order_type: orderTypeFor(merchant!.merchantType), item_count: shop.count });

      if (pay?.authorization_url) {
        savePendingCard({ orderId: order.id, orderNumber: order.order_number ?? null, total: charged, phone: next.phone });
        setStage({ kind: 'redirecting' });
        window.location.assign(pay.authorization_url);
        return;
      }
      if (pay?.account_number) {
        const transfer: TransferDetails = {
          orderId: order.id,
          bankName: pay.bank?.name ?? '',
          accountNumber: pay.account_number,
          accountName: pay.account_name ?? null,
          amount: charged,
          expiresAt: pay.account_expires_at ?? null,
        };
        writeJson(TRANSFER_KEY, transfer);
        setStage({ kind: 'transfer', transfer });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // Nothing left to pay (a promo covered it).
      shop.clearCart();
      setStage({ kind: 'done', orderId: order.id, orderNumber: order.order_number ?? null, total: charged, phone: next.phone });
    } catch (e) {
      const api = e instanceof ApiError ? e : null;
      if (api?.status === 401) {
        setSession(null);
        setError('Your sign-in expired. Verify your phone again, then place the order.');
      } else {
        setError(api?.message ?? 'Could not place your order. Please try again.');
      }
      track('web_checkout_failed', { status: api?.status ?? 0 });
    } finally {
      setPlacing(false);
    }
  }

  return (
    <Shell title="Checkout" back>
      {stage.kind === 'redirecting' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(255,255,255,.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <span className="v-spinner" style={{ width: 32, height: 32, color: 'var(--blue)' }} />
          <span style={{ fontSize: 17, fontWeight: 600 }}>Taking you to secure card payment…</span>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <ContactStep session={session} onSession={setSession} name={name} setName={setName} email={email} setEmail={setEmail} errors={errors} />
          <DeliveryStep
            address={address}
            setAddress={pickAddress}
            landmark={landmark}
            setLandmark={setLandmark}
            note={note}
            setNote={setNote}
            quote={quote}
            quoting={quoting}
            quoteError={quoteError}
            maxKm={maxKm}
            errors={errors}
          />
          <PaymentStep
            method={method}
            setMethod={setMethod}
            promo={{
              code: promoCode,
              setCode: (v) => {
                setPromoCode(v);
                setPromoError(null);
              },
              apply: applyPromo,
              clear: () => {
                setCoupon(null);
                setPromoCode('');
              },
              applied: coupon?.code ?? null,
              busy: promoBusy,
              error: promoError,
              canApply: !!session && price.delivery != null,
            }}
          />
        </div>
        <OrderSummary cart={cart} price={price} method={method} placing={placing} blocker={blocker} error={error} onPlace={onPlace} />
      </div>
    </Shell>
  );
}

function Shell({ title, back, children }: { title: string; back?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px var(--gutter) 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {back && (
        <Link href="/marketplace" className="v-link-btn" style={{ alignSelf: 'flex-start', fontSize: 15 }}>
          ← Continue shopping
        </Link>
      )}
      <h1 className="v-display" style={{ fontSize: 'clamp(56px,7vw,104px)', color: 'var(--ink)' }}>{title}</h1>
      {children}
    </div>
  );
}

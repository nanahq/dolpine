'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getKitchen, type HomemadeQuote, type KitchenPage } from '@/lib/homemade';
import { loadSession, saveSession, type WebSession } from '@/lib/checkout/session';
import type { DeliveryAddress } from '@/lib/shop/address';
import { KitchenMenu } from './KitchenMenu';
import { PhoneStep } from './PhoneStep';
import { AddressStep } from './AddressStep';
import { PayStep } from './PayStep';
import { OrderAside } from './OrderAside';
import { loadCart, priceCart, saveCart, type KitchenCart } from './kitchen-cart';
import './kitchen.css';

export type Step = 'kitchen' | 'phone' | 'address' | 'pay';

export interface Delivery {
  address: DeliveryAddress | null;
  landmark: string;
  note: string;
  firstName: string;
  quote: HomemadeQuote | null;
}

const EMPTY_DELIVERY: Delivery = { address: null, landmark: '', note: '', firstName: '', quote: null };

export function KitchenApp({ initial }: { initial: KitchenPage }) {
  const slug = initial.kitchen.slug;
  const [data, setData] = useState(initial);
  const [session, setSessionState] = useState<WebSession | null>(null);
  const [cart, setCartState] = useState<KitchenCart | null>(null);
  const [step, setStep] = useState<Step>('kitchen');
  const [delivery, setDelivery] = useState<Delivery>(EMPTY_DELIVERY);

  const setSession = useCallback((s: WebSession | null) => {
    saveSession(s);
    setSessionState(s);
  }, []);

  const setCart = useCallback(
    (c: KitchenCart | null) => {
      const next = c && c.lines.length ? c : null;
      saveCart(slug, next);
      setCartState(next);
      setDelivery((d) => ({ ...d, quote: null }));
    },
    [slug],
  );

  const refresh = useCallback(
    (token: string | null) =>
      getKitchen(slug, token)
        .then(setData)
        .catch(() => {}),
    [slug],
  );

  useEffect(() => {
    const s = loadSession();
    setSessionState(s);
    void refresh(s?.token ?? null);
  }, [refresh]);

  // A saved cart is only kept while its cook day is still on sale.
  useEffect(() => {
    const saved = loadCart(slug);
    const day = saved && data.cook_days.find((d) => d.id === saved.dayId);
    if (saved && (!day || day.status !== 'open')) saveCart(slug, null);
    else if (saved) setCartState(saved);
  }, [slug, data.cook_days]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const cartDay = data.cook_days.find((d) => d.id === cart?.dayId);
  const priced = useMemo(() => priceCart(cart, cartDay), [cart, cartDay]);

  const startCheckout = () => {
    if (!priced.plates) return;
    setStep(session ? 'address' : 'phone');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <KitchenHeader step={step} />
      {step === 'kitchen' || !cartDay ? (
        <KitchenMenu data={data} cart={cart} setCart={setCart} priced={priced} onContinue={startCheckout} session={session} setSession={setSession} onFollowChange={() => refresh(session?.token ?? null)} />
      ) : (
        <div className="v-fade k-checkout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            {step === 'phone' && (
              <PhoneStep
                onVerified={(s) => {
                  setSession(s);
                  setStep('address');
                }}
                onBack={() => setStep('kitchen')}
              />
            )}
            {step === 'address' && session && (
              <AddressStep
                data={data}
                day={cartDay}
                cart={cart!}
                session={session}
                delivery={delivery}
                setDelivery={setDelivery}
                onNotYou={() => {
                  setSession(null);
                  setStep('phone');
                }}
                onNext={() => setStep('pay')}
                onEditPlates={() => setStep('kitchen')}
              />
            )}
            {step === 'pay' && session && delivery.quote && delivery.address && (
              <PayStep
                slug={slug}
                day={cartDay}
                cart={cart!}
                session={session}
                delivery={delivery}
                holdMinutes={data.fees.plate_hold_minutes}
                onBack={() => setStep('address')}
                onQuoteChanged={(quote) => setDelivery((d) => ({ ...d, quote }))}
              />
            )}
          </div>
          <OrderAside data={data} day={cartDay} priced={priced} delivery={delivery} showAddress={step === 'pay'} />
        </div>
      )}
    </div>
  );
}

const STEPS: { id: Step; label: string }[] = [
  { id: 'phone', label: 'Phone' },
  { id: 'address', label: 'Address' },
  { id: 'pay', label: 'Payment' },
];

export function KitchenHeader({ step }: { step: Step | 'done' }) {
  const idx = step === 'done' ? STEPS.length : STEPS.findIndex((s) => s.id === step);
  return (
    <header className="k-header">
      <Link href="/" aria-label="Nana home">
        <Image src="/nana.png" alt="Nana" width={106} height={26} priority style={{ width: 'auto', height: 26, display: 'block' }} />
      </Link>
      {step !== 'kitchen' && (
        <ol className="k-steps" aria-label="Checkout steps">
          {STEPS.map((s, i) => {
            const done = i < idx;
            const on = i === idx;
            return (
              <li key={s.id} aria-current={on ? 'step' : undefined}>
                <span className="k-steps__mark" style={{ background: done ? 'var(--green)' : on ? 'var(--blue)' : 'var(--line)', color: done || on ? '#fff' : 'var(--muted)' }}>
                  {done ? '✓' : i + 1}
                </span>
                <span className="k-steps__label" style={{ fontWeight: on ? 700 : 500, color: on || done ? 'var(--text)' : 'var(--subtle)' }}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && <span className="k-steps__line" />}
              </li>
            );
          })}
        </ol>
      )}
      <Link href="/download" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue-ink)' }}>
        Get the app
      </Link>
    </header>
  );
}

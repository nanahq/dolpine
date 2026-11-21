'use client';

import React, { useEffect, useState } from 'react';
import { ApiError } from '@/lib/api/client';
import { quoteHomemade, type CookDay, type KitchenPage } from '@/lib/homemade';
import type { WebSession } from '@/lib/checkout/session';
import { formatNgPhone } from '@/lib/phone';
import { AddressSearch } from '../../components/shop/AddressSearch';
import { NanaIcon } from '../../components/site/NanaIcon';
import type { Delivery } from './KitchenApp';
import { quoteBody, type KitchenCart } from './kitchen-cart';

type Props = {
  data: KitchenPage;
  day: CookDay;
  cart: KitchenCart;
  session: WebSession;
  delivery: Delivery;
  setDelivery: React.Dispatch<React.SetStateAction<Delivery>>;
  onNotYou: () => void;
  onNext: () => void;
  onEditPlates: () => void;
};

type Check = { state: 'idle' | 'checking' } | { state: 'far'; km: number } | { state: 'error'; message: string };

export function AddressStep({ data, day, cart, session, delivery, setDelivery, onNotYou, onNext, onEditPlates }: Props) {
  const [check, setCheck] = useState<Check>({ state: 'idle' });
  const [nameError, setNameError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { address, quote } = delivery;
  const cook = data.kitchen.cook_name ?? data.kitchen.name;
  const needsName = !session.fullName;
  const set = (patch: Partial<Delivery>) => setDelivery((d) => ({ ...d, ...patch }));

  // The quote is the range check: the server prices by road distance and refuses past the limit.
  useEffect(() => {
    if (!address || quote) return;
    let live = true;
    setCheck({ state: 'checking' });
    quoteHomemade(session.token, day.id, quoteBody(cart, address, ''))
      .then((q) => {
        if (!live) return;
        setCheck({ state: 'idle' });
        setDelivery((d) => ({ ...d, quote: q }));
      })
      .catch((e) => {
        if (!live) return;
        const p = e instanceof ApiError ? (e.payload as { code?: string; distance_km?: number } | null) : null;
        if (p?.code === 'OUT_OF_RANGE') setCheck({ state: 'far', km: p.distance_km ?? 0 });
        else setCheck({ state: 'error', message: e instanceof ApiError ? e.message : 'Could not check this address. Try again.' });
      });
    return () => {
      live = false;
    };
  }, [address, quote, session.token, day.id, cart, setDelivery, attempt]);

  const next = () => {
    if (needsName && !delivery.firstName.trim()) return setNameError(true);
    onNext();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.03em' }}>Where should we deliver?</span>
        <span style={{ fontSize: 14, color: 'var(--muted)' }}>
          Signed in as <span className="v-num">{formatNgPhone(session.phone)}</span> ·{' '}
          <button type="button" className="v-link-btn" style={{ fontSize: 14 }} onClick={onNotYou}>
            Not you?
          </button>
        </span>
      </div>

      <div className="v-field">
        <span className="v-label">Address</span>
        {address ? (
          <div style={{ minHeight: 56, borderRadius: 14, boxShadow: 'inset 0 0 0 1.5px var(--line-strong)', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 8px 8px 16px' }}>
            <NanaIcon name="MapPinSize20" size={18} style={{ color: 'var(--blue)' }} />
            <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>{address.label}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{address.line}</span>
            </span>
            <button type="button" className="v-btn v-btn--soft v-btn--sm" onClick={() => set({ address: null, quote: null })}>
              Change
            </button>
          </div>
        ) : (
          <AddressSearch autoFocus onPick={(a) => set({ address: a, quote: null })} />
        )}
      </div>

      {address && <RangeCard check={check} km={quote?.distance_km ?? null} max={data.fees.max_distance_km} cook={cook} />}
      {check.state === 'error' && (
        <button type="button" className="v-btn v-btn--soft" style={{ alignSelf: 'flex-start' }} onClick={() => setAttempt((n) => n + 1)}>
          Try again
        </button>
      )}

      <div className="k-two">
        <div className="v-field">
          <label className="v-label" htmlFor="k-fname">
            Your first name {!needsName && <span style={{ fontWeight: 400, color: 'var(--subtle)' }}>· optional</span>}
          </label>
          <input
            id="k-fname"
            className={`v-input${nameError ? ' is-error' : ''}`}
            autoComplete="given-name"
            value={delivery.firstName}
            onChange={(e) => {
              set({ firstName: e.target.value });
              setNameError(false);
            }}
            placeholder={session.fullName?.split(' ')[0] ?? 'So the rider knows who to ask for'}
          />
          {nameError && <span className="v-err">Add your first name so the rider knows who to ask for.</span>}
        </div>
        <div className="v-field">
          <label className="v-label" htmlFor="k-landmark">
            Address details <span style={{ fontWeight: 400, color: 'var(--subtle)' }}>· optional</span>
          </label>
          <input id="k-landmark" className="v-input" value={delivery.landmark} onChange={(e) => set({ landmark: e.target.value })} placeholder="House no., landmark, gate colour" maxLength={200} />
        </div>
      </div>

      <div className="v-field">
        <label className="v-label" htmlFor="k-note">
          Note for the cook <span style={{ fontWeight: 400, color: 'var(--subtle)' }}>· optional</span>
        </label>
        <input id="k-note" className="v-input" value={delivery.note} onChange={(e) => set({ note: e.target.value })} placeholder="Less pepper please" maxLength={140} />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" className="v-btn v-btn--blue" onClick={next} disabled={!quote}>
          {check.state === 'far' ? 'Choose a closer address' : 'Continue to payment'}
        </button>
        <button type="button" className="v-btn v-btn--soft" onClick={onEditPlates}>
          Edit plates
        </button>
      </div>
    </div>
  );
}

function RangeCard({ check, km, max, cook }: { check: Check; km: number | null; max: number; cook: string }) {
  if (check.state === 'checking') {
    return (
      <div style={{ borderRadius: 18, background: 'var(--fill)', padding: 16, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
        <span className="v-spinner" style={{ color: 'var(--blue)' }} /> Checking the distance from {cook}’s kitchen…
      </div>
    );
  }
  if (check.state === 'far') {
    return (
      <div style={{ borderRadius: 18, background: '#FDE8E4', padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--danger)' }}>Too far</span>
        <span style={{ fontSize: 14, color: 'var(--danger)', lineHeight: 1.45 }}>
          This kitchen delivers within {max} km. Your address is {Math.round(check.km)} km away.
        </span>
      </div>
    );
  }
  if (check.state === 'error') return <span className="v-err">{check.message}</span>;
  if (km == null) return null;
  return (
    <div style={{ borderRadius: 18, background: '#E7F5EC', padding: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>✓ In range</span>
        <span className="v-num" style={{ fontSize: 22, fontWeight: 600 }}>
          {km} km
        </span>
      </span>
      <span style={{ fontSize: 13, color: '#1F4D2E', lineHeight: 1.4 }}>
        {cook} delivers within {max} km.
      </span>
    </div>
  );
}

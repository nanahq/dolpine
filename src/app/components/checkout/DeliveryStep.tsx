'use client';

import React from 'react';
import type { DeliveryAddress } from '@/lib/shop/address';
import type { DeliveryQuote } from '@/lib/checkout/api';
import { AddressSearch } from '../shop/AddressSearch';
import { NanaIcon } from '../site/NanaIcon';

type Props = {
  address: DeliveryAddress | null;
  setAddress: (a: DeliveryAddress | null) => void;
  landmark: string;
  setLandmark: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
  quote: DeliveryQuote | null;
  quoting: boolean;
  quoteError: string | null;
  maxKm: number;
  errors: { address?: boolean; landmark?: boolean };
};

export function DeliveryStep({ address, setAddress, landmark, setLandmark, note, setNote, quote, quoting, quoteError, maxKm, errors }: Props) {
  const tooFar = quote != null && quote.distance > maxKm;
  return (
    <div className="v-panel">
      <span style={{ fontSize: 20, fontWeight: 600 }}>2 · Delivery</span>

      <div className="v-field">
        <span className="v-label">Address</span>
        {address ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', borderRadius: 16, boxShadow: 'inset 0 0 0 1px var(--line-strong)', padding: '14px 16px' }}>
            <NanaIcon name="MapPinSize20" size={20} style={{ color: 'var(--blue-ink)', marginTop: 2 }} />
            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>{address.label}</span>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.4 }}>{address.line}</span>
              <span className="v-num" style={{ fontSize: 13, fontWeight: 600, color: tooFar ? 'var(--danger)' : 'var(--blue-ink)', display: 'flex', gap: 8, alignItems: 'center' }}>
                {quoting && <span className="v-spinner" style={{ width: 13, height: 13 }} />}
                {quoting
                  ? 'Working out the route…'
                  : tooFar
                    ? `${quote!.distance.toFixed(1)} km from the store — we deliver up to ${maxKm} km`
                    : quote
                      ? `${quote.distance.toFixed(1)} km away${quote.eta ? ` · about ${Math.round(quote.eta)} min` : ''}`
                      : quoteError}
              </span>
            </span>
            <button type="button" className="v-link-btn" style={{ fontSize: 14 }} onClick={() => setAddress(null)}>
              Change
            </button>
          </div>
        ) : (
          <>
            <AddressSearch onPick={setAddress} invalid={errors.address} />
            {errors.address && <span className="v-err">Pick your address from the list so the rider can find you.</span>}
          </>
        )}
      </div>

      <div className="v-field">
        <label className="v-label" htmlFor="co-landmark">
          House number, gate or landmark {!address?.approximate && <small>· optional</small>}
        </label>
        <input
          id="co-landmark"
          className={`v-input${errors.landmark ? ' is-error' : ''}`}
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="e.g. No. 14, blue gate opposite the mosque"
          maxLength={160}
        />
        {errors.landmark && <span className="v-err">This address only pins the street — add a house number or landmark.</span>}
      </div>

      <div className="v-field">
        <label className="v-label" htmlFor="co-note">
          Note for the rider <small>· optional</small>
        </label>
        <textarea id="co-note" className="v-input" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Call on arrival" maxLength={300} />
      </div>
    </div>
  );
}

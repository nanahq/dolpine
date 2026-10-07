'use client';

import React, { useState } from 'react';
import { CLIENT_API_BASE } from '@/lib/api/client';
import { isValidNgPhone } from '@/lib/phone';
import { track } from '@/lib/analytics';
import { SentState } from './PageParts';

type Fields = { business: string; name: string; phone: string; instagram: string };

/**
 * Posts to `POST /vendor-interest`, which takes exactly name, business_name,
 * phone and instagram (all required) and rejects a repeat phone with 409.
 * The design's extra fields (type, city, email, address, notes) have nowhere
 * to go in that table, so they're left out rather than silently dropped.
 */
export function VendorForm() {
  const [f, setF] = useState<Fields>({ business: '', name: '', phone: '', instagram: '' });
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const bad = {
    business: !f.business.trim(),
    name: !f.name.trim(),
    phone: !isValidNgPhone(f.phone),
    instagram: !f.instagram.trim(),
  };
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit() {
    setTried(true);
    setError(null);
    if (Object.values(bad).some(Boolean)) return;
    setBusy(true);
    try {
      const res = await fetch(`${CLIENT_API_BASE}/vendor-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name.trim(), business_name: f.business.trim(), phone: f.phone.trim(), instagram: f.instagram.trim() }),
      });
      if (res.ok) {
        track('vendor_application_submitted', { has_instagram: true });
        setSent(true);
      } else if (res.status === 409) {
        track('vendor_application_failed', { reason: 'duplicate' });
        setError('That phone number is already registered — we have your application. A partner manager will be in touch.');
      } else {
        track('vendor_application_failed', { reason: 'server' });
        setError('Something went wrong. Please try again, or WhatsApp us on 0812 222 9693.');
      }
    } catch {
      track('vendor_application_failed', { reason: 'network' });
      setError('Network error. Please check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  if (sent) return <SentState title={`Thanks, ${f.business.trim()}`} copy={`A partner manager will call ${f.phone.trim()} within two working days.`} />;

  const err = (k: keyof Fields) => tried && bad[k];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.015em' }}>Register your interest</span>
      <div className="v-field">
        <label className="v-label" htmlFor="vf-business">Business name</label>
        <input id="vf-business" className={`v-input${err('business') ? ' is-error' : ''}`} value={f.business} onChange={set('business')} placeholder="e.g. Mama Nkechi’s Kitchen" />
        {err('business') && <span className="v-err">Required</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
        <div className="v-field">
          <label className="v-label" htmlFor="vf-name">Your name</label>
          <input id="vf-name" className={`v-input${err('name') ? ' is-error' : ''}`} value={f.name} onChange={set('name')} autoComplete="name" />
          {err('name') && <span className="v-err">Required</span>}
        </div>
        <div className="v-field">
          <label className="v-label" htmlFor="vf-phone">Phone</label>
          <input id="vf-phone" type="tel" className={`v-input${err('phone') ? ' is-error' : ''}`} value={f.phone} onChange={set('phone')} placeholder="0803 412 5590" autoComplete="tel" />
          {err('phone') && <span className="v-err">Enter a valid number</span>}
        </div>
      </div>
      <div className="v-field">
        <label className="v-label" htmlFor="vf-ig">Instagram handle</label>
        <input id="vf-ig" className={`v-input${err('instagram') ? ' is-error' : ''}`} value={f.instagram} onChange={set('instagram')} placeholder="@yourstore — or your WhatsApp number" />
        {err('instagram') && <span className="v-err">Required — it’s how we look at your menu before we call.</span>}
      </div>
      <button type="button" className="v-btn v-btn--blue v-btn--lg v-btn--block" onClick={submit} disabled={busy}>
        {busy ? <span className="v-spinner" /> : 'Send interest'}
      </button>
      {error && <span className="v-err" style={{ fontSize: 14 }}>{error}</span>}
    </div>
  );
}

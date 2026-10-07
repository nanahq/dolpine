'use client';

import React, { useState } from 'react';
import { isValidEmail, isValidNgPhone } from '@/lib/phone';
import { track } from '@/lib/analytics';
import { Chips, SentState } from './PageParts';

const WHATSAPP = '2348122229693';
const VEHICLES = ['Motorbike', 'Bicycle', 'Car'];

/**
 * There is no rider-application endpoint, so the application goes to the
 * rider team's WhatsApp, pre-written — it reaches a person instead of being
 * thrown away behind a fake "submitted" screen.
 */
export function RiderForm() {
  const [f, setF] = useState({ name: '', phone: '', city: '', email: '' });
  const [vehicle, setVehicle] = useState('Motorbike');
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const bad = {
    name: !f.name.trim(),
    phone: !isValidNgPhone(f.phone),
    city: !f.city.trim(),
    email: !!f.email.trim() && !isValidEmail(f.email),
  };
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((p) => ({ ...p, [k]: e.target.value }));
  const err = (k: keyof typeof bad) => tried && bad[k];

  function submit() {
    setTried(true);
    if (Object.values(bad).some(Boolean)) return;
    const text = [
      'Hi Nana, I’d like to ride with you.',
      `Name: ${f.name.trim()}`,
      `Phone: ${f.phone.trim()}`,
      `City: ${f.city.trim()}`,
      `Vehicle: ${vehicle}`,
      f.email.trim() ? `Email: ${f.email.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    track('rider_application_submitted', { vehicle, area: f.city.trim().toLowerCase() });
    setSent(true);
  }

  if (sent) {
    return <SentState title="Almost there" copy="We’ve opened WhatsApp with your details filled in — press send and the rider team will reply with your onboarding session." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.015em' }}>Apply to ride</span>
      <div className="v-field">
        <label className="v-label" htmlFor="rf-name">Full name</label>
        <input id="rf-name" className={`v-input${err('name') ? ' is-error' : ''}`} value={f.name} onChange={set('name')} autoComplete="name" />
        {err('name') && <span className="v-err">Required</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
        <div className="v-field">
          <label className="v-label" htmlFor="rf-phone">Phone</label>
          <input id="rf-phone" type="tel" className={`v-input${err('phone') ? ' is-error' : ''}`} value={f.phone} onChange={set('phone')} placeholder="0803 412 5590" autoComplete="tel" />
          {err('phone') && <span className="v-err">Enter a valid number</span>}
        </div>
        <div className="v-field">
          <label className="v-label" htmlFor="rf-city">City</label>
          <input id="rf-city" className={`v-input${err('city') ? ' is-error' : ''}`} value={f.city} onChange={set('city')} placeholder="e.g. Kano" />
          {err('city') && <span className="v-err">Required</span>}
        </div>
      </div>
      <div className="v-field">
        <label className="v-label" htmlFor="rf-email">Email <small>· optional</small></label>
        <input id="rf-email" type="email" className={`v-input${err('email') ? ' is-error' : ''}`} value={f.email} onChange={set('email')} autoComplete="email" />
        {err('email') && <span className="v-err">Enter a valid email</span>}
      </div>
      <div className="v-field">
        <span className="v-label">Vehicle</span>
        <Chips options={VEHICLES} value={vehicle} onChange={setVehicle} />
      </div>
      <button type="button" className="v-btn v-btn--ink v-btn--lg v-btn--block" onClick={submit}>
        Apply on WhatsApp
      </button>
      <span style={{ fontSize: 13, color: 'var(--subtle)', textAlign: 'center' }}>Opens WhatsApp with your answers — nothing is sent until you press send.</span>
    </div>
  );
}

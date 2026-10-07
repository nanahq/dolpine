'use client';

import React, { useState } from 'react';
import { INVESTORS_EMAIL } from '@/lib/site';
import { isValidEmail } from '@/lib/phone';
import { Chips, SentState } from './PageParts';

const CHEQUES = ['Under $100K', '$100K–500K', '$500K–2M', '$2M+'];

/** "Request the deck" — there's no backend for it, so it composes an email to the investors inbox. */
export function InvestorForm() {
  const [f, setF] = useState({ name: '', firm: '', email: '', msg: '' });
  const [cheque, setCheque] = useState(CHEQUES[1]);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const bad = { name: !f.name.trim(), email: !isValidEmail(f.email) };
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  function submit() {
    setTried(true);
    if (bad.name || bad.email) return;
    const body = [`Name: ${f.name.trim()}`, f.firm.trim() ? `Firm: ${f.firm.trim()}` : null, `Email: ${f.email.trim()}`, `Typical cheque: ${cheque}`, '', f.msg.trim()]
      .filter((l) => l !== null)
      .join('\n');
    window.location.href = `mailto:${INVESTORS_EMAIL}?subject=${encodeURIComponent('Deck request')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return <SentState title={`Thanks, ${f.name.trim().split(' ')[0]}`} copy={`Your email app should have opened with the request — send it and we’ll reply to ${f.email.trim()} within two working days.`} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.015em' }}>Request the deck</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
        <div className="v-field">
          <label className="v-label" htmlFor="if-name">Your name</label>
          <input id="if-name" className={`v-input${tried && bad.name ? ' is-error' : ''}`} value={f.name} onChange={set('name')} autoComplete="name" />
          {tried && bad.name && <span className="v-err">Required</span>}
        </div>
        <div className="v-field">
          <label className="v-label" htmlFor="if-firm">Firm</label>
          <input id="if-firm" className="v-input" value={f.firm} onChange={set('firm')} placeholder="Fund or angel" />
        </div>
      </div>
      <div className="v-field">
        <label className="v-label" htmlFor="if-email">Work email</label>
        <input id="if-email" type="email" className={`v-input${tried && bad.email ? ' is-error' : ''}`} value={f.email} onChange={set('email')} autoComplete="email" />
        {tried && bad.email && <span className="v-err">Enter a valid email</span>}
      </div>
      <div className="v-field">
        <span className="v-label">Typical cheque size</span>
        <Chips options={CHEQUES} value={cheque} onChange={setCheque} />
      </div>
      <div className="v-field">
        <label className="v-label" htmlFor="if-msg">Message <small>· optional</small></label>
        <textarea id="if-msg" className="v-input" rows={3} value={f.msg} onChange={set('msg')} />
      </div>
      <button type="button" className="v-btn v-btn--ink v-btn--lg v-btn--block" onClick={submit}>
        Send request
      </button>
    </div>
  );
}

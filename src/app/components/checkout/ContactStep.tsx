'use client';

import React, { useEffect, useState } from 'react';
import { ApiError } from '@/lib/api/client';
import { requestOtp, verifyOtp } from '@/lib/checkout/api';
import type { WebSession } from '@/lib/checkout/session';
import { formatNgPhone, toE164 } from '@/lib/phone';

type Props = {
  session: WebSession | null;
  onSession: (s: WebSession | null) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  errors: { phone?: boolean; name?: boolean; email?: boolean };
};

const RESEND_S = 60;
const isPlaceholderEmail = (e: string | null) => !e || e.endsWith('@trynanaapp.com');

/**
 * Step 1. The phone number is verified by SMS code before anything else: it
 * signs the customer into (or creates) their Nana account, which is what the
 * order, the saved address and the payment hang off.
 */
export function ContactStep({ session, onSession, name, setName, email, setEmail, errors }: Props) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  async function send() {
    const e164 = toE164(phone);
    if (!e164) return setMsg('Enter a valid Nigerian mobile number.');
    setBusy(true);
    setMsg(null);
    try {
      await requestOtp(e164);
      setSentTo(e164);
      setCode('');
      setWait(RESEND_S);
    } catch (e) {
      setMsg(e instanceof ApiError ? e.message : 'Could not send the code. Try again.');
    } finally {
      setBusy(false);
    }
  }

  async function verify(otp: string) {
    if (!sentTo || otp.length !== 6) return;
    setBusy(true);
    setMsg(null);
    try {
      const { user, token } = await verifyOtp(sentTo, otp);
      const realEmail = isPlaceholderEmail(user.email) ? null : user.email;
      onSession({ token, userId: user.id, phone: sentTo, email: realEmail, fullName: user.full_name?.trim() || user.first_name?.trim() || null });
      setSentTo(null);
    } catch (e) {
      setMsg(e instanceof ApiError ? e.message : 'Could not check the code. Try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="v-panel">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 20, fontWeight: 600 }}>1 · Contact</span>
        <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.45 }}>
          We text a code to confirm it’s you. It signs you in to the same account as the Nana app.
        </span>
      </div>

      {session ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 16, background: 'var(--blue-tint)', padding: '14px 16px' }}>
          <span style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--green)', color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</span>
          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <span className="v-num" style={{ fontSize: 16, fontWeight: 600 }}>{formatNgPhone(session.phone)}</span>
            <span style={{ fontSize: 13, color: 'var(--blue-ink)' }}>Verified{session.fullName ? ` · ${session.fullName}` : ''}</span>
          </span>
          <button type="button" className="v-link-btn" style={{ fontSize: 14 }} onClick={() => onSession(null)}>
            Not you?
          </button>
        </div>
      ) : (
        <div className="v-field">
          <label className="v-label" htmlFor="co-phone">Phone number</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div className={`v-phone${errors.phone && !sentTo ? ' is-error' : ''}`} style={{ flex: '1 1 220px' }}>
              <span>+234</span>
              <input
                id="co-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setSentTo(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), void send())}
                placeholder="803 412 5590"
                disabled={busy}
              />
            </div>
            <button type="button" className="v-btn v-btn--ink" onClick={send} disabled={busy || wait > 0}>
              {busy && !sentTo ? <span className="v-spinner" /> : sentTo ? (wait > 0 ? `Resend in ${wait}s` : 'Resend code') : 'Send code'}
            </button>
          </div>
          {errors.phone && !sentTo && !msg && <span className="v-err">Verify your phone number to place the order.</span>}
        </div>
      )}

      {!session && sentTo && (
        <div className="v-field v-rise" style={{ animationDuration: '.4s' }}>
          <label className="v-label" htmlFor="co-otp">
            Code sent to {formatNgPhone(sentTo)}
          </label>
          <input
            id="co-otp"
            className="v-input v-num"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            autoFocus
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 6);
              setCode(v);
              if (v.length === 6) void verify(v);
            }}
            placeholder="6-digit code"
            style={{ fontSize: 22, letterSpacing: '.3em', fontWeight: 600 }}
            disabled={busy}
          />
          {busy && <span style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 8, alignItems: 'center' }}><span className="v-spinner" style={{ width: 14, height: 14 }} /> Checking…</span>}
        </div>
      )}
      {msg && <span className="v-err">{msg}</span>}

      {session && !session.fullName && (
        <div className="v-field">
          <label className="v-label" htmlFor="co-name">Your name</label>
          <input id="co-name" className={`v-input${errors.name ? ' is-error' : ''}`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" />
          {errors.name && <span className="v-err">Add your first and last name so the rider knows who to ask for.</span>}
        </div>
      )}

      {session?.email ? (
        <span style={{ fontSize: 14, color: 'var(--muted)' }}>
          Payment receipts go to <strong style={{ color: 'var(--text)' }}>{session.email}</strong>.
        </span>
      ) : (
        <div className="v-field">
          <label className="v-label" htmlFor="co-email">Email address</label>
          <input id="co-email" type="email" autoComplete="email" className={`v-input${errors.email ? ' is-error' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          {errors.email ? (
            <span className="v-err">Enter a valid email address — the payment provider sends your receipt there.</span>
          ) : (
            <span style={{ fontSize: 13, color: 'var(--subtle)' }}>For your payment receipt.</span>
          )}
        </div>
      )}
    </div>
  );
}

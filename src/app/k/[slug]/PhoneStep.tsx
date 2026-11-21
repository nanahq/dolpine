'use client';

import React, { useEffect, useState } from 'react';
import { ApiError } from '@/lib/api/client';
import { requestOtp, verifyOtp } from '@/lib/checkout/api';
import type { WebSession } from '@/lib/checkout/session';
import { formatNgPhone, toE164 } from '@/lib/phone';

type Props = { onVerified: (s: WebSession) => void; onBack?: () => void; compact?: boolean };

const RESEND_S = 60;
const isPlaceholderEmail = (e: string | null) => !e || e.endsWith('@trynanaapp.com');

/** Phone OTP. Signs in to, or creates, the same Nana account the app uses. */
export function PhoneStep({ onVerified, onBack, compact }: Props) {
  const [phone, setPhone] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const e164 = toE164(phone);

  async function send() {
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

  async function verify(otp = code) {
    if (!sentTo || otp.length !== 6) return;
    setBusy(true);
    setMsg(null);
    try {
      const { user, token } = await verifyOtp(sentTo, otp);
      onVerified({
        token,
        userId: user.id,
        phone: sentTo,
        email: isPlaceholderEmail(user.email) ? null : user.email,
        fullName: user.full_name?.trim() || user.first_name?.trim() || null,
      });
    } catch (e) {
      setMsg(e instanceof ApiError ? e.message : 'Could not check the code. Try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 520 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: compact ? 24 : 30, fontWeight: 600, letterSpacing: '-.03em' }}>Your phone number</span>
        <span style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.5 }}>We’ll text a code. No password — this creates your Nana account.</span>
      </div>
      <div className="v-field">
        <label className="v-label" htmlFor="k-phone">
          Phone number
        </label>
        <div className="v-phone">
          <span>+234</span>
          <input
            id="k-phone"
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
            autoFocus
          />
        </div>
      </div>
      {!sentTo ? (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" className="v-btn v-btn--blue" onClick={send} disabled={busy || !e164}>
            {busy ? <span className="v-spinner" /> : 'Send code'}
          </button>
          {onBack && (
            <button type="button" className="v-btn v-btn--soft" onClick={onBack}>
              Edit plates
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="v-field v-fade">
            <label className="v-label" htmlFor="k-otp">
              6-digit code
            </label>
            <input
              id="k-otp"
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
              placeholder="••••••"
              style={{ width: 240, fontSize: 24, letterSpacing: '.4em', fontWeight: 600 }}
              disabled={busy}
            />
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              Sent to {formatNgPhone(sentTo)} ·{' '}
              {wait > 0 ? (
                <span className="v-num" style={{ color: 'var(--blue-ink)', fontWeight: 600 }}>
                  Resend in {Math.floor(wait / 60)}:{String(wait % 60).padStart(2, '0')}
                </span>
              ) : (
                <button type="button" className="v-link-btn" style={{ fontSize: 13 }} onClick={send} disabled={busy}>
                  Resend code
                </button>
              )}
            </span>
          </div>
          <button type="button" className="v-btn v-btn--blue" style={{ alignSelf: 'flex-start' }} onClick={() => void verify()} disabled={busy || code.length !== 6}>
            {busy ? <span className="v-spinner" /> : 'Verify and continue'}
          </button>
        </>
      )}
      {msg && <span className="v-err">{msg}</span>}
    </div>
  );
}

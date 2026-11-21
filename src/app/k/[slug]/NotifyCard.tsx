'use client';

import React, { useEffect, useState } from 'react';
import { setFollowing } from '@/lib/homemade';
import type { WebSession } from '@/lib/checkout/session';
import { Modal } from '../../components/shop/Modal';
import { PhoneStep } from './PhoneStep';

type Props = {
  slug: string;
  cook: string;
  following: boolean;
  session: WebSession | null;
  setSession: (s: WebSession | null) => void;
  onChange?: () => void;
};

/** "Notify me when X cooks next": a follow, which the API turns into one WhatsApp message per cook day. */
export function NotifyCard({ slug, cook, following, session, setSession, onChange }: Props) {
  const [on, setOn] = useState(following);
  const [busy, setBusy] = useState(false);
  const [askPhone, setAskPhone] = useState(false);

  useEffect(() => setOn(following), [following]);

  async function apply(token: string, next: boolean) {
    setBusy(true);
    setOn(next);
    try {
      await setFollowing(token, slug, next);
      onChange?.();
    } catch {
      setOn(!next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={busy}
        onClick={() => (session ? void apply(session.token, !on) : setAskPhone(true))}
        style={{ border: 0, cursor: 'pointer', textAlign: 'left', borderRadius: 16, background: 'var(--fill)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, width: '100%' }}
      >
        <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Notify me when {cook} cooks next</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>One WhatsApp message per cook day</span>
        </span>
        <span style={{ width: 46, height: 28, borderRadius: 999, background: on ? 'var(--green)' : 'var(--line-strong)', position: 'relative', flexShrink: 0, transition: 'background .2s' }}>
          <span style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', transition: 'left .2s' }} />
        </span>
      </button>
      {askPhone && (
        <Modal onClose={() => setAskPhone(false)} label="Your phone number" width={520}>
          <div style={{ padding: 24, overflowY: 'auto' }}>
            <PhoneStep
              compact
              onVerified={(s) => {
                setSession(s);
                setAskPhone(false);
                void apply(s.token, true);
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { unlock, UnlockState } from './actions';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="v-btn v-btn--ink v-btn--lg v-btn--block" disabled={pending}>
      {pending ? 'Checking…' : 'View metrics'}
    </button>
  );
}

export function PasswordGate() {
  const [state, action] = useFormState<UnlockState, FormData>(unlock, { error: null });

  return (
    <section className="v-wrap" style={{ paddingTop: 'clamp(64px,10vw,140px)', paddingBottom: 'clamp(64px,10vw,140px)' }}>
      <form action={action} className="v-form-card" style={{ maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span className="v-eyebrow" style={{ color: 'var(--blue-ink)' }}>Investors</span>
        <h1 className="v-h3" style={{ fontSize: 34, color: 'var(--ink)' }}>Nana metrics</h1>
        <p className="v-lede" style={{ fontSize: 16 }}>Live traction and unit economics. Enter the password you were given.</p>
        <label className="v-field">
          <span className="v-label">Password</span>
          <input className="v-input" type="password" name="password" autoComplete="current-password" required autoFocus />
          {state.error && <span className="v-err">{state.error}</span>}
        </label>
        <Submit />
      </form>
    </section>
  );
}

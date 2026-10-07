'use client';

import React from 'react';
import { Modal } from './Modal';

type Props = {
  currentStore: string;
  nextStore: string;
  onCancel: () => void;
  onConfirm: () => void;
};

/** One store per order: adding from a second store asks before emptying the cart. */
export function ReplaceCartDialog({ currentStore, nextStore, onCancel, onConfirm }: Props) {
  return (
    <Modal onClose={onCancel} label="Start a new cart" width={440}>
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span className="v-h3" style={{ fontSize: 26 }}>Start a new cart?</span>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: 'var(--muted)' }}>
          Your cart has items from <strong style={{ color: 'var(--text)' }}>{currentStore}</strong>. Each order comes from one store,
          so adding from {nextStore} will clear it.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
          <button type="button" className="v-btn v-btn--ink v-btn--md" onClick={onConfirm}>
            New cart from {nextStore.length > 22 ? 'this store' : nextStore}
          </button>
          <button type="button" className="v-btn v-btn--soft v-btn--md" onClick={onCancel}>
            Keep my cart
          </button>
        </div>
      </div>
    </Modal>
  );
}

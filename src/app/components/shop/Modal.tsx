'use client';

import React, { useEffect } from 'react';

type Props = {
  onClose: () => void;
  label: string;
  /** 'sheet' docks to the bottom on phones; 'drawer' slides in from the right. */
  variant?: 'dialog' | 'sheet' | 'drawer';
  width?: number;
  children: React.ReactNode;
};

/** Backdrop, Escape-to-close and scroll lock shared by every overlay on the site. */
export function Modal({ onClose, label, variant = 'dialog', width = 520, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const drawer = variant === 'drawer';
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      style={{
        position: 'fixed',
        // The visible viewport, not the layout one — on phones `inset: 0` reaches under the
        // browser toolbar and hid the sheet's and drawer's bottom buttons.
        top: 0,
        left: 0,
        right: 0,
        height: '100dvh',
        zIndex: 60,
        display: 'flex',
        justifyContent: drawer ? 'flex-end' : 'center',
        alignItems: drawer ? 'stretch' : variant === 'sheet' ? 'flex-end' : 'center',
        padding: drawer ? 0 : variant === 'sheet' ? 0 : 16,
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="v-fade"
        style={{ position: 'absolute', inset: 0, border: 0, background: 'rgba(12,18,22,.5)', cursor: 'pointer' }}
      />
      <div
        style={{
          position: 'relative',
          width: `min(${width}px, 100%)`,
          maxHeight: drawer ? '100%' : variant === 'sheet' ? '92dvh' : 'calc(100dvh - 32px)',
          height: drawer ? '100%' : undefined,
          background: '#fff',
          borderRadius: drawer ? 0 : variant === 'sheet' ? '28px 28px 0 0' : 28,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: drawer ? 'nDrawer .35s cubic-bezier(.2,.8,.2,1) both' : 'nRise .3s cubic-bezier(.2,.7,.2,1) both',
        }}
      >
        {children}
      </div>
    </div>
  );
}

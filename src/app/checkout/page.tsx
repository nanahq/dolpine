import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAppConstants } from '../../lib/api/marketplace';
import { CheckoutView } from '../components/checkout/CheckoutView';

// Fees and opening hours change from the admin; don't hold them long.
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false },
};

export default async function CheckoutPage() {
  const constants = await getAppConstants();
  if (!constants) {
    return (
      <div className="v-wrap" style={{ padding: '80px var(--gutter) 140px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <h1 className="v-display" style={{ fontSize: 'clamp(48px,6vw,88px)' }}>Checkout</h1>
        <p className="v-lede">Checkout is unavailable for a moment. Your cart is saved — please try again shortly, or order in the Nana app.</p>
        <Link href="/open" className="v-btn v-btn--ink">Open the app</Link>
      </div>
    );
  }
  return <CheckoutView constants={constants} />;
}

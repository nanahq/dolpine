import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CardReturn } from '../../components/checkout/CardReturn';

export const metadata: Metadata = {
  title: 'Confirming payment',
  robots: { index: false },
};

export default function CheckoutCompletePage() {
  return (
    <Suspense>
      <CardReturn />
    </Suspense>
  );
}

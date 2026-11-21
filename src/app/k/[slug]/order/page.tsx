import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getKitchenServer } from '@/lib/homemade';
import { KitchenHeader } from '../KitchenApp';
import { OrderDone } from './OrderDone';

export const metadata: Metadata = { title: 'Your order', robots: { index: false } };

export default async function KitchenOrderPage({ params }: { params: { slug: string } }) {
  const data = await getKitchenServer(params.slug);
  if (!data) notFound();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <KitchenHeader step="done" />
      <Suspense>
        <OrderDone initial={data} />
      </Suspense>
    </div>
  );
}

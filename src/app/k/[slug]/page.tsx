import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getKitchenServer } from '@/lib/homemade';
import { KitchenApp } from './KitchenApp';

export const revalidate = 30;

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await getKitchenServer(params.slug);
  if (!data) return { title: 'Kitchen not found' };
  const { kitchen } = data;
  const description = kitchen.bio ?? `Home-cooked plates from ${kitchen.cook_name ?? kitchen.name}, delivered by Nana.`;
  return {
    title: kitchen.name,
    description,
    openGraph: { title: kitchen.name, description, url: kitchen.link, images: kitchen.logo_url ? [kitchen.logo_url] : undefined },
  };
}

export default async function KitchenPage({ params }: Params) {
  const data = await getKitchenServer(params.slug);
  if (!data) notFound();
  return <KitchenApp initial={data} />;
}

import type { StoreCard } from './shop/catalog';

export const SITE_URL = 'https://trynanaapp.com';

export const KANO_TAGLINE = "Kano's #1 food, grocery and errand delivery app";

/** Stores within this distance of an area's centre are listed as "near" it. */
export const NEAR_KM = 2.5;

export interface KanoArea {
  slug: string;
  name: string;
  centre: { lat: number; lng: number };
  lede: string;
  about: string;
  landmarks: string[];
}

export const KANO_AREAS: KanoArea[] = [
  {
    slug: 'tarauni',
    name: 'Tarauni',
    centre: { lat: 11.9775, lng: 8.5615 },
    lede: 'Suya, shawarma, groceries and errands delivered across Tarauni — from Farm Centre to Maiduguri Road.',
    about:
      'Tarauni has suya and shawarma spots on Nana, plus the Nana Store at Tarauni Market for fresh meat and vegetables. Order from the app or the web and a Nana rider brings it to your gate.',
    landmarks: ['Farm Centre', 'Tarauni Market', 'Maiduguri Road', 'Kwanar Maggi'],
  },
  {
    slug: 'nassarawa-gra',
    name: 'Nassarawa GRA',
    centre: { lat: 11.998, lng: 8.548 },
    lede: 'Restaurants, cafés and groceries delivered to homes and offices across Nassarawa GRA.',
    about:
      'From Audu Bako Way to Club Road and Race Course, Nassarawa GRA sits in the middle of Kano’s restaurant cluster — so most orders here travel only a short way to reach you.',
    landmarks: ['Audu Bako Way', 'Club Road', 'Race Course', 'Nassarawa Hospital Road', 'Ahmadu Bello Way'],
  },
  {
    slug: 'zoo-road',
    name: 'Zoo Road',
    centre: { lat: 11.9725, lng: 8.533 },
    lede: 'Fried chicken, rice dishes and everyday shopping delivered along Zoo Road and Gandun Albasa.',
    about:
      'Zoo Road links Gandun Albasa, Ado Bayero Mall and the roads towards State Road, so you can order from the mall, the restaurants on State Road, or anywhere else in the city.',
    landmarks: ['Gandun Albasa', 'Ado Bayero Mall', 'Kano Zoo', 'State Road'],
  },
  {
    slug: 'sabon-gari',
    name: 'Sabon Gari',
    centre: { lat: 12.014, lng: 8.533 },
    lede: 'Local dishes, fast food and groceries delivered across Sabon Gari.',
    about:
      'Sabon Gari is one of Kano’s busiest commercial districts. Order from the restaurants on New Road or from stores across the city, and track your rider all the way to your street.',
    landmarks: ['New Road', 'Sabon Gari Market', 'Murtala Mohammed Way'],
  },
  {
    slug: 'fagge',
    name: 'Fagge',
    centre: { lat: 12.006, lng: 8.532 },
    lede: 'Meals, groceries and errands delivered to homes, shops and offices in Fagge.',
    about:
      'Whether you’re working near Kantin Kwari or at home in Fagge, Nana delivers food from Murtala Mohammed Way and across Kano, and our riders can run errands to the shops you already use.',
    landmarks: ['Murtala Mohammed Way', 'Kantin Kwari', 'Fagge'],
  },
  {
    slug: 'ado-bayero-mall',
    name: 'Ado Bayero Mall',
    centre: { lat: 11.977, lng: 8.535 },
    lede: 'Order from Ado Bayero Mall and the stores around it — delivered to your door anywhere in Kano.',
    about:
      'Skip the mall traffic. Order from the restaurants at Ado Bayero Mall and nearby on Zoo Road and State Road, or send a rider to pick something up for you.',
    landmarks: ['Ado Bayero Mall', 'Zoo Road', 'State Road', 'Gandun Albasa'],
  },
];

export function findArea(slug: string): KanoArea | undefined {
  return KANO_AREAS.find((a) => a.slug === slug);
}

/** Open stores first, then ones with photos ahead of monogram tiles. */
export function sortStores(stores: StoreCard[]): StoreCard[] {
  return [...stores].sort((a, b) => Number(b.isOpen) - Number(a.isOpen) || Number(!!b.banner) - Number(!!a.banner));
}

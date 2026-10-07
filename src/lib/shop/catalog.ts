import type { ApiMerchant, ApiMerchantDetail, ApiProduct } from '../api/types';
import { cleanImageUrl, formatPrepWindow } from '../format';

/**
 * View models for the marketplace, store pages and cart, built from the
 * nana-v2 customer endpoints on the server. Everything here must stay plain
 * JSON: it crosses from server components into client ones.
 */

export type CatKey = 'food' | 'grocery' | 'pharmacy' | 'retail';

/** What checkout needs to know about the store an order comes from. */
export interface ShopMerchant {
  id: string;
  name: string;
  merchantType: string;
  isErrand: boolean;
  isOpen: boolean;
  minimumOrder: number;
  chargeConfig: Record<string, number>;
  address: {
    id: string;
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    lat: number;
    lng: number;
  } | null;
}

export interface ShopVariant {
  id: string;
  name: string;
  group: string;
  required: boolean;
  priceModifier: number;
}

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  /** Only set when it actually undercuts the base price. */
  salePrice: number | null;
  image: string | null;
  variants: ShopVariant[];
}

export interface StoreCard {
  id: string;
  name: string;
  tags: string;
  eta: string;
  prepMinutes: number;
  cat: CatKey;
  banner: string | null;
  mono: string;
  monoBg: string;
  monoFg: string;
  isOpen: boolean;
  isErrand: boolean;
  createdAt: string | null;
  lat: number | null;
  lng: number | null;
}

export interface StoreMenu {
  card: StoreCard;
  merchant: ShopMerchant;
  sections: { id: string; name: string; products: ShopProduct[] }[];
}

const MONO_PALETTE: [string, string][] = [
  ['#FFD400', '#0C1216'],
  ['#0C1216', '#469ADC'],
  ['#469ADC', '#0C1216'],
  ['#17703C', '#FFFFFF'],
];

const num = (v: string | number | null | undefined) => {
  const n = typeof v === 'string' ? parseFloat(v) : v ?? 0;
  return Number.isFinite(n) ? (n as number) : 0;
};

export function catFor(merchantType: string): CatKey {
  if (merchantType === 'restaurant') return 'food';
  if (merchantType === 'grocery') return 'grocery';
  if (merchantType === 'pharmacy') return 'pharmacy';
  return 'retail';
}

/** "IS" for "I.S Suya - Nassarawa": two letters for the no-photo tile. */
function monogram(name: string): string {
  const words = name.replace(/[^A-Za-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? 'N').slice(0, 2);
  return letters.toUpperCase();
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function titleCase(s: string): string {
  return s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

export function toStoreCard(m: ApiMerchant): StoreCard {
  const [monoBg, monoFg] = MONO_PALETTE[hash(m.id) % MONO_PALETTE.length];
  const cuisines = (m.cuisine_types ?? []).filter(Boolean).slice(0, 3).map(titleCase);
  return {
    id: m.id,
    name: m.business_name.trim(),
    tags: cuisines.length ? cuisines.join(' · ') : m.description?.trim() || titleCase(m.merchant_type.replace(/_/g, ' ')),
    eta: formatPrepWindow(m.preparation_time),
    prepMinutes: m.preparation_time || 30,
    cat: catFor(m.merchant_type),
    banner: cleanImageUrl(m.banner_url) ?? cleanImageUrl(m.logo_url),
    mono: monogram(m.business_name),
    monoBg,
    monoFg,
    isOpen: m.is_open,
    isErrand: !!m.is_errand,
    createdAt: m.created_at ?? null,
    lat: m.address?.latitude ?? null,
    lng: m.address?.longitude ?? null,
  };
}

export function toShopMerchant(m: ApiMerchant): ShopMerchant {
  const a = m.address;
  const chargeConfig: Record<string, number> = {};
  for (const [k, v] of Object.entries(m.charge_config ?? {})) {
    if (num(v) > 0) chargeConfig[k] = num(v);
  }
  return {
    id: m.id,
    name: m.business_name.trim(),
    merchantType: m.merchant_type,
    isErrand: !!m.is_errand,
    isOpen: m.is_open,
    minimumOrder: num(m.minimum_order),
    chargeConfig,
    address:
      a && a.latitude != null && a.longitude != null
        ? {
            id: a.id,
            line1: a.address_line_1,
            line2: a.address_line_2 ?? null,
            city: a.city,
            state: a.state,
            lat: a.latitude,
            lng: a.longitude,
          }
        : null,
  };
}

export function toShopProduct(p: ApiProduct): ShopProduct {
  const base = num(p.base_price);
  const sale = p.sale_price == null ? null : num(p.sale_price);
  return {
    id: p.id,
    name: p.name.trim(),
    description: p.description?.trim() ?? '',
    basePrice: base,
    salePrice: sale != null && sale > 0 && sale < base ? sale : null,
    image: cleanImageUrl(p.image_url),
    variants: (p.variants ?? []).map((v) => ({
      id: v.id,
      name: v.name,
      group: v.variant_group,
      required: v.is_required,
      priceModifier: num(v.price_modifier),
    })),
  };
}

export function toStoreMenu(d: ApiMerchantDetail): StoreMenu {
  const sections = [...(d.category ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((c) => ({
      id: c.id,
      name: c.name.trim(),
      products: [...(c.products ?? [])]
        .filter((p) => p.is_available)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(toShopProduct),
    }))
    .filter((s) => s.products.length > 0);
  return { card: toStoreCard(d), merchant: toShopMerchant(d), sections };
}

/** What one unit costs before any variants: the sale price when there is one. */
export function unitPrice(p: Pick<ShopProduct, 'basePrice' | 'salePrice'>): number {
  return p.salePrice ?? p.basePrice;
}

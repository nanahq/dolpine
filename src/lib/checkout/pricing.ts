import type { ApiAppConstants } from '../api/types';
import type { ShopMerchant } from '../shop/catalog';

/**
 * The customer-facing estimate, mirroring OrderService.create in nana-v2.
 * The server recomputes everything and its figure is what gets charged —
 * the payment step shows the gateway's amount, not this one.
 */

export type OrderType = 'food' | 'grocery' | 'pharmacy';

export function orderTypeFor(merchantType: string): OrderType {
  if (merchantType === 'grocery') return 'grocery';
  if (merchantType === 'pharmacy') return 'pharmacy';
  return 'food';
}

export interface Breakdown {
  subtotal: number;
  delivery: number | null;
  service: number;
  serviceLabel: string;
  charges: { label: string; amount: number }[];
  discount: number;
  total: number | null;
}

export function priceOrder(input: {
  subtotal: number;
  merchant: ShopMerchant;
  /** Raw fee from the quote endpoint, before the platform multiplier; null until there's an address. */
  quotedFee: number | null;
  constants: ApiAppConstants;
  coupon: { discount: number; freeDelivery: boolean } | null;
}): Breakdown {
  const { subtotal, merchant, constants, coupon } = input;
  const service = merchant.isErrand
    ? constants.errand_fee
    : Math.min(Math.round((subtotal * constants.service_fee_percentage) / 100), constants.service_fee_cap);

  const charges = Object.entries(merchant.chargeConfig).map(([label, pct]) => ({
    label: `${label} (${pct}%)`,
    amount: subtotal * (pct / 100),
  }));

  const delivery =
    input.quotedFee == null ? null : coupon?.freeDelivery ? 0 : input.quotedFee * (constants.delivery_fee_multiplier || 1);
  const discount = coupon && !coupon.freeDelivery ? coupon.discount : 0;
  const chargesTotal = charges.reduce((s, c) => s + c.amount, 0);

  const total =
    delivery == null ? null : Math.round(Math.max(0, subtotal + service + delivery + chargesTotal - discount) / 10) * 10;

  return {
    subtotal,
    delivery,
    service,
    serviceLabel: merchant.isErrand ? 'Errand fee' : 'Service fee',
    charges,
    discount,
    total,
  };
}

/** Is Nana dispatching right now? Hours are Lagos wall-clock "HH:MM". */
export function platformOpen(constants: ApiAppConstants, now = new Date()): boolean {
  const open = constants.platform_open_time;
  const close = constants.platform_close_time;
  if (!open || !close) return true;
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const mins = h * 60 + m;
  const toMins = (t: string) => {
    const [hh, mm] = t.split(':').map(Number);
    return hh * 60 + (mm || 0);
  };
  const o = toMins(open);
  const c = toMins(close);
  return o <= c ? mins >= o && mins < c : mins >= o || mins < c;
}

/** "10:30 am" */
export function clock(t: string | undefined): string {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m || 0).padStart(2, '0')} ${h >= 12 ? 'pm' : 'am'}`;
}

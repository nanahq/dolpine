import type { CookDay, CookDayDish, QuoteBody } from '@/lib/homemade';
import type { DeliveryAddress } from '@/lib/shop/address';
import { readJson, writeJson } from '@/lib/storage';

export interface CartLine {
  dishId: string;
  choiceIds: string[];
  qty: number;
}

/** Plates from a single cook day; a cook day is one order. */
export interface KitchenCart {
  dayId: string;
  lines: CartLine[];
}

const key = (slug: string) => `nana_kitchen_cart_v1_${slug}`;

export const loadCart = (slug: string) => readJson<KitchenCart>(key(slug));
export const saveCart = (slug: string, cart: KitchenCart | null) => writeJson(key(slug), cart);

export const lineKey = (l: Pick<CartLine, 'dishId' | 'choiceIds'>) => `${l.dishId}|${[...l.choiceIds].sort().join(',')}`;

export function unitPrice(dish: CookDayDish, choiceIds: string[]): number {
  const extras = dish.option_groups.flatMap((g) => g.choices).filter((c) => choiceIds.includes(c.id));
  return dish.price + extras.reduce((n, c) => n + c.price, 0);
}

export function choiceNames(dish: CookDayDish, choiceIds: string[]): string {
  return dish.option_groups
    .flatMap((g) => g.choices)
    .filter((c) => choiceIds.includes(c.id))
    .map((c) => c.name)
    .join(', ');
}

export interface PricedLine {
  key: string;
  qty: number;
  name: string;
  extras: string;
  total: number;
}

export function priceCart(cart: KitchenCart | null, day: CookDay | undefined) {
  const lines: PricedLine[] = [];
  if (!cart || !day) return { lines, plates: 0, subtotal: 0 };
  for (const l of cart.lines) {
    const dish = day.dishes.find((d) => d.id === l.dishId);
    if (!dish) continue;
    lines.push({ key: lineKey(l), qty: l.qty, name: dish.name, extras: choiceNames(dish, l.choiceIds), total: unitPrice(dish, l.choiceIds) * l.qty });
  }
  return { lines, plates: lines.reduce((n, l) => n + l.qty, 0), subtotal: lines.reduce((n, l) => n + l.total, 0) };
}

export const platesOf = (cart: KitchenCart | null, dishId: string) =>
  cart?.lines.filter((l) => l.dishId === dishId).reduce((n, l) => n + l.qty, 0) ?? 0;

// Cook days are in Nigerian time whatever the browser's zone.
const TZ = 'Africa/Lagos';
const ymd = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: TZ });

function time(d: Date): string {
  return d.toLocaleTimeString('en-GB', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s?(am|pm)$/i, ' $1').toLowerCase();
}

function relDay(d: Date): 'Today' | 'Tomorrow' | null {
  const now = new Date();
  if (ymd(d) === ymd(now)) return 'Today';
  if (ymd(d) === ymd(new Date(now.getTime() + 86_400_000))) return 'Tomorrow';
  return null;
}

export function dayLabels(day: CookDay) {
  const ready = new Date(day.ready_at);
  const end = new Date(day.window_end);
  const rel = relDay(ready);
  const dm = ready.toLocaleDateString('en-GB', { timeZone: TZ, day: 'numeric', month: 'short' });
  const s = time(ready);
  const e = time(end);
  const window = `${s.slice(-2) === e.slice(-2) ? s.slice(0, -3) : s} – ${e}`;
  return {
    label: rel ?? `${ready.toLocaleDateString('en-GB', { timeZone: TZ, weekday: 'short' })} ${dm}`,
    full: rel ?? `${ready.toLocaleDateString('en-GB', { timeZone: TZ, weekday: 'long' })} ${dm}`,
    window: `Delivered ${window}`,
    windowShort: window,
  };
}

export function cutoffLabel(day: CookDay, now: number): { text: string; urgent: boolean; closed: boolean } {
  const cutoff = new Date(day.cutoff_at);
  const left = cutoff.getTime() - now;
  if (day.status !== 'open' || left <= 0) return { text: 'Orders closed', urgent: false, closed: true };
  if (left < 86_400_000) {
    const h = Math.floor(left / 3_600_000);
    const m = Math.floor((left % 3_600_000) / 60_000);
    return { text: `Orders close in ${h}h ${String(m).padStart(2, '0')}m`, urgent: true, closed: false };
  }
  const rel = relDay(cutoff);
  const when = rel ?? cutoff.toLocaleDateString('en-GB', { timeZone: TZ, weekday: 'long' });
  return { text: `Order by ${when} ${time(cutoff)}`, urgent: false, closed: false };
}

export function quoteBody(cart: KitchenCart, address: DeliveryAddress, landmark: string): QuoteBody {
  return {
    plates: cart.lines.map((l) => ({ cook_day_dish_id: l.dishId, plates: l.qty, ...(l.choiceIds.length ? { choice_ids: l.choiceIds } : {}) })),
    dropoff_address: {
      address_line_1: address.line,
      ...(landmark.trim() ? { address_line_2: landmark.trim() } : {}),
      city: address.city,
      state: address.state,
      latitude: address.lat,
      longitude: address.lng,
    },
  };
}

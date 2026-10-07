import { createAddress, createOrder, updateProfile, type PlacedOrder } from '@/lib/checkout/api';
import { orderTypeFor, type Breakdown } from '@/lib/checkout/pricing';
import type { WebSession } from '@/lib/checkout/session';
import type { DeliveryAddress } from '@/lib/shop/address';
import type { Cart } from '@/lib/shop/cart';
import { readJson, writeJson } from '@/lib/storage';
import type { PayMethod } from './PaymentStep';

const ADDRESS_IDS_KEY = 'nana_web_address_ids_v1';

/** Reuses the saved-address row from an earlier web order to the same spot instead of piling up duplicates. */
async function ensureAddressId(session: WebSession, a: DeliveryAddress, landmark: string): Promise<string> {
  const key = `${session.userId}|${a.lat.toFixed(5)},${a.lng.toFixed(5)}|${landmark}`;
  const known = readJson<Record<string, string>>(ADDRESS_IDS_KEY) ?? {};
  if (known[key]) return known[key];
  const { id } = await createAddress(session.token, {
    label: a.label.slice(0, 40) || 'Delivery',
    street: a.label,
    address_line_1: a.line,
    address_line_2: landmark || undefined,
    city: a.city,
    state: a.state,
    country: 'Nigeria',
    latitude: a.lat,
    longitude: a.lng,
  });
  writeJson(ADDRESS_IDS_KEY, { ...known, [key]: id });
  return id;
}

export interface PlaceInput {
  session: WebSession;
  /** Filled only when the account is missing them. */
  profile: { email?: string; fullName?: string };
  cart: Cart;
  price: Breakdown;
  address: DeliveryAddress;
  landmark: string;
  note: string;
  method: PayMethod;
  couponCode: string | null;
}

/**
 * Profile → saved address → order. Each step is safe to repeat if a later one
 * fails: the profile patch is idempotent and the address id is cached.
 */
export async function placeOrder(input: PlaceInput): Promise<{ placed: PlacedOrder; session: WebSession }> {
  const { cart, price, address, method } = input;
  const merchant = cart.merchant!;
  const pickup = merchant.address!;
  let session = input.session;

  if (input.profile.email || input.profile.fullName) {
    const [first, ...rest] = (input.profile.fullName ?? '').trim().split(/\s+/);
    await updateProfile(session.token, {
      ...(input.profile.email ? { email: input.profile.email } : {}),
      ...(input.profile.fullName ? { first_name: first, last_name: rest.join(' ') } : {}),
    });
    session = { ...session, email: input.profile.email ?? session.email, fullName: input.profile.fullName ?? session.fullName };
  }

  const dropoffId = await ensureAddressId(session, address, input.landmark);

  const placed = await createOrder(session.token, {
    customer_id: session.userId,
    merchant_id: merchant.id,
    type: orderTypeFor(merchant.merchantType),
    subtotal: price.subtotal,
    delivery_fee: price.delivery ?? 0,
    ...(price.service > 0 ? { service_fee: price.service } : {}),
    total_amount: price.total,
    payment_method: 'online',
    charge_method: method,
    ...(method === 'card' ? { callback_url: `${window.location.origin}/checkout/complete` } : {}),
    pickup_address: {
      address_line_1: pickup.line1,
      ...(pickup.line2 ? { address_line_2: pickup.line2 } : {}),
      city: pickup.city,
      state: pickup.state,
      latitude: pickup.lat,
      longitude: pickup.lng,
    },
    pickup_address_id: pickup.id,
    dropoff_address: {
      address_line_1: address.line,
      ...(input.landmark ? { address_line_2: input.landmark } : {}),
      city: address.city,
      state: address.state,
      latitude: address.lat,
      longitude: address.lng,
    },
    dropoff_address_id: dropoffId,
    order_items: cart.lines.map((l) => ({
      product_id: l.productId,
      quantity: l.qty,
      base_price: l.basePrice,
      ...(l.salePrice != null ? { sale_price: l.salePrice } : {}),
      variants: l.variants.map((v) => ({ variant_id: v.id, price_modifier: v.priceModifier })),
    })),
    ...(input.couponCode ? { coupon_code: input.couponCode } : {}),
    ...(input.note.trim() ? { delivery_instructions: input.note.trim() } : {}),
  });

  return { placed, session };
}

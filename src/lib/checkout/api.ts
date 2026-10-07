import { api } from '../api/client';

/** Calls the checkout makes, in the order it makes them. Shapes mirror nana-v2. */

interface ApiUser {
  id: string;
  phone_number: string;
  email: string | null;
  full_name: string | null;
  first_name: string | null;
}

export function requestOtp(phoneE164: string) {
  return api<{ message: string }>('auth/otp/request', {
    method: 'POST',
    body: { phone_number: phoneE164, role: 'customer' },
  });
}

export function verifyOtp(phoneE164: string, otp: string) {
  return api<{ user: ApiUser; token: string }>('auth/otp/verify', {
    method: 'POST',
    body: { phone_number: phoneE164, otp },
  });
}

/** Fills in what a phone-only signup is missing. Only ever these fields. */
export function updateProfile(token: string, body: { email?: string; first_name?: string; last_name?: string }) {
  return api<ApiUser>('users', { method: 'PATCH', token, body });
}

export interface DeliveryQuote {
  fee: number;
  /** km */
  distance: number;
  /** minutes, drive time plus prep buffer */
  eta?: number;
}

/** Coordinates are [longitude, latitude] — the order location-service destructures. */
export function quoteDelivery(pickup: { lat: number; lng: number }, dropoff: { lat: number; lng: number }) {
  return api<DeliveryQuote>('location/delivery-fee/calculate', {
    method: 'POST',
    body: { pickupCoords: [pickup.lng, pickup.lat], dropoffCoords: [dropoff.lng, dropoff.lat] },
  });
}

export interface CouponQuote {
  coupon: { code: string; name: string; discount_type: string };
  discount_amount: number;
  is_free_delivery: boolean;
}

export function validateCoupon(
  token: string,
  body: { code: string; order_amount: number; delivery_fee: number; service_fee: number; merchant_id: string; order_type: string },
) {
  return api<CouponQuote>('coupon/validate', { method: 'POST', token, body });
}

/** Saved so driver assignment and the app's address book see the same coordinates. */
export function createAddress(
  token: string,
  body: { label: string; street: string; address_line_1: string; address_line_2?: string; city: string; state: string; country: string; latitude: number; longitude: number },
) {
  return api<{ id: string }>('addresses', { method: 'POST', token, body });
}

/** Gateway reply, normalised by the API to Paystack's shape. Amount is in kobo. */
export interface PaymentInit {
  status?: boolean;
  data?: {
    reference: string;
    account_number?: string;
    account_name?: string;
    amount?: number;
    account_expires_at?: string;
    display_text?: string;
    bank?: { name: string };
    authorization_url?: string;
  };
}

export interface PlacedOrder {
  order: { id: string; order_number?: string | null; total_amount: string | number };
  payment: PaymentInit | null;
}

export function createOrder(token: string, body: Record<string, unknown>) {
  return api<PlacedOrder>('orders', { method: 'POST', token, body });
}

export interface TrackedOrder {
  id: string;
  order_number: string | null;
  status: string;
  total_amount: string | number;
}

/** Public tracking. An order stays `pending` until the gateway webhook confirms payment. */
export function trackOrder(id: string, signal?: AbortSignal) {
  return api<TrackedOrder>(`orders/track/${encodeURIComponent(id)}`, { signal });
}

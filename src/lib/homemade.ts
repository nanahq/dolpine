import { api } from './api/client';
import { apiGet } from './api/config';

export interface OptionChoice {
  id: string;
  name: string;
  price: number;
}

export interface OptionGroup {
  id: string;
  name: string;
  type: 'one' | 'any';
  choices: OptionChoice[];
}

export interface CookDayDish {
  id: string;
  name: string;
  description: string | null;
  photo_url: string | null;
  price: number;
  option_groups: OptionGroup[];
  plates_left: number;
  sold_out: boolean;
}

export interface CookDay {
  id: string;
  status: 'open' | 'closed';
  ready_at: string;
  window_end: string;
  cutoff_at: string;
  note: string | null;
  dishes: CookDayDish[];
}

export interface KitchenPage {
  kitchen: {
    id: string;
    slug: string;
    link: string;
    name: string;
    cook_name: string | null;
    area: string | null;
    bio: string | null;
    logo_url: string | null;
    plates_served: number;
    taking_orders: boolean;
  };
  fees: {
    delivery_fee: number;
    max_distance_km: number;
    service_fee_enabled: boolean;
    delivery_window_minutes: number;
    plate_hold_minutes: number;
  };
  following: boolean;
  cook_days: CookDay[];
  past_dishes: { id: string; name: string; description: string | null; photo_url: string | null; price: number }[];
}

export interface HomemadeQuote {
  lines: { cook_day_dish_id: string; name: string; plates: number; price: number; total: number; options_text: string | null }[];
  plates: number;
  subtotal: number;
  delivery_fee: number;
  service_fee: number;
  total: number;
  distance_km: number;
  plate_hold_minutes: number;
}

export interface HomemadeDropoff {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface QuoteBody {
  plates: { cook_day_dish_id: string; plates: number; choice_ids?: string[] }[];
  dropoff_address: HomemadeDropoff;
}

export interface OrderBody extends QuoteBody {
  note_for_cook?: string;
  first_name?: string;
  payment_method: 'wallet' | 'online';
  charge_method: 'bank_transfer' | 'card';
  callback_url?: string;
  quoted_total: number;
}

export interface PlacedHomemadeOrder {
  order: { id: string; order_number: string | null; total_amount: string | number };
  payment: {
    data?: {
      account_number?: string;
      account_name?: string;
      amount?: number;
      account_expires_at?: string;
      bank?: { name: string };
      authorization_url?: string;
    };
  } | null;
  hold_expires_at: string;
}

export interface HomemadeOrderDetail {
  id: string;
  status: string;
  bag_label: string | null;
  total_amount: string | number;
  scheduled_delivery_time: string | null;
  dropoff_address: string | null;
  order_items: { product_name: string | null; quantity: number }[];
}

export function getKitchenServer(slug: string) {
  return apiGet<KitchenPage>(`homemade/kitchens/${encodeURIComponent(slug)}`, { revalidate: 30 });
}

export function getKitchen(slug: string, token: string | null) {
  return api<KitchenPage>(`homemade/kitchens/${encodeURIComponent(slug)}`, { token });
}

export function quoteHomemade(token: string, cookDayId: string, body: QuoteBody) {
  return api<HomemadeQuote>(`homemade/cook-days/${cookDayId}/quote`, { method: 'POST', token, body });
}

export function placeHomemadeOrder(token: string, cookDayId: string, body: OrderBody) {
  return api<PlacedHomemadeOrder>(`homemade/cook-days/${cookDayId}/orders`, { method: 'POST', token, body });
}

export function setFollowing(token: string, slug: string, on: boolean) {
  return api<{ following: boolean }>(`homemade/kitchens/${encodeURIComponent(slug)}/follow`, {
    method: on ? 'POST' : 'DELETE',
    token,
  });
}

export function getOrderDetail(token: string, id: string) {
  return api<HomemadeOrderDetail>(`orders/${encodeURIComponent(id)}`, { token });
}

export function getWalletBalance(token: string) {
  return api<{ balance: number }>('wallet/balance', { token });
}

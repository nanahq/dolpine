/**
 * Shapes returned by the nana-v2 public customer endpoints.
 *
 * Prisma `Decimal` columns serialize to JSON as strings, so money/precision
 * fields are typed `string | number` and should be run through the helpers in
 * `lib/format.ts` before display.
 */

export type MerchantType = 'restaurant' | 'grocery' | 'pharmacy' | string;

export interface ApiAddress {
  id: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  state: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface ApiOperatingHour {
  id: string;
  day_of_week: number; // 0 = Sunday
  open_time?: string | null; // "09:00"
  close_time?: string | null; // "22:00"
  is_closed: boolean;
}

export interface ApiProductVariant {
  id: string;
  name: string;
  price_modifier: string | number;
  variant_group: string;
  is_required: boolean;
}

export interface ApiProduct {
  id: string;
  name: string;
  description?: string | null;
  base_price: string | number;
  sale_price?: string | number | null;
  image_url?: string | null;
  is_available: boolean;
  sort_order: number;
  variants?: ApiProductVariant[];
}

export interface ApiCategory {
  id: string;
  name: string;
  image_url?: string | null;
  sort_order: number;
  products?: ApiProduct[];
}

/** Summary shape from `GET /merchant/customers`. */
export interface ApiMerchant {
  id: string;
  business_name: string;
  merchant_type: MerchantType;
  description?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  rating: number;
  total_reviews: number;
  delivery_fee: string | number;
  minimum_order: string | number;
  preparation_time: number; // minutes
  is_open: boolean;
  cuisine_types: string[];
  address?: ApiAddress | null;
  operating_hours?: ApiOperatingHour[];
  /** Present only when the request supplied coordinates. */
  distance?: number;
}

/** Detail shape from `GET /merchant/customers/:id` — includes the menu. */
export interface ApiMerchantDetail extends ApiMerchant {
  category?: ApiCategory[];
}

export interface ApiReviewAuthor {
  id: string;
  full_name?: string | null;
  profile_image_url?: string | null;
}

export interface ApiReview {
  id: string;
  rating?: number | null;
  comment?: string | null;
  created_at: string;
  author?: ApiReviewAuthor | null;
}

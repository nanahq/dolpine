import type { ShopMerchant, ShopProduct } from './catalog';
import { unitPrice } from './catalog';

/**
 * The cart holds one store at a time, like the app: the API creates one order
 * per merchant, and a mixed cart would mean two payments (two transfer
 * accounts) for one checkout.
 */

export interface CartVariant {
  id: string;
  name: string;
  group: string;
  priceModifier: number;
}

export interface CartLine {
  /** product id plus the chosen variant ids, so "Large" and "Small" are separate lines. */
  key: string;
  productId: string;
  name: string;
  image: string | null;
  basePrice: number;
  salePrice: number | null;
  variants: CartVariant[];
  qty: number;
}

export interface Cart {
  merchant: ShopMerchant | null;
  lines: CartLine[];
}

export const EMPTY_CART: Cart = { merchant: null, lines: [] };

export function lineKey(productId: string, variants: CartVariant[]): string {
  return [productId, ...variants.map((v) => v.id).sort()].join('|');
}

export function lineUnitPrice(line: Pick<CartLine, 'basePrice' | 'salePrice' | 'variants'>): number {
  return unitPrice(line) + line.variants.reduce((sum, v) => sum + v.priceModifier, 0);
}

export function lineFor(product: ShopProduct, variants: CartVariant[], qty = 1): CartLine {
  return {
    key: lineKey(product.id, variants),
    productId: product.id,
    name: product.name,
    image: product.image,
    basePrice: product.basePrice,
    salePrice: product.salePrice,
    variants,
    qty,
  };
}

export function cartCount(cart: Cart): number {
  return cart.lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(cart: Cart): number {
  return cart.lines.reduce((sum, l) => sum + l.qty * lineUnitPrice(l), 0);
}

/** Adds to the cart. The caller has already confirmed replacing another store's cart. */
export function addLine(cart: Cart, merchant: ShopMerchant, line: CartLine): Cart {
  const base = cart.merchant?.id === merchant.id ? cart : { merchant, lines: [] };
  const existing = base.lines.find((l) => l.key === line.key);
  const lines = existing
    ? base.lines.map((l) => (l.key === line.key ? { ...l, qty: l.qty + line.qty } : l))
    : [...base.lines, line];
  // Refresh the snapshot so open/closed and address changes reach checkout.
  return { merchant, lines };
}

export function setLineQty(cart: Cart, key: string, qty: number): Cart {
  const lines = qty <= 0 ? cart.lines.filter((l) => l.key !== key) : cart.lines.map((l) => (l.key === key ? { ...l, qty } : l));
  return lines.length ? { ...cart, lines } : EMPTY_CART;
}

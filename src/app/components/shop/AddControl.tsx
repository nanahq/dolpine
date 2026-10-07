'use client';

import React from 'react';
import type { ShopMerchant, ShopProduct } from '@/lib/shop/catalog';
import { useShop } from './ShopProvider';

type Props = { merchant: ShopMerchant; product: ShopProduct };

/**
 * The "+" that sits on a product image, turning into a stepper once added.
 * Products with options always go through the sheet, so their stepper only
 * adds — removing a specific variant line happens in the cart.
 */
export function AddControl({ merchant, product }: Props) {
  const shop = useShop();
  const qty = shop.qtyOf(product.id);
  const hasOptions = product.variants.length > 0;
  const pos: React.CSSProperties = { position: 'absolute', right: 8, bottom: 8 };

  if (!merchant.isOpen) return null;

  if (qty === 0) {
    return (
      <button type="button" className="v-add" style={pos} aria-label={`Add ${product.name}`} onClick={() => shop.addProduct(merchant, product)}>
        +
      </button>
    );
  }
  return (
    <div className="v-qty" style={pos}>
      <button
        type="button"
        aria-label={hasOptions ? 'Open cart' : `Remove one ${product.name}`}
        onClick={() => (hasOptions ? shop.setCartOpen(true) : shop.stepProduct(product.id, -1))}
      >
        −
      </button>
      <span>{qty}</span>
      <button
        type="button"
        aria-label={`Add another ${product.name}`}
        onClick={() => (hasOptions ? shop.openProduct(merchant, product) : shop.stepProduct(product.id, 1))}
      >
        +
      </button>
    </div>
  );
}

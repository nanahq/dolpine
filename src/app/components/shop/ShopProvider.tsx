'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addLine, cartCount, cartSubtotal, EMPTY_CART, lineFor, setLineQty, type Cart, type CartLine } from '@/lib/shop/cart';
import type { ShopMerchant, ShopProduct } from '@/lib/shop/catalog';
import type { DeliveryAddress } from '@/lib/shop/address';
import { readJson, writeJson } from '@/lib/storage';
import { ProductSheet } from './ProductSheet';
import { ReplaceCartDialog } from './ReplaceCartDialog';

const CART_KEY = 'nana_web_cart_v1';
const ADDRESS_KEY = 'nana_web_address_v1';

type Pending = { merchant: ShopMerchant; line: CartLine };

interface Shop {
  cart: Cart;
  count: number;
  subtotal: number;
  /** Total quantity of a product across its variant lines. */
  qtyOf: (productId: string) => number;
  /** Quick add for products with no variants; opens the product sheet otherwise. */
  addProduct: (merchant: ShopMerchant, product: ShopProduct) => void;
  addLine: (merchant: ShopMerchant, line: CartLine) => void;
  /** Steps a variant-free product up or down from a tile's stepper. */
  stepProduct: (productId: string, delta: 1 | -1) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  openProduct: (merchant: ShopMerchant, product: ShopProduct) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  address: DeliveryAddress | null;
  setAddress: (a: DeliveryAddress | null) => void;
  /** False until saved state has been read, so server and first client render agree. */
  ready: boolean;
}

const ShopContext = createContext<Shop | null>(null);

export function useShop(): Shop {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>');
  return ctx;
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [address, setAddressState] = useState<DeliveryAddress | null>(null);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [pending, setPending] = useState<Pending | null>(null);
  const [sheet, setSheet] = useState<{ merchant: ShopMerchant; product: ShopProduct } | null>(null);

  useEffect(() => {
    setCart(readJson<Cart>(CART_KEY) ?? EMPTY_CART);
    setAddressState(readJson<DeliveryAddress>(ADDRESS_KEY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeJson(CART_KEY, cart.lines.length ? cart : null);
  }, [cart, ready]);

  const setAddress = useCallback((a: DeliveryAddress | null) => {
    setAddressState(a);
    writeJson(ADDRESS_KEY, a);
  }, []);

  const add = useCallback(
    (merchant: ShopMerchant, line: CartLine) => {
      if (cart.merchant && cart.merchant.id !== merchant.id && cart.lines.length) {
        setPending({ merchant, line });
        return;
      }
      setCart((c) => addLine(c, merchant, line));
    },
    [cart],
  );

  const value = useMemo<Shop>(
    () => ({
      cart,
      count: cartCount(cart),
      subtotal: cartSubtotal(cart),
      qtyOf: (productId) => cart.lines.filter((l) => l.productId === productId).reduce((n, l) => n + l.qty, 0),
      addProduct: (merchant, product) => {
        if (product.variants.length) setSheet({ merchant, product });
        else add(merchant, lineFor(product, []));
      },
      addLine: add,
      stepProduct: (productId, delta) => {
        const line = cart.lines.find((l) => l.productId === productId && l.variants.length === 0);
        if (line) setCart((c) => setLineQty(c, line.key, line.qty + delta));
      },
      setQty: (key, qty) => setCart((c) => setLineQty(c, key, qty)),
      clearCart: () => setCart(EMPTY_CART),
      openProduct: (merchant, product) => setSheet({ merchant, product }),
      cartOpen,
      setCartOpen,
      address,
      setAddress,
      ready,
    }),
    [cart, add, cartOpen, address, setAddress, ready],
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
      {sheet && (
        <ProductSheet
          merchant={sheet.merchant}
          product={sheet.product}
          onClose={() => setSheet(null)}
          onAdd={(line) => {
            add(sheet.merchant, line);
            setSheet(null);
          }}
        />
      )}
      {pending && (
        <ReplaceCartDialog
          currentStore={cart.merchant?.name ?? 'another store'}
          nextStore={pending.merchant.name}
          onCancel={() => setPending(null)}
          onConfirm={() => {
            setCart(addLine(EMPTY_CART, pending.merchant, pending.line));
            setPending(null);
          }}
        />
      )}
    </ShopContext.Provider>
  );
}

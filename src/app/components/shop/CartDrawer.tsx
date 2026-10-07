'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { formatNaira } from '@/lib/format';
import { lineUnitPrice } from '@/lib/shop/cart';
import { Modal } from './Modal';
import { ProductImage } from './ProductImage';
import { useShop } from './ShopProvider';

/** Slide-in cart from the header's Cart button and the floating cart bar. */
export function CartDrawer() {
  const shop = useShop();
  const router = useRouter();
  if (!shop.cartOpen) return null;
  const close = () => shop.setCartOpen(false);
  const { cart } = shop;

  return (
    <Modal onClose={close} label="Your cart" variant="drawer" width={460}>
      <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'inset 0 -1px 0 var(--line)' }}>
        <span className="v-display" style={{ fontSize: 40, lineHeight: 1 }}>Your cart</span>
        <button type="button" className="v-icon-btn" onClick={close} aria-label="Close cart">✕</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 24px' }}>
        {!cart.merchant ? (
          <div style={{ padding: '56px 0', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Nothing here yet</span>
            <span style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.5 }}>Add something from any store to start an order.</span>
            <Link href="/marketplace" onClick={close} className="v-btn v-btn--ink v-btn--md" style={{ marginTop: 8 }}>
              Browse stores
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '18px 0' }}>
            <Link href={`/merchant/${cart.merchant.id}`} onClick={close} style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', paddingBottom: 6 }}>
              {cart.merchant.name}
            </Link>
            {cart.lines.map((l) => (
              <div key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0' }}>
                <ProductImage src={l.image} name={l.name} glyphSize={22} style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{l.name}</span>
                  {l.variants.length > 0 && (
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{l.variants.map((v) => v.name).join(', ')}</span>
                  )}
                  <span className="v-num" style={{ fontSize: 14, fontWeight: 600 }}>{formatNaira(l.qty * lineUnitPrice(l))}</span>
                </div>
                <div className="v-qty v-qty--outline">
                  <button type="button" aria-label={`Remove one ${l.name}`} onClick={() => shop.setQty(l.key, l.qty - 1)}>−</button>
                  <span>{l.qty}</span>
                  <button type="button" aria-label={`Add another ${l.name}`} onClick={() => shop.setQty(l.key, l.qty + 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cart.merchant && (
        <div style={{ padding: '18px 24px 24px', boxShadow: 'inset 0 1px 0 var(--line)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Row label="Subtotal" value={formatNaira(shop.subtotal)} />
          <Row label="Delivery and service" value="At checkout" />
          <button
            type="button"
            className="v-btn v-btn--blue v-btn--xl v-btn--block"
            style={{ justifyContent: 'space-between', padding: '0 10px 0 26px' }}
            onClick={() => {
              close();
              router.push('/checkout');
            }}
          >
            <span>Checkout</span>
            <span className="v-num" style={{ height: 40, borderRadius: 999, background: 'rgba(255,255,255,.2)', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
              {formatNaira(shop.subtotal)}
            </span>
          </button>
        </div>
      )}
    </Modal>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 15, color: 'var(--muted)' }}>{label}</span>
      <span className="v-num" style={{ fontSize: 15 }}>{value}</span>
    </div>
  );
}

/** "View cart · 3" pill that floats over the marketplace and store pages. */
export function CartBar() {
  const shop = useShop();
  const path = usePathname();
  const shows = path === '/marketplace' || path?.startsWith('/merchant/');
  if (!shows || !shop.ready || shop.count === 0 || shop.cartOpen) return null;
  return (
    <button
      type="button"
      onClick={() => shop.setCartOpen(true)}
      className="v-fade"
      style={{
        position: 'fixed',
        left: 12,
        right: 12,
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        maxWidth: 520,
        margin: '0 auto',
        zIndex: 45,
        height: 60,
        border: 0,
        borderRadius: 999,
        background: 'var(--ink)',
        color: '#fff',
        padding: '0 8px 0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        cursor: 'pointer',
        boxShadow: '0 20px 40px rgba(12,18,22,.3)',
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap' }}>View cart · {shop.count}</span>
      <span className="v-num" style={{ height: 42, borderRadius: 999, background: 'var(--blue)', padding: '0 18px', display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>
        {formatNaira(shop.subtotal)}
      </span>
    </button>
  );
}

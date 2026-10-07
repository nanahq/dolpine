'use client';

import React, { useMemo, useState } from 'react';
import { formatNaira } from '@/lib/format';
import { lineFor, lineUnitPrice, type CartLine, type CartVariant } from '@/lib/shop/cart';
import type { ShopMerchant, ShopProduct, ShopVariant } from '@/lib/shop/catalog';
import { Modal } from './Modal';
import { ProductImage } from './ProductImage';

type Props = {
  merchant: ShopMerchant;
  product: ShopProduct;
  onClose: () => void;
  onAdd: (line: CartLine) => void;
};

/**
 * Options for a product with variants. Mirrors the app's ProductModal: a group
 * with any required option is pick-exactly-one, every other group is
 * pick-any.
 */
export function ProductSheet({ merchant, product, onClose, onAdd }: Props) {
  const groups = useMemo(() => {
    const map = new Map<string, ShopVariant[]>();
    for (const v of product.variants) map.set(v.group, [...(map.get(v.group) ?? []), v]);
    return Array.from(map.entries()).map(([name, options]) => ({ name, options, required: options.some((o) => o.required) }));
  }, [product.variants]);

  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [qty, setQty] = useState(1);
  const [tried, setTried] = useState(false);

  const chosen: CartVariant[] = groups.flatMap((g) =>
    (picked[g.name] ?? []).map((id) => {
      const v = g.options.find((o) => o.id === id)!;
      return { id: v.id, name: v.name, group: g.name, priceModifier: v.priceModifier };
    }),
  );
  const missing = groups.filter((g) => g.required && !(picked[g.name] ?? []).length);
  const unit = lineUnitPrice({ basePrice: product.basePrice, salePrice: product.salePrice, variants: chosen });

  function toggle(group: { name: string; required: boolean }, id: string) {
    setPicked((prev) => {
      if (group.required) return { ...prev, [group.name]: [id] };
      const cur = prev[group.name] ?? [];
      return { ...prev, [group.name]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
    });
  }

  return (
    <Modal onClose={onClose} label={product.name} variant="sheet" width={560}>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <div style={{ position: 'relative' }}>
          <ProductImage src={product.image} name={product.name} style={{ aspectRatio: '16/9', borderRadius: 0 }} glyphSize={96} />
          <button type="button" className="v-icon-btn" onClick={onClose} aria-label="Close" style={{ position: 'absolute', right: 16, top: 16, background: '#fff' }}>
            ✕
          </button>
        </div>
        <div style={{ padding: '22px 24px 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className="v-h3" style={{ fontSize: 28 }}>{product.name}</span>
          {product.description && <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{product.description}</span>}
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>From {merchant.name}</span>
        </div>
        {groups.map((g) => {
          const showErr = tried && missing.includes(g);
          return (
            <fieldset key={g.name} style={{ border: 0, margin: 0, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <legend style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 0, marginBottom: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 600 }}>{g.name.replace(/[_§]/g, ' ').trim()}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: showErr ? 'var(--danger)' : 'var(--muted)' }}>
                  {g.required ? 'Pick one · required' : 'Optional'}
                </span>
              </legend>
              {g.options.map((o) => {
                const on = (picked[g.name] ?? []).includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => toggle(g, o.id)}
                    aria-pressed={on}
                    style={{
                      border: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: 14,
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      background: on ? 'var(--blue-tint)' : '#fff',
                      boxShadow: on ? 'inset 0 0 0 2px var(--blue)' : 'inset 0 0 0 1px var(--line)',
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: g.required ? 999 : 6,
                        flexShrink: 0,
                        boxShadow: on ? `inset 0 0 0 ${g.required ? 6 : 10}px var(--blue)` : 'inset 0 0 0 1.5px var(--line-strong)',
                      }}
                    />
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{o.name}</span>
                    {o.priceModifier > 0 && <span className="v-num" style={{ fontSize: 14, color: 'var(--muted)' }}>+{formatNaira(o.priceModifier)}</span>}
                  </button>
                );
              })}
            </fieldset>
          );
        })}
      </div>
      <div style={{ padding: '14px clamp(16px,4vw,24px) max(22px, env(safe-area-inset-bottom))', boxShadow: 'inset 0 1px 0 var(--line)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div className="v-qty v-qty--outline" style={{ flexShrink: 0 }}>
          <button type="button" aria-label="Fewer" onClick={() => setQty((n) => Math.max(1, n - 1))}>−</button>
          <span>{qty}</span>
          <button type="button" aria-label="More" onClick={() => setQty((n) => n + 1)}>+</button>
        </div>
        <button
          type="button"
          className="v-btn v-btn--blue"
          // Fills what the stepper leaves; .v-btn alone won't shrink, which pushed it off narrow screens.
          style={{ flex: '1 1 0', minWidth: 0, flexShrink: 1, justifyContent: 'space-between', gap: 8, padding: '0 8px 0 18px' }}
          disabled={!merchant.isOpen}
          onClick={() => {
            if (missing.length) return setTried(true);
            onAdd(lineFor(product, chosen, qty));
          }}
        >
          <span>{merchant.isOpen ? 'Add to cart' : 'Store closed'}</span>
          <span className="v-num" style={{ height: 36, borderRadius: 999, background: 'rgba(255,255,255,.2)', padding: '0 12px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {formatNaira(unit * qty)}
          </span>
        </button>
      </div>
    </Modal>
  );
}

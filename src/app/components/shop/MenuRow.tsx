import React from 'react';
import { formatNaira } from '@/lib/format';
import { unitPrice, type ShopMerchant, type ShopProduct } from '@/lib/shop/catalog';
import { ProductImage } from './ProductImage';
import { AddControl } from './AddControl';

/** A dish or item on a store page: text on the left, photo with the add control on the right. */
export function MenuRow({ product, merchant }: { product: ShopProduct; merchant: ShopMerchant }) {
  return (
    <div
      className="v-row-hover"
      style={{ display: 'flex', gap: 16, borderRadius: 20, background: '#fff', boxShadow: 'inset 0 0 0 1px var(--line)', padding: 16 }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{product.name}</span>
        {product.description && (
          <span
            style={{
              fontSize: 14,
              color: 'var(--muted)',
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </span>
        )}
        <span className="v-num" style={{ marginTop: 'auto', fontSize: 15, fontWeight: 600, color: 'var(--blue-ink)', display: 'flex', gap: 8, alignItems: 'baseline' }}>
          {product.variants.length ? 'From ' : ''}
          {formatNaira(unitPrice(product))}
          {product.salePrice != null && (
            <s style={{ fontSize: 13, fontWeight: 500, color: 'var(--subtle)' }}>{formatNaira(product.basePrice)}</s>
          )}
        </span>
      </div>
      <ProductImage
        src={product.image}
        name={product.name}
        glyphSize={48}
        style={{ width: 'clamp(92px,26vw,112px)', height: 'clamp(92px,26vw,112px)', borderRadius: 14, flexShrink: 0 }}
      >
        <AddControl merchant={merchant} product={product} />
      </ProductImage>
    </div>
  );
}

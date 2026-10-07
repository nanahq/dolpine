import React from 'react';
import Link from 'next/link';
import { formatNaira } from '@/lib/format';
import { unitPrice, type ShopMerchant, type ShopProduct } from '@/lib/shop/catalog';
import { ProductImage } from './ProductImage';
import { AddControl } from './AddControl';

type Props = {
  product: ShopProduct;
  merchant: ShopMerchant;
  width?: string;
};

/** Square product tile used for "Popular dishes" and search hits on the marketplace. */
export function ProductTile({ product, merchant, width }: Props) {
  return (
    <div className="v-rise" style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0, width, animationDuration: '.5s' }}>
      <ProductImage src={product.image} name={product.name} style={{ aspectRatio: '1/1' }}>
        <AddControl merchant={merchant} product={product} />
      </ProductImage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{product.name}</span>
        <Link href={`/merchant/${merchant.id}`} style={{ fontSize: 13, color: 'var(--muted)' }}>
          {merchant.name}
        </Link>
        <span className="v-num" style={{ fontSize: 15, fontWeight: 600, color: 'var(--blue-ink)' }}>
          {product.variants.length ? 'From ' : ''}
          {formatNaira(unitPrice(product))}
        </span>
      </div>
    </div>
  );
}

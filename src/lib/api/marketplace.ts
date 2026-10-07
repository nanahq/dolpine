import { apiGet } from './config';
import { getAllMerchants, getMerchant } from './merchants';
import type { ApiAppConstants } from './types';
import { toStoreMenu, type StoreMenu } from '../shop/catalog';

/**
 * Every live store with its full menu. The list endpoint carries no products,
 * so each store's detail is fetched too — fine while the catalogue is a few
 * dozen stores, and cached by ISR. Revisit (a product search endpoint) if the
 * store count grows into the hundreds.
 */
export async function getMarketplace(): Promise<StoreMenu[]> {
  const list = await getAllMerchants();
  const details = await Promise.all(list.map((m) => getMerchant(m.id)));
  return details.filter((d): d is NonNullable<typeof d> => d !== null).map(toStoreMenu);
}

export async function getAppConstants(): Promise<ApiAppConstants | null> {
  return apiGet<ApiAppConstants>('app-constants');
}

import { apiGet } from './config';
import type { ApiMerchant, ApiMerchantDetail } from './types';

/**
 * Every active merchant, whatever the type — restaurants, groceries and
 * convenience stores. Without coordinates the API orders them by rating.
 */
export async function getAllMerchants(limit = 500): Promise<ApiMerchant[]> {
  const data = await apiGet<ApiMerchant[]>('merchant/customers', {
    query: { limit },
  });
  return data ?? [];
}

/** Full store detail including the menu (categories → products → variants). */
export async function getMerchant(id: string): Promise<ApiMerchantDetail | null> {
  return apiGet<ApiMerchantDetail>(`merchant/customers/${id}`);
}

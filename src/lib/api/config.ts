/**
 * Server-side data access for the Nana marketing site.
 *
 * All marketing content (restaurants, menus, reviews) is fetched from the
 * nana-v2 public customer endpoints (`/merchant/customers*`, `/review/*`).
 * These run on the server (React Server Components) and are cached with ISR.
 */

export const API_BASE =
  process.env.NANA_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'https://api.trynanaapp.com/api/v1';

/** Default ISR window for public content, in seconds. */
export const DEFAULT_REVALIDATE = 300;

/**
 * Typed GET against the Nana API. Returns `null` on any failure (network,
 * non-2xx, bad JSON) so pages can fall back to static content instead of
 * throwing — the marketing site must always render, even if the API is down
 * or unreachable at build time.
 */
export async function apiGet<T>(
  path: string,
  opts: { revalidate?: number | false; query?: Record<string, string | number | boolean | undefined> } = {},
): Promise<T | null> {
  const { revalidate = DEFAULT_REVALIDATE, query } = opts;

  const url = new URL(`${API_BASE}/${path.replace(/^\//, '')}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  try {
    const res = await fetch(url.toString(), {
      headers: { accept: 'application/json' },
      next: revalidate === false ? { revalidate: 0 } : { revalidate },
    });
    if (!res.ok) {
      console.warn(`[nana-api] ${res.status} for ${url.pathname}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[nana-api] request failed for ${url.pathname}:`, err);
    return null;
  }
}

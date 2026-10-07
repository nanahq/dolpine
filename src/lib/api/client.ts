/**
 * Browser-side calls to the Nana API — checkout, sign-in, address search.
 * Server components keep using `apiGet` from `./config`, which swallows errors;
 * here the caller needs the server's message to show the customer.
 */

export const CLIENT_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.trynanaapp.com/api/v1';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

type Options = {
  method?: 'GET' | 'POST' | 'PATCH';
  body?: unknown;
  token?: string | null;
  query?: Record<string, string | number | undefined>;
  signal?: AbortSignal;
};

/** NestJS puts the reason in `message`, as a string or a list of validation errors. */
function messageFrom(payload: unknown, status: number): string {
  const m = (payload as { message?: unknown } | null)?.message;
  if (Array.isArray(m) && m.length) return String(m[0]);
  if (typeof m === 'string' && m) return m;
  return status >= 500 ? 'Something went wrong on our side. Please try again.' : 'That request could not be completed.';
}

export async function api<T>(path: string, opts: Options = {}): Promise<T> {
  const url = new URL(`${CLIENT_API_BASE}/${path.replace(/^\//, '')}`);
  for (const [k, v] of Object.entries(opts.query ?? {})) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: opts.method ?? 'GET',
      headers: {
        accept: 'application/json',
        ...(opts.body !== undefined ? { 'content-type': 'application/json' } : {}),
        ...(opts.token ? { authorization: `Bearer ${opts.token}` } : {}),
      },
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
      cache: 'no-store',
    });
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    throw new ApiError('No connection. Check your internet and try again.', 0);
  }

  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(messageFrom(payload, res.status), res.status);
  return payload as T;
}

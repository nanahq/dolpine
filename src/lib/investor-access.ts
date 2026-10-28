import { createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Password gate for /investors/metrics. Server-only: the password never reaches the
 * browser, and the numbers are fetched server-side after the cookie checks out.
 *
 * The same password is what nana-v2's InvestorKeyGuard expects in `x-investor-key`.
 * The cookie holds a hash of it, so changing it signs everyone out.
 */
export const INVESTOR_PASSWORD = 'INVESTORS@NANA';

export const INVESTOR_COOKIE = 'nana_investor';
export const INVESTOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 14;

function accessToken(): string {
  return createHash('sha256').update(`nana-investor:${INVESTOR_PASSWORD}`).digest('hex');
}

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function passwordMatches(given: string): boolean {
  return same(given, INVESTOR_PASSWORD);
}

export function issueToken(): string {
  return accessToken();
}

export function hasInvestorAccess(): boolean {
  const given = cookies().get(INVESTOR_COOKIE)?.value;
  return !!given && same(given, accessToken());
}

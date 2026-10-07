import { readJson, writeJson } from '../storage';

/**
 * A customer signed in on the website by phone OTP. Same account as the app:
 * the API finds-or-creates the user by phone number.
 */
export interface WebSession {
  token: string;
  userId: string;
  /** E.164, as verified. */
  phone: string;
  email: string | null;
  fullName: string | null;
}

const KEY = 'nana_web_session_v1';

/** JWT `exp` in ms, or 0 when it can't be read. The token is not verified here — the API does that. */
function expiry(token: string): number {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export function loadSession(): WebSession | null {
  const s = readJson<WebSession>(KEY);
  // A minute of slack so a token doesn't expire between check and use.
  if (!s || expiry(s.token) < Date.now() + 60_000) return null;
  return s;
}

export function saveSession(s: WebSession | null): void {
  writeJson(KEY, s);
}

/** What a card checkout needs after the gateway sends the customer back. */
export interface PendingCardOrder {
  orderId: string;
  orderNumber: string | null;
  total: number;
  phone: string;
}

const PENDING_KEY = 'nana_web_pending_card_v1';

export function savePendingCard(p: PendingCardOrder | null): void {
  writeJson(PENDING_KEY, p);
}

export function loadPendingCard(): PendingCardOrder | null {
  return readJson<PendingCardOrder>(PENDING_KEY);
}

import type { ApiOperatingHour } from './api/types';

/** ₦4,500 from 4500 / "4500.00". Returns "" for nullish/NaN. */
export function formatNaira(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const n = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(n)) return '';
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

/** "15–25 min" — a friendly window derived from the merchant's prep time. */
export function formatPrepWindow(prepMinutes: number | null | undefined): string {
  const base = prepMinutes && prepMinutes > 0 ? prepMinutes : 25;
  const low = Math.max(10, base - 5);
  const high = base + 10;
  return `${low}–${high} min`;
}

/** "₦500 delivery" */
export function formatDeliveryFee(fee: string | number | null | undefined): string {
  const f = formatNaira(fee);
  return f ? `${f} delivery` : 'Delivery fee at checkout';
}

/** One decimal place for a rating, e.g. 4.8. Falls back to "New". */
export function formatRating(rating: number | null | undefined): string {
  if (!rating || rating <= 0) return 'New';
  return rating.toFixed(1);
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** "Open until 11:00 pm" / "Closed" from today's operating hours + open flag. */
export function openStatusLabel(
  isOpen: boolean,
  hours: ApiOperatingHour[] | undefined,
): string {
  if (!isOpen) return 'Closed';
  const today = hours?.find((h) => h.day_of_week === new Date().getDay());
  if (today && !today.is_closed && today.close_time) {
    return `Open until ${to12h(today.close_time)}`;
  }
  return 'Open now';
}

/** "Daily, 9:00 am – 11:00 pm" summary, best-effort from the week's hours. */
export function hoursSummary(hours: ApiOperatingHour[] | undefined): string {
  const open = hours?.filter((h) => !h.is_closed && h.open_time && h.close_time);
  if (!open || open.length === 0) return 'Hours vary';
  const first = open[0];
  const sameEveryDay = open.every(
    (h) => h.open_time === first.open_time && h.close_time === first.close_time,
  );
  const range = `${to12h(first.open_time!)} – ${to12h(first.close_time!)}`;
  if (sameEveryDay && open.length >= 6) return `Daily, ${range}`;
  return `${DAYS[first.day_of_week]}–${DAYS[open[open.length - 1].day_of_week]}, ${range}`;
}

function to12h(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr ?? '00';
  const suffix = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${h}:${m} ${suffix}`;
}

/** "2 days ago" from an ISO timestamp. */
export function relativeTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return '1 week ago';
  if (weeks < 5) return `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  return months <= 1 ? '1 month ago' : `${months} months ago`;
}

/** "Ibrahim M." → keep as-is; nullish → "Nana customer". */
export function displayName(name: string | null | undefined): string {
  return name?.trim() || 'Nana customer';
}

/** Normalise image URLs: empty strings/whitespace become null (→ placeholder). */
export function cleanImageUrl(url: string | null | undefined): string | null {
  return url && url.trim() ? url.trim() : null;
}

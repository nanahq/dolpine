const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** ₦2.5M / ₦840k / ₦950 — compact naira for tiles and tooltips. */
export function naira(n: number): string {
  const sign = n < 0 ? '−' : '';
  const a = Math.abs(n);
  if (a >= 1_000_000) return `${sign}₦${(a / 1_000_000).toFixed(a >= 10_000_000 ? 1 : 2)}M`;
  if (a >= 10_000) return `${sign}₦${Math.round(a / 1000)}k`;
  return `${sign}₦${Math.round(a).toLocaleString('en-NG')}`;
}

export function int(n: number): string {
  return Math.round(n).toLocaleString('en-NG');
}

export function pct(n: number, digits = 0): string {
  return `${n.toFixed(digits)}%`;
}

/** "2026-10" → "Oct 26" */
export function monthLabel(period: string): string {
  const [y, m] = period.split('-');
  return `${MONTHS[Number(m) - 1]} ${y.slice(2)}`;
}

/** "2026-10-19" → "19 Oct" */
export function dayLabel(date: string): string {
  const [, m, d] = date.split('-');
  return `${Number(d)} ${MONTHS[Number(m) - 1]}`;
}

/** Month-on-month change as "+42%" / "−8%", or "" with no base. */
export function change(prev: number | undefined, cur: number): string {
  if (!prev) return '';
  const c = ((cur - prev) / Math.abs(prev)) * 100;
  return `${c >= 0 ? '+' : '−'}${Math.abs(c).toFixed(0)}%`;
}

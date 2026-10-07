/**
 * localStorage that never throws: private windows, blocked site data and
 * full quotas all degrade to "nothing saved" rather than a broken page.
 */

export function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    if (value === null || value === undefined) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Not persisted; the in-memory state still works for this visit.
  }
}

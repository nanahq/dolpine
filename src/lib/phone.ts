/**
 * Nigerian mobile numbers as typed by people: "0803 412 5590", "8034125590",
 * "+234 803 412 5590". The API wants E.164 (`+2348034125590`).
 */

function nationalDigits(input: string): string | null {
  let d = input.replace(/\D/g, '');
  if (d.startsWith('234')) d = d.slice(3);
  if (d.startsWith('0')) d = d.slice(1);
  return d.length === 10 ? d : null;
}

export function isValidNgPhone(input: string): boolean {
  return nationalDigits(input) !== null;
}

/** `+2348034125590`, or null when the number isn't a valid Nigerian mobile. */
export function toE164(input: string): string | null {
  const d = nationalDigits(input);
  return d ? `+234${d}` : null;
}

/** `+234 803 412 5590` for display. */
export function formatNgPhone(input: string): string {
  const d = nationalDigits(input);
  if (!d) return input;
  return `+234 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
}

export function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.trim());
}

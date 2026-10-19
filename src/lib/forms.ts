import type { FormAnswers, FormField } from './api/forms';
import { isValidEmail, isValidNgPhone, toE164 } from './phone';

export type DraftValue = string | boolean | string[] | undefined;
export type Draft = Record<string, DraftValue>;

const DEFAULT_MAX_LENGTH = { short_text: 500, long_text: 5000 } as const;

export function maxLengthOf(field: FormField): number {
  return field.max_length ?? (field.type === 'long_text' ? DEFAULT_MAX_LENGTH.long_text : DEFAULT_MAX_LENGTH.short_text);
}

function isBlank(v: DraftValue): boolean {
  return v === undefined || v === false || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);
}

/**
 * Mirrors the server's checks in nana-v2 `form-fields.ts` so most mistakes are
 * caught before sending. The server stays the authority; its messages replace
 * these when it disagrees.
 */
export function checkField(field: FormField, v: DraftValue): string {
  if (isBlank(v)) {
    if (!field.required) return '';
    if (field.type === 'checkbox') return 'Please tick this box to continue';
    if (field.type === 'select') return 'Choose an option';
    if (field.type === 'multi_select') return 'Choose at least one';
    return 'This field is required';
  }

  switch (field.type) {
    case 'email':
      return isValidEmail(String(v)) ? '' : 'Enter a valid email address';
    case 'phone':
      return isValidNgPhone(String(v)) ? '' : 'Enter a valid Nigerian mobile number';
    case 'short_text':
    case 'long_text': {
      const len = String(v).trim().length;
      const max = maxLengthOf(field);
      if (field.min_length && len < field.min_length) return `At least ${field.min_length} characters`;
      if (len > max) return `Up to ${max.toLocaleString()} characters`;
      return '';
    }
    case 'number': {
      const n = Number(v);
      if (!Number.isFinite(n)) return 'Enter a number';
      if (field.min != null && n < field.min) return `Minimum ${field.min.toLocaleString()}`;
      if (field.max != null && n > field.max) return `Maximum ${field.max.toLocaleString()}`;
      return '';
    }
    case 'multi_select': {
      const count = (v as string[]).length;
      if (field.min && count < field.min) return `Choose at least ${field.min}`;
      if (field.max && count > field.max) return `Choose up to ${field.max}`;
      return '';
    }
    default:
      return '';
  }
}

/** The request body's `answers`: blanks dropped, phones in E.164, numbers as numbers. */
export function toAnswers(fields: FormField[], draft: Draft): FormAnswers {
  const answers: FormAnswers = {};
  for (const field of fields) {
    const v = draft[field.key];
    if (isBlank(v)) continue;
    if (field.type === 'phone') answers[field.key] = toE164(String(v)) ?? String(v);
    else if (field.type === 'number') answers[field.key] = Number(v);
    else if (typeof v === 'string') answers[field.key] = v.trim();
    else answers[field.key] = v as boolean | string[];
  }
  return answers;
}

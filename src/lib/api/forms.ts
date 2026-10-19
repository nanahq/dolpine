import { apiGet } from './config';
import { api, ApiError } from './client';

/** Mirrors `form_field` in nana-v2 (FORMS_PRD.md). */
export type FormFieldType =
  | 'short_text'
  | 'long_text'
  | 'email'
  | 'phone'
  | 'number'
  | 'date'
  | 'select'
  | 'multi_select'
  | 'checkbox';

export interface FormField {
  key: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  help_text?: string;
  options?: { value: string; label: string }[];
  min_length?: number;
  max_length?: number;
  min?: number;
  max?: number;
}

/** What the public endpoints return — published or closed forms only. */
export interface PublicForm {
  id: string;
  slug: string;
  page_path: string | null;
  title: string;
  description: string | null;
  fields: FormField[];
  submit_label: string | null;
  success_message: string | null;
  closed_message: string | null;
  status: 'published' | 'closed';
}

export type FormAnswers = Record<string, string | number | boolean | string[]>;

/** PRD rule 9: a publish, close or edit is live within a minute. */
const FORM_REVALIDATE = 60;

export function getFormBySlug(slug: string): Promise<PublicForm | null> {
  return apiGet<PublicForm>(`/forms/${encodeURIComponent(slug)}`, { revalidate: FORM_REVALIDATE });
}

/** The form an admin attached to a dolpine pathname, or null when there is none. */
export function getFormByPath(path: string): Promise<PublicForm | null> {
  return apiGet<PublicForm>('/forms/by-path', { revalidate: FORM_REVALIDATE, query: { path } });
}

export type SubmitResult =
  | { ok: true; successMessage: string }
  | { ok: false; kind: 'fields'; errors: Record<string, string> }
  | { ok: false; kind: 'rate_limited' }
  | { ok: false; kind: 'closed' | 'error'; message: string };

/** Browser-side submit. Turns the API's error shapes into states the form can render. */
export async function submitForm(
  slug: string,
  body: { answers: FormAnswers; source_path?: string; website?: string },
): Promise<SubmitResult> {
  try {
    const res = await api<{ success_message: string }>(`/forms/${encodeURIComponent(slug)}/submissions`, {
      method: 'POST',
      body,
    });
    return { ok: true, successMessage: res.success_message };
  } catch (err) {
    if (!(err instanceof ApiError)) throw err;
    if (err.status === 429) return { ok: false, kind: 'rate_limited' };
    if (err.status === 409) return { ok: false, kind: 'closed', message: err.message };
    const errors = (err.payload as { errors?: Record<string, string> } | null)?.errors;
    if (err.status === 400 && errors) return { ok: false, kind: 'fields', errors };
    return { ok: false, kind: 'error', message: err.message };
  }
}

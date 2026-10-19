'use client';

import React, { useRef, useState } from 'react';
import { submitForm, type PublicForm } from '@/lib/api/forms';
import { checkField, toAnswers, type Draft, type DraftValue } from '@/lib/forms';
import { track } from '@/lib/analytics';
import { FormFieldInput } from './FormFieldInput';

const DEFAULT_SUCCESS = 'Thanks, we’ve received your submission.';
const DEFAULT_CLOSED = 'This form is no longer accepting responses.';

type Banner = { kind: 'rate' } | { kind: 'error'; message: string } | null;

type Props = {
  form: PublicForm;
  /** Title + description inside the card — on for embeds, off on /forms/[slug] where the hero carries them. */
  showHeader?: boolean;
  /** The pathname the visitor submitted from, stored with the submission. */
  sourcePath: string;
};

/** Renders an admin-built form and submits it (FORMS_PRD.md §B). */
export function NanaForm({ form, showHeader = false, sourcePath }: Props) {
  const [draft, setDraft] = useState<Draft>({});
  const [tried, setTried] = useState(false);
  const [serverErrs, setServerErrs] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [closed, setClosed] = useState<string | null>(form.status === 'closed' ? form.closed_message || DEFAULT_CLOSED : null);
  const [banner, setBanner] = useState<Banner>(null);
  const [honey, setHoney] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const errorOf = (key: string) => {
    const field = form.fields.find((f) => f.key === key)!;
    return serverErrs[key] || (tried ? checkField(field, draft[key]) : '');
  };
  const badCount = form.fields.filter((f) => errorOf(f.key)).length;

  const set = (key: string, value: DraftValue) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setServerErrs((e) => ({ ...e, [key]: '' }));
  };

  const scrollToFirstError = () =>
    requestAnimationFrame(() =>
      rootRef.current?.querySelector('[data-field-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    );

  const submit = async () => {
    if (sending) return;
    setBanner(null);
    if (form.fields.some((f) => checkField(f, draft[f.key]))) {
      setTried(true);
      scrollToFirstError();
      return;
    }

    setSending(true);
    const result = await submitForm(form.slug, {
      answers: toAnswers(form.fields, draft),
      source_path: sourcePath,
      ...(honey && { website: honey }),
    }).catch(() => ({ ok: false as const, kind: 'error' as const, message: 'Something went wrong. Please try again.' }));
    setSending(false);

    if (result.ok) {
      track('form_submitted', { slug: form.slug });
      setDone(result.successMessage || form.success_message || DEFAULT_SUCCESS);
      return;
    }

    track('form_submit_failed', { slug: form.slug, reason: result.kind });
    if (result.kind === 'fields') {
      setTried(true);
      setServerErrs(result.errors);
      scrollToFirstError();
    } else if (result.kind === 'rate_limited') {
      setBanner({ kind: 'rate' });
    } else if (result.kind === 'closed') {
      setClosed(result.message || form.closed_message || DEFAULT_CLOSED);
    } else {
      setBanner({ kind: 'error', message: result.message });
    }
  };

  return (
    <div ref={rootRef} style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'relative' }}>
      {showHeader && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.2 }}>{form.title}</h2>
          {form.description && (
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--muted)', whiteSpace: 'pre-line' }}>{form.description}</p>
          )}
        </div>
      )}

      {closed ? (
        <div style={{ borderRadius: 18, background: 'var(--fill)', padding: 22, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ height: 28, borderRadius: 999, background: 'var(--ink)', color: '#fff', padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 600 }}>
            Closed
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-.015em', lineHeight: 1.4 }}>{closed}</span>
        </div>
      ) : done ? (
        <div role="status" className="v-form-done">
          <div className="v-form-done__tick" aria-hidden="true">✓</div>
          <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.015em', lineHeight: 1.4 }}>{done}</span>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
        >
          {banner?.kind === 'rate' && (
            <div role="alert" className="v-form-banner v-form-banner--warn">Too many attempts, try again in a minute.</div>
          )}
          {banner?.kind === 'error' && (
            <div role="alert" className="v-form-banner v-form-banner--danger">{banner.message}</div>
          )}
          {badCount > 0 && (
            <div role="alert" className="v-form-banner v-form-banner--danger">
              {badCount === 1 ? '1 answer needs a look before you send.' : `${badCount} answers need a look before you send.`}
            </div>
          )}

          {form.fields.map((field) => (
            <FormFieldInput
              key={field.key}
              id={`f-${form.slug}-${field.key}`}
              field={field}
              value={draft[field.key]}
              error={errorOf(field.key)}
              onChange={(v) => set(field.key, v)}
            />
          ))}

          {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
          />

          <button type="submit" disabled={sending} className="v-btn v-btn--blue v-btn--lg v-btn--block" style={{ fontSize: 17 }}>
            {sending ? (
              <>
                <span className="v-spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              form.submit_label || 'Submit'
            )}
          </button>
        </form>
      )}
    </div>
  );
}

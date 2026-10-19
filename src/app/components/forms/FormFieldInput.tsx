'use client';

import React from 'react';
import type { FormField } from '@/lib/api/forms';
import { maxLengthOf, type DraftValue } from '@/lib/forms';

type Props = {
  field: FormField;
  id: string;
  value: DraftValue;
  error: string;
  onChange: (value: DraftValue) => void;
};

const INPUT_TYPE: Partial<Record<FormField['type'], string>> = {
  short_text: 'text',
  email: 'email',
  number: 'number',
  date: 'date',
};

/** One field: label, help, the control for its type, and its error. */
export function FormFieldInput({ field, id, value, error, onChange }: Props) {
  const errId = `${id}-err`;
  const described = error ? errId : undefined;
  const text = typeof value === 'string' ? value : '';
  const picked = Array.isArray(value) ? value : [];

  return (
    <div className="v-field" data-field-error={error ? 'true' : undefined}>
      {field.type !== 'checkbox' && (
        <label htmlFor={id} className="v-label" style={{ fontSize: 15 }}>
          {field.label}
          {!field.required && <small> · optional</small>}
        </label>
      )}
      {field.help_text && (
        <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.45, marginTop: -2 }}>{field.help_text}</span>
      )}

      {INPUT_TYPE[field.type] && (
        <input
          id={id}
          className={`v-input${error ? ' is-error' : ''}`}
          type={INPUT_TYPE[field.type]}
          inputMode={field.type === 'number' ? 'numeric' : field.type === 'email' ? 'email' : undefined}
          autoComplete={field.type === 'email' ? 'email' : undefined}
          value={text}
          placeholder={field.placeholder}
          aria-invalid={!!error}
          aria-describedby={described}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === 'phone' && (
        <div className={`v-phone${error ? ' is-error' : ''}`}>
          <span>+234</span>
          <input
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={text}
            placeholder={field.placeholder}
            aria-invalid={!!error}
            aria-describedby={described}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}

      {field.type === 'long_text' && (
        <>
          <textarea
            id={id}
            className={`v-input${error ? ' is-error' : ''}`}
            rows={4}
            value={text}
            placeholder={field.placeholder}
            aria-invalid={!!error}
            aria-describedby={described}
            onChange={(e) => onChange(e.target.value)}
            style={{ lineHeight: 1.5 }}
          />
          <span style={{ fontSize: 12, color: 'var(--subtle)', alignSelf: 'flex-end', fontVariantNumeric: 'tabular-nums' }}>
            {text.length} / {maxLengthOf(field).toLocaleString()}
          </span>
        </>
      )}

      {field.type === 'select' && (
        <div id={id} role="radiogroup" aria-describedby={described} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {field.options?.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={value === o.value}
              className={`v-chip v-chip--lg${value === o.value ? ' is-on' : ''}`}
              onClick={() => onChange(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}

      {field.type === 'multi_select' && (
        <>
          <div id={id} role="group" aria-describedby={described} className="v-choice-list">
            {field.options?.map((o) => {
              const on = picked.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  className="v-choice-row"
                  onClick={() => onChange(on ? picked.filter((x) => x !== o.value) : [...picked, o.value])}
                >
                  <span className={`v-tick${on ? ' is-on' : ''}`} aria-hidden="true">{on && '✓'}</span>
                  <span style={{ fontSize: 16 }}>{o.label}</span>
                </button>
              );
            })}
          </div>
          <span style={{ fontSize: 13, color: 'var(--subtle)' }}>
            {picked.length} selected{field.max ? ` · up to ${field.max}` : ''}
          </span>
        </>
      )}

      {field.type === 'checkbox' && (
        <button
          id={id}
          type="button"
          role="checkbox"
          aria-checked={value === true}
          aria-describedby={described}
          className="v-check"
          onClick={() => onChange(value !== true)}
        >
          <span className={`v-tick v-tick--lg${value === true ? ' is-on' : ''}`} aria-hidden="true">{value === true && '✓'}</span>
          <span style={{ fontSize: 15, lineHeight: 1.5, paddingTop: 1 }}>{field.label}</span>
        </button>
      )}

      {error && (
        <span id={errId} className="v-err" style={{ fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFormBySlug } from '@/lib/api/forms';
import { NanaForm } from '../../components/forms/NanaForm';

/** Matches the API-side form cache window (FORMS_PRD rule 9). */
export const revalidate = 60;

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const form = await getFormBySlug(params.slug);
  if (!form) return { title: 'Form not found', robots: { index: false } };
  return {
    title: form.title,
    description: form.description ?? undefined,
    openGraph: { title: form.title, description: form.description ?? undefined },
  };
}

/** A standalone admin-built form at /forms/<slug> (Nana Form Page.dc.html). */
export default async function FormPage({ params }: Params) {
  const form = await getFormBySlug(params.slug);
  if (!form) notFound();

  return (
    <div style={{ background: 'var(--fill)' }}>
      <section style={{ background: 'var(--blue)' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: 'clamp(40px,7vw,80px) clamp(16px,4vw,32px) clamp(72px,9vw,110px)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h1 className="v-display v-rise" style={{ fontSize: 'clamp(48px,8vw,96px)', color: '#fff', animationDuration: '.7s' }}>
            {form.title}
          </h1>
          {form.description && (
            <p
              className="v-rise"
              style={{ margin: 0, fontSize: 'clamp(16px,1.7vw,19px)', lineHeight: 1.6, color: '#fff', whiteSpace: 'pre-line', maxWidth: 600, animationDuration: '.7s', animationDelay: '.08s' }}
            >
              {form.description}
            </p>
          )}
        </div>
      </section>
      <section style={{ maxWidth: 760, width: '100%', margin: '-48px auto 0', padding: '0 clamp(12px,4vw,32px) 96px', boxSizing: 'border-box' }}>
        <div className="v-form-card v-rise" style={{ borderRadius: 24, padding: 'clamp(20px,4vw,36px)', animationDuration: '.7s', animationDelay: '.14s' }}>
          <NanaForm form={form} sourcePath={`/forms/${form.slug}`} />
        </div>
        <span style={{ display: 'block', fontSize: 13, color: 'var(--subtle)', lineHeight: 1.5, marginTop: 16, textAlign: 'center' }}>
          We only use your answers to reply to this request.
        </span>
      </section>
    </div>
  );
}

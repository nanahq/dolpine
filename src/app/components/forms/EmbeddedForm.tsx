import React from 'react';
import { getFormByPath } from '@/lib/api/forms';
import { NanaForm } from './NanaForm';

type Props = {
  /** This page's own pathname, e.g. "/riders". */
  path: string;
  /** What the page shows when no published or closed form is attached to it. */
  fallback?: React.ReactNode;
};

/**
 * Renders the admin-built form attached to `path` (FORMS_PRD §B2), with its
 * title and description inside the card. With none attached, the page keeps
 * its built-in form, so attaching a form in admin is what switches it over.
 */
export async function EmbeddedForm({ path, fallback = null }: Props) {
  const form = await getFormByPath(path);
  if (!form) return <>{fallback}</>;
  return <NanaForm form={form} showHeader sourcePath={path} />;
}

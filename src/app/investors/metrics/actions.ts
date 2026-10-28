'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  INVESTOR_COOKIE,
  INVESTOR_COOKIE_MAX_AGE,
  issueToken,
  passwordMatches,
} from '@/lib/investor-access';

export type UnlockState = { error: string | null };

export async function unlock(_: UnlockState, form: FormData): Promise<UnlockState> {
  const password = String(form.get('password') ?? '');
  if (!passwordMatches(password)) {
    // Slows guessing without a rate-limit store.
    await new Promise((r) => setTimeout(r, 800));
    return { error: 'That password is not right.' };
  }

  cookies().set(INVESTOR_COOKIE, issueToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/investors/metrics',
    maxAge: INVESTOR_COOKIE_MAX_AGE,
  });
  redirect('/investors/metrics');
}

export async function lock() {
  cookies().delete({ name: INVESTOR_COOKIE, path: '/investors/metrics' });
  redirect('/investors/metrics');
}

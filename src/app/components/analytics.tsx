'use client';

import { PropsWithChildren, useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';

export default function Analytics({ children }: PropsWithChildren) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    if (!token) return;

    posthog.init(token, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '2026-05-30',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug();
      },
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

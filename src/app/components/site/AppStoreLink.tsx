'use client';

import React from 'react';
import { track } from '@/lib/analytics';

type AppStoreLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  platform: 'ios' | 'android';
  /** Where on the site this link sits, e.g. 'header', 'home_app_cta'. */
  placement: string;
};

/**
 * App-store link that reports the click before navigating away. Client-side so
 * it can be dropped into server-rendered pages.
 */
export const AppStoreLink: React.FC<AppStoreLinkProps> = ({
  platform,
  placement,
  onClick,
  children,
  ...rest
}) => (
  <a
    {...rest}
    onClick={(e) => {
      track('app_store_clicked', { platform, placement });
      onClick?.(e);
    }}
  >
    {children}
  </a>
);

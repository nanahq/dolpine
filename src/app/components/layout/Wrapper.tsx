import React, { PropsWithChildren } from 'react';
import { SiteHeader } from '../site/SiteHeader';
import { SiteFooter } from '../site/SiteFooter';
import { ScrollReveal } from '../site/ScrollReveal';
import Analytics from '../analytics';

export const PageWrapper: React.FC<PropsWithChildren<any>> = (props) => {
  return (
    <Analytics>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-sans)',
          background: 'var(--surface-page)',
          color: 'var(--text-body)',
        }}
      >
        <SiteHeader />
        <main style={{ flex: 1 }}>{props.children}</main>
        <SiteFooter />
        <ScrollReveal />
      </div>
    </Analytics>
  );
};

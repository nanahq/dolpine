import React, { PropsWithChildren } from 'react';
import { SiteHeader } from '../site/SiteHeader';
import { SiteFooter } from '../site/SiteFooter';
import { ScrollReveal } from '../site/ScrollReveal';
import { ShopProvider } from '../shop/ShopProvider';
import { CartBar, CartDrawer } from '../shop/CartDrawer';
import Analytics from '../analytics';

export const PageWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Analytics>
      <ShopProvider>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'var(--font-sans)',
            background: '#fff',
            color: 'var(--text)',
            overflowX: 'clip',
          }}
        >
          <SiteHeader />
          <main style={{ flex: 1 }}>{children}</main>
          <SiteFooter />
          <ScrollReveal />
        </div>
        <CartBar />
        <CartDrawer />
      </ShopProvider>
    </Analytics>
  );
};

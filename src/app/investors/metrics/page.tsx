import React from 'react';
import type { Metadata } from 'next';
import { hasInvestorAccess } from '@/lib/investor-access';
import { getInvestorSnapshot } from '@/lib/api/investor-metrics';
import { PasswordGate } from './PasswordGate';
import { Dashboard } from './Dashboard';
import { lock } from './actions';
import './metrics.css';

export const metadata: Metadata = {
  title: 'Investor metrics',
  robots: { index: false, follow: false },
};

// The cookie decides what renders, so this can never be served from a static cache.
export const dynamic = 'force-dynamic';

export default async function InvestorMetricsPage() {
  if (!hasInvestorAccess()) return <PasswordGate />;

  const snapshot = await getInvestorSnapshot();

  return (
    <section className="v-wrap" style={{ paddingTop: 'clamp(40px,6vw,80px)', paddingBottom: 'clamp(64px,8vw,120px)', display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="v-eyebrow" style={{ color: 'var(--blue-ink)' }}>Investors · Confidential</span>
          <h1 className="v-h2">Nana metrics</h1>
          {snapshot && (
            <p className="v-lede" style={{ fontSize: 16 }}>
              Live from Nana&apos;s production ledger and order data, Kano. As of {snapshot.as_of}; refreshed every 10 minutes.
            </p>
          )}
        </div>
        <form action={lock}>
          <button type="submit" className="v-btn v-btn--soft v-btn--sm">Sign out</button>
        </form>
      </div>

      {snapshot ? (
        <Dashboard s={snapshot} />
      ) : (
        <div className="v-form-banner v-form-banner--warn">The numbers could not be loaded just now. Please try again in a few minutes.</div>
      )}
    </section>
  );
}

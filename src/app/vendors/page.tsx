import React from 'react';
import type { Metadata } from 'next';
import { NumberedPoints, PageHero } from '../components/pages/PageParts';
import { VendorForm } from '../components/pages/VendorForm';

export const metadata: Metadata = {
  title: 'Sell on Nana',
  description: 'Reach customers across your city. Nana brings the riders, the app and the payments.',
};

const POINTS = [
  { title: 'More orders, no extra staff', copy: 'Your menu in front of thousands of nearby customers. Nana riders handle delivery.' },
  { title: 'Get paid every week', copy: 'Clear settlement reports and payouts straight to your bank.' },
  { title: 'Grow with promos', copy: 'Run discounts and free-delivery days with our team — we co-fund the best ones.' },
];

export default function VendorsPage() {
  return (
    <>
      <PageHero
        bg="var(--blue)"
        eyebrow="For restaurants and stores"
        title="Sell on Nana"
        lede="Reach customers across your city. We bring the riders, the app and the payments."
      />
      <section className="v-wrap" style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 140, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 48, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <NumberedPoints points={POINTS} numColor="var(--blue)" />
          <div style={{ borderRadius: 24, background: 'var(--fill)', padding: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 600 }}>What happens next</span>
            <span style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)' }}>
              A partner manager calls within two working days, visits your store and helps you set up your menu. Most stores go live within a week.
            </span>
          </div>
        </div>
        <div className="v-form-card" style={{ position: 'sticky', top: 100 }}>
          <VendorForm />
        </div>
      </section>
    </>
  );
}

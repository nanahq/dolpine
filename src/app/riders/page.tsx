import React from 'react';
import type { Metadata } from 'next';
import { NumberedPoints, PageHero } from '../components/pages/PageParts';
import { RiderForm } from '../components/pages/RiderForm';

export const metadata: Metadata = {
  title: 'Ride with Nana',
  description: 'Pick your hours, earn on every delivery and get paid every week.',
};

const POINTS = [
  { title: 'Your schedule', copy: 'Go online when it suits you. No fixed shifts.' },
  { title: 'Weekly pay, plus tips', copy: 'Every naira you earn, paid to your bank every week. Tips are 100% yours.' },
  { title: 'Kit and cover', copy: 'Nana bag, branded gear and accident cover while you’re on a delivery.' },
];

const NEEDS = ['A valid ID and to be 18 or older', 'An Android or iPhone smartphone', 'A motorbike, bicycle or car'];

export default function RidersPage() {
  return (
    <>
      <PageHero bg="var(--yellow)" eyebrow="For riders" title="Ride with Nana" lede="Pick your hours, earn on every delivery and get paid every week." />
      <section className="v-wrap" style={{ paddingTop: 'clamp(56px,7vw,96px)', paddingBottom: 140, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 48, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <NumberedPoints points={POINTS} numColor="var(--ink)" />
          <div style={{ borderRadius: 24, background: 'var(--fill)', padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 600 }}>You’ll need</span>
            <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16 }}>
              {NEEDS.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </div>
        <div className="v-form-card" style={{ position: 'sticky', top: 100 }}>
          <RiderForm />
        </div>
      </section>
    </>
  );
}

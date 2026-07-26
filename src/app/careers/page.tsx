import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Section, Eyebrow, Dot } from '../components/site/primitives';
import { Placeholder } from '../components/site/Placeholder';

export const metadata = { title: 'Careers' };

const ROLES = [
  { title: 'Senior Flutter engineer', meta: 'Engineering · Remote (Nigeria) · Full-time' },
  { title: 'City operations lead', meta: 'Operations · Kano · Full-time' },
  { title: 'Vendor partnerships manager', meta: 'Growth · Kano · Full-time' },
  { title: 'Rider community officer', meta: 'Operations · Kano · Full-time' },
  { title: 'Customer support agent (Hausa & English)', meta: 'Support · Kano · Shift work' },
];

const PERKS = [
  { title: 'Health cover', copy: 'For you and your immediate family, from day one.' },
  { title: 'Learning budget', copy: 'Annual allowance for courses, conferences and books.' },
  { title: 'Nana credit', copy: 'Monthly order credit — we all use what we build.' },
  { title: 'Real equity', copy: 'Options for every full-time role, explained in plain terms.' },
];

export default function CareersPage() {
  return (
    <>
      <Section noReveal style={{ padding: 'clamp(36px,6vw,64px) 0 clamp(30px,5vw,52px)' }}>
        <Container>
          <Eyebrow>Careers</Eyebrow>
          <h1 style={{ margin: 0, maxWidth: '20em', fontSize: 'clamp(34px,6.4vw,54px)', lineHeight: 1.04, letterSpacing: '-0.045em', fontWeight: 900, color: 'var(--text-strong)' }}>
            Build the delivery layer for a continent
            <Dot />
          </h1>
          <p style={{ margin: '18px 0 0', maxWidth: '32em', fontSize: 'clamp(16px,2.2vw,18px)', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Small team, real ownership, and a product people use three times a week. Most roles are in Kano; engineering is remote-friendly across Nigeria.
          </p>
        </Container>
      </Section>

      <Section style={{ padding: '0 0 clamp(46px,7vw,80px)' }}>
        <Container>
          <div style={{ borderRadius: 24, overflow: 'hidden', background: 'var(--stone-100)', aspectRatio: '21 / 8', marginBottom: 40 }}>
            <Placeholder label="Team at the Kano hub" />
          </div>
          <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(22px,3.6vw,30px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--text-strong)' }}>
            Open roles
            <Dot />
          </h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {ROLES.map((r) => (
              <Link key={r.title} href="/contact" className="n-liftx" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '22px 24px', borderRadius: 18, background: '#fff', boxShadow: 'var(--shadow-sm)', color: 'inherit' }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>{r.title}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>{r.meta}</div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: 'var(--nana-blue-600)' }}>
                  View role
                  <ArrowRight style={{ width: 15, height: 15 }} />
                </span>
              </Link>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 18, marginTop: 40 }}>
            {PERKS.map((p) => (
              <div key={p.title} style={{ padding: 24, borderRadius: 18, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--text-strong)' }}>{p.title}</div>
                <p style={{ margin: '7px 0 0', fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>{p.copy}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 34, padding: 26, borderRadius: 18, background: 'var(--nana-blue-50)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--nana-blue-800)' }}>Nothing fits, but you&apos;d be great here?</div>
              <p style={{ margin: '6px 0 0', fontSize: 14.5, lineHeight: 1.5, color: 'var(--nana-blue-700)' }}>Send a note about what you&apos;d want to own.</p>
            </div>
            <Link href="/contact" className="n-btn n-btn--dark" style={{ height: 48, padding: '0 24px', fontSize: 15 }}>
              Get in touch
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, FileText } from 'lucide-react';
import { Container, Section, Eyebrow, Dot } from '../components/site/primitives';

export const metadata = { title: 'Investors' };

const STATS = [
  { value: '14', label: 'Vendors on platform' },
  { value: '1,960', label: 'Registered customers' },
  { value: '15 min', label: 'Median delivery time' },
  { value: '4.9★', label: 'Average rating' },
];

const TIMELINE = [
  { year: '2026', title: 'Nana launches in Kano', copy: 'One hub, a fleet of riders, and the restaurants, markets and stores of Kano — food, groceries and errands in a single app.', dashed: false },
  { year: 'Next', title: 'Expanding into two more cities', copy: 'The Kano playbook — the hub model, rider training and vendor tooling — reused to open two more cities.', dashed: true },
];

const WHY = [
  { title: 'Under-served by design', copy: 'Global platforms concentrate on Lagos and Nairobi. Cities of three million go unaddressed.' },
  { title: 'Cheaper to run, denser to serve', copy: 'Short trips and tight neighbourhoods mean more drops per rider hour.' },
  { title: 'One network, many verticals', copy: 'Food funds the fleet; groceries and parcels fill the gaps between meal peaks.' },
];

const h2: React.CSSProperties = {
  margin: 0,
  fontSize: 'clamp(24px,4vw,34px)',
  lineHeight: 1.08,
  letterSpacing: '-0.032em',
  fontWeight: 700,
  color: 'var(--text-strong)',
};

export default function InvestorsPage() {
  return (
    <>
      <Section noReveal style={{ padding: 'clamp(36px,6vw,68px) 0 clamp(40px,6vw,72px)', background: '#fff', borderBottom: '1px solid var(--border-subtle)' }}>
        <Container>
          <Eyebrow>Investors</Eyebrow>
          <h1 style={{ margin: 0, maxWidth: '22em', fontSize: 'clamp(34px,6.4vw,54px)', lineHeight: 1.04, letterSpacing: '-0.045em', fontWeight: 900, color: 'var(--text-strong)' }}>
            A delivery network for the next 200 million customers
            <Dot />
          </h1>
          <p style={{ margin: '18px 0 0', maxWidth: '32em', fontSize: 'clamp(16px,2.2vw,18px)', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Africa&apos;s secondary cities are where the demand is growing and where nobody has built the logistics layer. We&apos;re starting there on purpose.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginTop: 38 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 'clamp(32px,5vw,44px)', fontWeight: 900, letterSpacing: '-0.045em', color: 'var(--text-strong)' }}>{s.value}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ padding: 'clamp(46px,7vw,84px) 0', background: '#fff', borderTop: '1px solid var(--border-subtle)' }}>
        <Container>
          <h2 style={{ ...h2, marginBottom: 34, fontSize: 'clamp(25px,4.2vw,36px)' }}>
            How we got here
            <Dot />
          </h2>
          <div style={{ display: 'grid', gap: 0, maxWidth: 760 }}>
            {TIMELINE.map((t) => (
              <div key={t.year} style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: 20 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: t.dashed ? 'var(--text-subtle)' : 'var(--color-primary)', paddingTop: 2 }}>{t.year}</div>
                <div style={{ borderLeft: t.dashed ? '2px dashed var(--border-subtle)' : '2px solid var(--border-subtle)', padding: t.dashed ? '0 0 0 24px' : '0 0 30px 24px', position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: -7,
                      top: 6,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: t.dashed ? '#fff' : 'var(--color-primary)',
                      boxShadow: t.dashed ? '0 0 0 2px var(--border-default),0 0 0 4px #fff' : '0 0 0 4px #fff',
                    }}
                  />
                  <div style={{ fontSize: 17.5, fontWeight: 700, color: 'var(--text-strong)' }}>{t.title}</div>
                  <p style={{ margin: '7px 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)' }}>{t.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ padding: 'clamp(46px,7vw,84px) 0' }}>
        <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 'clamp(28px,5vw,48px)', alignItems: 'start' }}>
          <div>
            <h2 style={h2}>
              Why this market
              <Dot />
            </h2>
            <div style={{ display: 'grid', gap: 14, marginTop: 22 }}>
              {WHY.map((w) => (
                <div key={w.title} style={{ padding: 20, borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-strong)' }}>{w.title}</div>
                  <p style={{ margin: '6px 0 0', fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>{w.copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--stone-900)', borderRadius: 24, padding: 'clamp(26px,4vw,36px)' }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.6vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 700, color: '#fff' }}>
              Talk to us
              <Dot />
            </h2>
            <p style={{ margin: '12px 0 24px', fontSize: 15.5, lineHeight: 1.5, color: 'var(--stone-400)' }}>
              We share a quarterly update with prospective and existing investors: unit economics, cohort retention and city-level margins.
            </p>
            <div style={{ display: 'grid', gap: 10, fontSize: 15, color: 'var(--stone-300)' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Mail style={{ width: 17, height: 17, color: 'var(--nana-blue-300)' }} />
                <span>suraj@trynanaapp.com</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <FileText style={{ width: 17, height: 17, color: 'var(--nana-blue-300)' }} />
                <span>Data room access on request</span>
              </div>
            </div>
            <Link href="/contact" className="n-btn n-btn--primary" style={{ height: 52, padding: '0 26px', fontSize: 16, marginTop: 26 }}>
              Request the deck
              <ArrowRight style={{ width: 17, height: 17 }} />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

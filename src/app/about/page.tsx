import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Section, Eyebrow, Dot } from '../components/site/primitives';
import { Placeholder } from '../components/site/Placeholder';

const VALUES = [
  { title: 'Speed is a promise, not a slogan', copy: "If we can't get to you fast, we don't show you the store." },
  { title: 'Local before large', copy: 'A single-stall trader gets the same tools as a chain.' },
  { title: 'Riders are colleagues', copy: 'Fair pay, insurance cover, and a hub with somewhere to sit.' },
  { title: 'Build for the real street', copy: 'Landmarks, cash, patchy data. We design for all three.' },
];

const TEAM = [
  { id: 'tm-1', role: 'Chief executive' },
  { id: 'tm-2', role: 'Head of operations' },
  { id: 'tm-3', role: 'Head of engineering' },
  { id: 'tm-4', role: 'Vendor partnerships' },
  { id: 'tm-5', role: 'Rider community' },
];

const h2: React.CSSProperties = {
  margin: 0,
  fontSize: 'clamp(24px,4vw,34px)',
  lineHeight: 1.08,
  letterSpacing: '-0.032em',
  fontWeight: 700,
  color: 'var(--text-strong)',
};

export default function AboutPage() {
  return (
    <>
      <Section noReveal style={{ padding: 'clamp(36px,6vw,64px) 0 0' }}>
        <Container>
          <Eyebrow>About Nana</Eyebrow>
          <h1 style={{ margin: 0, maxWidth: '22em', fontSize: 'clamp(34px,6.4vw,56px)', lineHeight: 1.03, letterSpacing: '-0.045em', fontWeight: 900, color: 'var(--text-strong)' }}>
            Delivery that works in the cities everyone else skipped
            <Dot />
          </h1>
          <p style={{ margin: '20px 0 0', maxWidth: '34em', fontSize: 'clamp(16px,2.2vw,19px)', lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Nana makes it simple to find what you want and get it brought to you — quickly, reliably and at a price that makes sense. We started in Kano, and we build for cities like it.
          </p>
          <div style={{ marginTop: 36, borderRadius: 24, overflow: 'hidden', background: 'var(--stone-100)', aspectRatio: '21 / 9' }}>
            <Placeholder label="Nana team / city photo (21:9)" />
          </div>
        </Container>
      </Section>

      <Section style={{ padding: 'clamp(46px,7vw,84px) 0' }}>
        <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(30px,5vw,56px)', alignItems: 'start' }}>
          <div>
            <h2 style={h2}>So, what is Nana?</h2>
            <p style={{ margin: '16px 0 0', fontSize: 16.5, lineHeight: 1.55, color: 'var(--text-body)' }}>
              Founded in Kano, Nigeria, Nana is a food and grocery delivery platform connecting people to the restaurants, stores and markets closest to them. One app, a fleet of riders, and a small team obsessed with arrival times.
            </p>
            <p style={{ margin: '14px 0 0', fontSize: 16.5, lineHeight: 1.55, color: 'var(--text-body)' }}>
              We&apos;re a company of Imagyne Ventures, which gives us the engineering muscle of a much larger platform while we stay close to the streets we serve.
            </p>
          </div>
          <div>
            <h2 style={h2}>
              Our mission
              <Dot />
            </h2>
            <p style={{ margin: '16px 0 0', fontSize: 16.5, lineHeight: 1.55, color: 'var(--text-body)' }}>
              To bring reliable delivery to underrepresented cities across Africa. Not the capitals that already have five apps — the places where a dependable rider network changes what a small kitchen can become.
            </p>
            <p style={{ margin: '14px 0 0', fontSize: 16.5, lineHeight: 1.55, color: 'var(--text-body)' }}>
              Every city we open adds local vendors, local riders and local support staff. That&apos;s the whole point.
            </p>
          </div>
        </Container>
      </Section>

      <Section style={{ padding: 'clamp(46px,7vw,84px) 0', background: '#fff', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <Container>
          <h2 style={{ ...h2, marginBottom: 28 }}>
            How we work
            <Dot />
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ padding: 24, borderRadius: 18, background: 'var(--surface-page)' }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>{v.title}</div>
                <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>{v.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ padding: 'clamp(46px,7vw,84px) 0' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 26 }}>
            <h2 style={h2}>
              The team
              <Dot />
            </h2>
            <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: 'var(--nana-blue-600)' }}>
              We&apos;re hiring
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 18 }}>
            {TEAM.map((t) => (
              <div key={t.id}>
                <div style={{ aspectRatio: '1', borderRadius: 18, overflow: 'hidden', background: 'var(--stone-100)' }}>
                  <Placeholder label="Portrait" />
                </div>
                <div style={{ marginTop: 11, fontSize: 15.5, fontWeight: 700, color: 'var(--text-strong)' }}>Name here</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.role}</div>
              </div>
            ))}
          </div>
          <p style={{ margin: '22px 0 0', fontSize: 13.5, color: 'var(--text-subtle)' }}>
            Send us the real names, titles and portraits and we&apos;ll drop them straight in.
          </p>
        </Container>
      </Section>
    </>
  );
}

'use client';
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container, Section, Dot, Field, SelectField, FormSuccess } from '../components/site/primitives';
import { Placeholder } from '../components/site/Placeholder';

const EARNINGS = [
  { label: 'Base per delivery', value: '₦600' },
  { label: 'Distance, per km after 3 km', value: '₦120' },
  { label: 'Peak-hour bonus', value: '+25%' },
];

const REQUIREMENTS = [
  { title: 'A working motorcycle or bicycle', copy: 'Yours or rented. We can introduce you to a rental partner.' },
  { title: 'A smartphone with data', copy: 'Android 8 and above runs the rider app.' },
  { title: "Valid ID and a rider's licence", copy: "NIN slip or voter's card, plus a licence for motorcycles." },
  { title: 'A guarantor', copy: 'One person we can call. Standard for handling cash orders.' },
];

const secHead: React.CSSProperties = {
  margin: 0,
  fontSize: 'clamp(25px,4.2vw,36px)',
  lineHeight: 1.08,
  letterSpacing: '-0.032em',
  fontWeight: 700,
  color: 'var(--text-strong)',
};

export default function RidersPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Dark hero */}
      <Section noReveal style={{ padding: 'clamp(40px,7vw,80px) 0', background: 'var(--stone-900)' }}>
        <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(32px,5vw,56px)', alignItems: 'center' }}>
          <div>
            <div className="n-eyebrow n-eyebrow--upper" style={{ marginBottom: 14 }}>For riders</div>
            <h1 style={{ margin: 0, fontSize: 'clamp(34px,6.4vw,54px)', lineHeight: 1.04, letterSpacing: '-0.045em', fontWeight: 900, color: '#fff' }}>
              Ride when you want.
              <br />
              Get paid every week
              <Dot />
            </h1>
            <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px,2.2vw,18px)', lineHeight: 1.5, color: 'var(--stone-400)', maxWidth: '30em' }}>
              Bring your bike and your phone. We bring the orders, the insurance cover and the fuel support.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
              <a href="#rider-form" className="n-btn n-btn--primary" style={{ height: 56, padding: '0 28px', fontSize: 16 }}>
                Start your application
                <ArrowRight style={{ width: 17, height: 17 }} />
              </a>
            </div>
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden', background: 'var(--stone-800)', aspectRatio: '4 / 3' }}>
            <Placeholder label="Rider with Nana bag" />
          </div>
        </Container>
      </Section>

      {/* Earnings + requirements */}
      <Section style={{ padding: 'clamp(46px,7vw,84px) 0' }}>
        <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 'clamp(30px,5vw,52px)' }}>
          <div>
            <h2 style={secHead}>
              What riders earn
              <Dot />
            </h2>
            <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--text-muted)', maxWidth: '30em' }}>
              Per-delivery pay plus distance, with busy-hour bonuses on Friday and Sunday evenings. Tips are yours in full.
            </p>
            <div style={{ display: 'grid', gap: 12, marginTop: 26 }}>
              {EARNINGS.map((e) => (
                <div key={e.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, padding: '18px 20px', borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
                  <span style={{ fontSize: 15, color: 'var(--text-body)' }}>{e.label}</span>
                  <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>{e.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, padding: '18px 20px', borderRadius: 16, background: 'var(--nana-blue-50)' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--nana-blue-800)' }}>Active riders average</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--nana-blue-800)' }}>₦85,000 / week</span>
              </div>
            </div>
          </div>
          <div>
            <h2 style={secHead}>
              What you need
              <Dot />
            </h2>
            <div style={{ display: 'grid', gap: 12, marginTop: 26 }}>
              {REQUIREMENTS.map((r) => (
                <div key={r.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <CheckCircle2 style={{ width: 19, height: 19, color: 'var(--nana-lime-600)', flex: 'none', marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text-strong)' }}>{r.title}</div>
                    <p style={{ margin: '3px 0 0', fontSize: 14, lineHeight: 1.45, color: 'var(--text-muted)' }}>{r.copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 26, borderRadius: 18, overflow: 'hidden', background: 'var(--stone-100)', aspectRatio: '16 / 10' }}>
              <Placeholder label="Rider training day" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Signup form */}
      <Section id="rider-form" style={{ padding: '0 0 clamp(46px,7vw,84px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ background: '#fff', borderRadius: 24, boxShadow: 'var(--shadow-md)', padding: 'clamp(24px,4vw,40px)' }}>
            {sent ? (
              <FormSuccess
                title={<>You&apos;re on the list<Dot /></>}
                body="Bring your ID and licence to Wednesday's session. We'll text you the details."
              />
            ) : (
              <div>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,3.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.032em', fontWeight: 700, color: 'var(--text-strong)' }}>
                  Sign up to ride
                  <Dot />
                </h2>
                <p style={{ margin: '10px 0 26px', fontSize: 15.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                  Onboarding sessions run every Wednesday at our Kano hub.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
                    <Field label="Full name" placeholder="First and last name" required />
                    <Field label="Phone" type="tel" placeholder="080 0000 0000" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
                    <SelectField label="What do you ride?" required>
                      <option value="" disabled>Choose one</option>
                      <option>Motorcycle (mine)</option>
                      <option>Motorcycle (rented)</option>
                      <option>Bicycle</option>
                      <option>I need help getting one</option>
                    </SelectField>
                    <SelectField label="Which area do you know best?" required>
                      <option value="" disabled>Choose one</option>
                      <option>Nassarawa</option>
                      <option>Tarauni</option>
                      <option>Fagge / Sabon Gari</option>
                      <option>Bompai / Hotoro</option>
                      <option>Kumbotso</option>
                    </SelectField>
                  </div>
                  <Field label="How many hours a week can you ride?" placeholder="e.g. 30 hours, mostly evenings" />
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 4 }}>
                    <button type="submit" className="n-btn n-btn--primary" style={{ height: 56, padding: '0 28px', fontSize: 16 }}>
                      Apply to ride
                    </button>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: '22em' }}>
                      We&apos;ll text you the address for the next session.
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

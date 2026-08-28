'use client';
import React, { useState } from 'react';
import { Users, Bike, LineChart, Banknote } from 'lucide-react';
import { Container, Section, Eyebrow, Dot, FormSuccess } from '../components/site/primitives';
import { Placeholder } from '../components/site/Placeholder';
import { track } from '@/lib/analytics';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.trynanaapp.com/api/v1';

const STATS = [
  { value: '₦0', label: 'To join' },
  { value: '48 hrs', label: 'Typical go-live' },
  { value: 'Weekly', label: 'Payouts' },
];

const BENEFITS = [
  { icon: Users, title: 'Demand from day one', copy: 'You appear in search and category feeds the moment you go live.' },
  { icon: Bike, title: 'Riders included', copy: 'Our fleet handles pickup and delivery. You just cook or pack.' },
  { icon: LineChart, title: "A dashboard that's honest", copy: 'Live orders, best sellers, prep times and what you’re owed.' },
  { icon: Banknote, title: 'Money every week', copy: 'Paid to your bank every Tuesday, with a statement you can read.' },
];

const STEPS = [
  { n: '01', title: 'Apply', copy: 'Four fields below. No paperwork yet.' },
  { n: '02', title: 'We visit', copy: 'A partner manager checks your kitchen and photographs the menu.' },
  { n: '03', title: 'Go live', copy: 'Your store opens in the app with a tablet or your own phone.' },
];

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

/** Controlled input matching the DS Input styling. */
function ControlledField({ label, value, onChange, placeholder, type = 'text', required }: FieldProps) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{label}</span>
      <input
        className="n-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

export default function VendorsPage() {
  const [businessName, setBusinessName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/vendor-interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Exactly the fields the backend's SubmitVendorInterestDto accepts.
        body: JSON.stringify({
          name: name.trim(),
          business_name: businessName.trim(),
          phone: phone.trim(),
          instagram: instagram.trim(),
        }),
      });
      if (res.ok) {
        track('vendor_application_submitted', { has_instagram: instagram.trim() !== '' });
        setSent(true);
        return;
      }
      if (res.status === 409) {
        track('vendor_application_failed', { reason: 'duplicate' });
        setError('That phone number is already registered — we have your application. A partner manager will be in touch.');
      } else {
        track('vendor_application_failed', { reason: 'server' });
        setError('Something went wrong submitting your application. Please try again, or WhatsApp us on 0812 222 9693.');
      }
    } catch {
      track('vendor_application_failed', { reason: 'network' });
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <Section
        noReveal
        style={{ background: '#fff', borderBottom: '1px solid var(--border-subtle)', padding: 'clamp(40px,7vw,80px) 0' }}
      >
        <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(32px,5vw,56px)', alignItems: 'center' }}>
          <div>
            <Eyebrow>For vendors</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 'clamp(34px,6.4vw,54px)', lineHeight: 1.04, letterSpacing: '-0.045em', fontWeight: 900, color: 'var(--text-strong)' }}>
              Your kitchen, in every phone nearby
              <Dot />
            </h1>
            <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px,2.2vw,18px)', lineHeight: 1.5, color: 'var(--text-muted)', maxWidth: '30em' }}>
              No storefront to build, no riders to hire. Send us your menu and start taking orders this week.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(22px,4vw,40px)', marginTop: 32 }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-strong)' }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden', background: 'var(--stone-100)', aspectRatio: '4 / 3', boxShadow: 'var(--shadow-lg)' }}>
            <Placeholder label="Vendor at work" />
          </div>
        </Container>
      </Section>

      {/* What you get */}
      <Section style={{ padding: 'clamp(46px,7vw,84px) 0', background: '#fff', borderTop: '1px solid var(--border-subtle)' }}>
        <Container>
          <h2 style={{ margin: '0 0 30px', fontSize: 'clamp(25px,4.2vw,36px)', lineHeight: 1.08, letterSpacing: '-0.032em', fontWeight: 700, color: 'var(--text-strong)', maxWidth: '20em' }}>
            What you get
            <Dot />
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(244px,1fr))', gap: 18 }}>
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} style={{ background: 'var(--surface-page)', borderRadius: 18, padding: 24 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, color: 'var(--color-primary)' }}>
                    <Icon style={{ width: 19, height: 19 }} />
                  </span>
                  <div style={{ marginTop: 16, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>{b.title}</div>
                  <p style={{ margin: '7px 0 0', fontSize: 14, lineHeight: 1.45, color: 'var(--text-muted)' }}>{b.copy}</p>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16, marginTop: 30 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ padding: 22, borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--nana-blue-300)' }}>{s.n}</div>
                <div style={{ marginTop: 10, fontSize: 16, fontWeight: 700, color: 'var(--text-strong)' }}>{s.title}</div>
                <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.45, color: 'var(--text-muted)' }}>{s.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Application form */}
      <Section style={{ padding: 'clamp(46px,7vw,84px) 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ background: '#fff', borderRadius: 24, boxShadow: 'var(--shadow-md)', padding: 'clamp(24px,4vw,40px)' }}>
            {sent ? (
              <FormSuccess
                title={<>Application received<Dot /></>}
                body="A partner manager will reach out on the phone number or Instagram you gave us within two working days."
              />
            ) : (
              <div>
                <h2 style={{ margin: 0, fontSize: 'clamp(24px,3.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.032em', fontWeight: 700, color: 'var(--text-strong)' }}>
                  Apply to sell on Nana
                  <Dot />
                </h2>
                <p style={{ margin: '10px 0 26px', fontSize: 15.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                  We reply within two working days. Kano only for now — other cities join the waitlist.
                </p>
                <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
                    <ControlledField label="Business name" value={businessName} onChange={setBusinessName} placeholder="Mama Rukky's Kitchen" required />
                    <ControlledField label="Your name" value={name} onChange={setName} placeholder="First and last name" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
                    <ControlledField label="Phone" value={phone} onChange={setPhone} type="tel" placeholder="080 0000 0000" required />
                    <ControlledField label="Instagram handle" value={instagram} onChange={setInstagram} placeholder="@yourbusiness" required />
                  </div>

                  {error ? (
                    <div
                      role="alert"
                      style={{ padding: '12px 16px', borderRadius: 12, background: 'var(--nana-coral-50)', color: 'var(--nana-coral-600)', fontSize: 14, lineHeight: 1.45 }}
                    >
                      {error}
                    </div>
                  ) : null}

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 4 }}>
                    <button
                      type="submit"
                      className="n-btn n-btn--primary"
                      disabled={submitting}
                      style={{ height: 56, padding: '0 28px', fontSize: 16, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'default' : 'pointer' }}
                    >
                      {submitting ? 'Sending…' : 'Send application'}
                    </button>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: '22em' }}>
                      By applying you agree to Nana&apos;s partner terms.
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

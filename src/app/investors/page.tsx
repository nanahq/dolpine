import React from 'react';
import { INVESTORS_EMAIL } from '@/lib/site';
import { PageHero } from '../components/pages/PageParts';
import { InvestorForm } from '../components/pages/InvestorForm';

export const metadata = { title: 'Investors' };

/** Figures carried over from the previous investors page — the design's were placeholders. */
const TRACTION = [
  { value: '14', label: 'Vendors on platform' },
  { value: '1,960', label: 'Registered customers' },
  { value: '15 min', label: 'Median delivery time' },
  { value: '4.9★', label: 'Average rating' },
];

const WHY = [
  { title: 'Cities are growing fast', copy: 'More people, more traffic, less time. Getting across town is the problem we solve.', bg: 'var(--blue)', fg: 'var(--ink)' },
  { title: 'Mobile-first customers', copy: 'Payments by transfer and card are now normal. Ordering by app is the next step.', bg: 'var(--yellow)', fg: 'var(--ink)' },
  { title: 'Fragmented retail', copy: 'Thousands of kitchens, pharmacies and corner shops with no delivery of their own.', bg: 'var(--green)', fg: '#fff' },
];

const MODEL = [
  { title: 'Delivery and service fees', copy: 'Paid by customers on every order, priced by distance and demand.' },
  { title: 'Merchant commission', copy: 'A share of each restaurant and store order, settled weekly.' },
  { title: 'Promoted placement', copy: 'Merchants pay to feature in search, banners and campaigns.' },
  { title: 'Errands and parcels', copy: 'Higher-margin trips that reuse the same riders between meal peaks.' },
];

const FLYWHEEL = [
  { title: 'More customers', copy: 'Bring more orders to every store', arrow: '→' },
  { title: 'More merchants', copy: 'Give customers more reasons to open the app', arrow: '→' },
  { title: 'More riders', copy: 'Earn more per hour as orders pile up', arrow: '→' },
  { title: 'Faster delivery', copy: 'Which brings more customers', arrow: '↺' },
];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        bg="var(--ink)"
        fg="#fff"
        eyebrow="Investors"
        eyebrowFg="var(--blue)"
        ledeFg="var(--faint)"
        size="clamp(60px,9.4vw,156px)"
        title={
          <>
            The everyday
            <br />
            delivery network
            <br />
            for <span style={{ color: 'var(--blue)' }}>African cities</span>
          </>
        }
        lede="Nana moves food, groceries, medicine and parcels across the city on one rider network — and earns on every leg."
      >
        <div className="v-rise" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animationDelay: '.3s' }}>
          <a href="#inv-form" className="v-btn v-btn--sky v-btn--lg">Request the deck</a>
          <a href={`mailto:${INVESTORS_EMAIL}`} className="v-btn v-btn--ghost-light v-btn--lg">{INVESTORS_EMAIL}</a>
        </div>
      </PageHero>

      <section className="v-wrap" style={{ paddingTop: 'clamp(80px,9vw,130px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div className="v-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="v-h2">Why now</h2>
          <p className="v-lede" style={{ maxWidth: 420 }}>Fast-growing cities, phones in every pocket, and shopping that still happens street by street.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16 }}>
          {WHY.map((w, i) => (
            <div key={w.title} className="v-reveal" style={{ minHeight: 300, borderRadius: 28, background: w.bg, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: w.fg }}>{String(i + 1).padStart(2, '0')}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="v-h3" style={{ fontSize: 30, lineHeight: 1.05, color: w.fg }}>{w.title}</span>
                <span style={{ fontSize: 16, lineHeight: 1.5, color: w.fg }}>{w.copy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="v-wrap" style={{ paddingTop: 'clamp(80px,9vw,130px)', paddingBottom: 'clamp(80px,9vw,130px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 56, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span className="v-eyebrow" style={{ color: 'var(--blue-ink)' }}>Business model</span>
          <h2 className="v-h2">
            One network,
            <br />
            four ways to earn
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 1px 0 var(--line)' }}>
          {MODEL.map((m) => (
            <div key={m.title} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '24px 0', boxShadow: 'inset 0 -1px 0 var(--line)' }}>
              <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.015em' }}>{m.title}</span>
              <span style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--muted)' }}>{m.copy}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--ink)' }}>
        <div className="v-wrap" style={{ paddingTop: 'clamp(80px,9vw,120px)', paddingBottom: 'clamp(80px,9vw,120px)', display: 'flex', flexDirection: 'column', gap: 36 }}>
          <h2 className="v-h2" style={{ color: '#fff' }}>Traction</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', columnGap: 32 }}>
            {TRACTION.map((t) => (
              <div key={t.label} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '28px 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)' }}>
                <span className="v-display v-display--black v-num" style={{ fontSize: 'clamp(64px,7vw,104px)', lineHeight: 0.85, color: '#fff' }}>{t.value}</span>
                <span style={{ fontSize: 16, color: 'var(--faint)' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v-wrap" style={{ paddingTop: 'clamp(80px,9vw,130px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 className="v-h2 v-reveal">The flywheel</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 12 }}>
          {FLYWHEEL.map((f, i) => (
            <div key={f.title} className="v-reveal" style={{ borderRadius: 24, background: 'var(--fill)', padding: 28, display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="v-display v-display--black" style={{ fontSize: 56, lineHeight: 0.8, color: 'var(--blue)' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 22 }}>{f.arrow}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.015em' }}>{f.title}</span>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{f.copy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="inv-form" className="v-wrap" style={{ paddingTop: 'clamp(80px,9vw,130px)', paddingBottom: 140, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 48, alignItems: 'start', scrollMarginTop: 90 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 className="v-h2">Talk to us</h2>
          <p className="v-lede" style={{ maxWidth: 440 }}>Request the deck and data room access. We reply within two working days.</p>
          <div style={{ display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 1px 0 var(--line)' }}>
            {['Press kit', 'Annual letter'].map((s) => (
              <a key={s} href={`mailto:${INVESTORS_EMAIL}?subject=${encodeURIComponent(s)}`} className="v-inv-link">
                {s}
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
        <div className="v-form-card">
          <InvestorForm />
        </div>
      </section>
    </>
  );
}

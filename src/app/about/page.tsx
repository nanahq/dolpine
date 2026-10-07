import React from 'react';
import Link from 'next/link';
import { PageHero } from '../components/pages/PageParts';

const VALUES = [
  { title: ['Respect', 'the minute'], copy: 'Time is the product. We plan every route like it matters, because it does.', bg: 'var(--blue)', fg: 'var(--ink)' },
  { title: ['Fair to', 'everyone'], copy: 'Clear prices for customers. Honest pay for riders. Fair terms for stores.', bg: 'var(--yellow)', fg: 'var(--ink)' },
  { title: ['Local', 'first'], copy: 'We grow with the kitchens, markets and corner shops that make each city.', bg: 'var(--green)', fg: '#fff' },
];

/** Cities we deliver in today. The design's list named three; only Kano is live. */
const CITIES = ['Kano'];

export default function AboutPage() {
  return (
    <>
      <PageHero
        bg="var(--ink)"
        fg="#fff"
        eyebrow="About Nana"
        eyebrowFg="var(--blue)"
        ledeFg="var(--faint)"
        size="clamp(64px,10vw,168px)"
        title={
          <>
            We get things
            <br />
            to <span style={{ color: 'var(--blue)' }}>people.</span>
          </>
        }
        lede="Nana is a delivery company built for African cities — food, groceries, errands and parcels, run by local riders and local stores."
      />

      <section className="v-wrap" style={{ paddingTop: 'clamp(80px,9vw,130px)', paddingBottom: 'clamp(80px,9vw,130px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 40 }}>
        <span className="v-eyebrow" style={{ color: 'var(--blue-ink)' }}>Our story</span>
        <p className="v-reveal" style={{ margin: 0, fontSize: 'clamp(24px,2.6vw,34px)', lineHeight: 1.35, letterSpacing: '-.01em', color: 'var(--text)', gridColumn: 'span 2', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
          It started with a simple question: why is it so hard to get a bag of rice, a hot plate of jollof or a forgotten phone charger across town? We built Nana so
          the answer is one tap — and so the stores and riders doing the work earn fairly for it.
        </p>
      </section>

      <section className="v-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16 }}>
        {VALUES.map((v) => (
          <div key={v.copy} className="v-reveal" style={{ minHeight: 320, borderRadius: 28, background: v.bg, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 12 }}>
            <span className="v-h3" style={{ fontSize: 34, color: v.fg }}>
              {v.title[0]}
              <br />
              {v.title[1]}
            </span>
            <span style={{ fontSize: 16, lineHeight: 1.5, color: v.fg }}>{v.copy}</span>
          </div>
        ))}
      </section>

      <section className="v-wrap" style={{ paddingTop: 'clamp(80px,9vw,130px)', paddingBottom: 'clamp(80px,9vw,130px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <span className="v-eyebrow" style={{ color: 'var(--blue-ink)' }}>Where we deliver</span>
        <div className="v-display v-display--black" style={{ fontSize: 'clamp(72px,12vw,200px)', display: 'flex', flexDirection: 'column' }}>
          {CITIES.map((c) => (
            <span key={c} className="v-reveal" style={{ color: 'var(--ink)' }}>{c}</span>
          ))}
          <span className="v-reveal" style={{ color: 'transparent', WebkitTextStroke: '3px var(--blue)' }}>Yours next</span>
        </div>
        <Link href="/careers" className="v-btn v-btn--ink v-btn--lg" style={{ alignSelf: 'flex-start', marginTop: 20 }}>
          Build it with us →
        </Link>
      </section>
    </>
  );
}

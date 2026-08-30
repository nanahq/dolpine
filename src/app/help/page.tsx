import React from 'react';
import { Container, Section, Dot } from '../components/site/primitives';
import { getHelpCategories } from '@/lib/api/help';
import { HelpBrowser } from './help-browser';

/** Matches the article route — a publish shows up within five minutes. */
export const revalidate = 300;

export const metadata = {
  title: 'Help centre',
  description: 'How-tos, answers and the small print for ordering on Nana.',
};

const FAQS = [
  { q: 'Can I order from this website?', a: 'No — ordering happens in the Nana app, where we can verify your address and track the rider. The website is for browsing stores and menus.' },
  { q: 'Which cities does Nana cover?', a: 'Kano today, with three more northern cities in preparation. The app only shows stores that can actually reach your address.' },
  { q: 'How much is delivery?', a: 'From ₦500 within your zone, shown clearly before you pay. Longer trips cost more, and we never add a fee at the last step.' },
  { q: 'What if my order is late or wrong?', a: 'Open chat in the app within 24 hours. Missing items are refunded to your wallet the same day, or to your card in 3–5 working days.' },
  { q: 'Can I pay cash?', a: 'Yes. Choose cash on delivery at checkout and pay the rider. Please have close to the exact amount where you can.' },
];

export default async function HelpPage() {
  // Returns [] if the API is unreachable — the page still renders its search
  // box and quick answers rather than failing.
  const categories = await getHelpCategories();

  return (
    <>
      <HelpBrowser categories={categories} />

      <Section style={{ padding: '0 0 clamp(46px,7vw,80px)' }}>
        <Container>
          <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(22px,3.6vw,30px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--text-strong)' }}>
            Quick answers
            <Dot />
          </h2>
          <div style={{ display: 'grid', gap: 10, maxWidth: 860 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: '#fff', borderRadius: 16, boxShadow: 'var(--shadow-sm)', padding: '18px 22px' }}>
                <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>
                  {f.q}
                  <span className="n-faq-plus" style={{ color: 'var(--text-subtle)' }}>+</span>
                </summary>
                <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--text-muted)' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

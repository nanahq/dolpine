import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  Store,
  Bike,
  Briefcase,
} from 'lucide-react';
import { Container, Section, Eyebrow, Dot } from './components/site/primitives';
import { Placeholder } from './components/site/Placeholder';
import { getRestaurants } from '../lib/api/merchants';
import { getHomeReviews } from '../lib/api/reviews';
import { formatRating, formatPrepWindow, formatDeliveryFee, displayName, cleanImageUrl } from '../lib/format';

const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app';
const APP_STORE =
  'https://apps.apple.com/us/app/nana-delivery-more/id6499050428';

const MARQUEE = [
  "Mama Rukky's Kitchen",
  'Sabon Gari Suya Spot',
  'Kano Fresh Market',
  'Zoo Road Shawarma',
  'Hotoro Grills',
  'Bompai Pharmacy',
  'Tarauni Provisions',
  'Nassarawa Bakery',
];

const CATEGORIES = [
  {
    n: '01',
    title: 'Groceries',
    href: '/merchant',
    copy: 'Market produce, pantry staples and household basics — picked the same day by a real shopper.',
    img: 'Fresh produce at a Kano market',
    points: [
      'Fresh fruit and vegetables',
      'Rice, oil, spices and staples',
      'Household and baby items',
    ],
    cta: 'Browse stores',
  },
  {
    n: '02',
    title: 'Food',
    href: '/merchant',
    copy: 'Local kitchens, home cooks and the spots you already know, delivered hot in about fifteen minutes.',
    img: 'Jollof rice / local dish',
    points: [
      'Restaurants and grills',
      'Home kitchens and caterers',
      'Breakfast, lunch and late night',
    ],
    cta: 'See a sample menu',
  },
  {
    n: '03',
    title: 'Errands',
    href: '/help',
    copy: 'Send a rider to any store, market or address in town — even somewhere that is not on Nana yet.',
    img: 'Rider collecting an order',
    points: [
      'Buy from any shop or market stall',
      'Send and collect parcels',
      'Pharmacy runs and pickups',
    ],
    cta: 'How errands work',
  },
];

const STORES = [
  { id: 'store-1', name: "Mama Rukky's Kitchen", rating: '4.8', time: '15–25 min', fee: '₦500 delivery' },
  { id: 'store-2', name: 'Sabon Gari Suya Spot', rating: '4.7', time: '20–30 min', fee: '₦500 delivery' },
  { id: 'store-3', name: 'Kano Fresh Market', rating: '4.9', time: '25–40 min', fee: '₦700 delivery' },
  { id: 'store-4', name: 'Zoo Road Shawarma', rating: '4.6', time: '15–25 min', fee: '₦500 delivery' },
];

const STEPS = [
  { n: 'Step 1', title: 'Set your address', copy: 'Drop a pin or save a landmark. We only show what can reach you.' },
  { n: 'Step 2', title: 'Fill your basket', copy: 'Browse menus and stores, add extras, leave a note for the kitchen.' },
  { n: 'Step 3', title: 'Pay your way', copy: 'Card, transfer, Nana wallet — or cash when the rider arrives.' },
  { n: 'Step 4', title: 'Track to the door', copy: 'Watch your rider on the map and call them if anything changes.' },
];

const REVIEWS = [
  { id: 'rev-1', text: 'Ordered at 11pm expecting nothing. Food was at my gate in 18 minutes, still hot.', name: 'Amina S.', meta: 'Nassarawa GRA, Kano' },
  { id: 'rev-2', text: 'I run a small kitchen. Nana brought me customers I could never reach on my own.', name: 'Hauwa I.', meta: 'Vendor · Hotoro' },
  { id: 'rev-3', text: 'The landmark thing is genius. First app that actually finds my house.', name: 'Yusuf B.', meta: 'Tarauni, Kano' },
];

const GROW = [
  { href: '/vendors', icon: Store, title: 'Become a vendor', copy: 'Put your kitchen or shop in front of 50,000+ nearby customers.', cta: 'Apply' },
  { href: '/riders', icon: Bike, title: 'Ride with Nana', copy: 'Choose your hours, get paid weekly, keep every tip.', cta: 'Start riding' },
  { href: '/contact', icon: Briefcase, title: 'Nana for business', copy: 'Staff lunches, client runs and same-day dispatch on one invoice.', cta: 'Talk to us' },
];

const sectionHead: React.CSSProperties = {
  margin: 0,
  fontSize: 'clamp(27px,4.6vw,40px)',
  lineHeight: 1.08,
  letterSpacing: '-0.032em',
  fontWeight: 700,
  color: 'var(--text-strong)',
};

export const revalidate = 300;

export default async function HomePage() {
  // Live content from nana-v2 (server-side). Each falls back to the static
  // samples below if the API returns nothing, so the page always renders.
  const [live, apiReviews] = await Promise.all([getRestaurants(8), getHomeReviews(3)]);

  const storeCards = live.length
    ? live.map((m) => ({
        id: m.id,
        name: m.business_name,
        rating: formatRating(m.rating),
        time: formatPrepWindow(m.preparation_time),
        fee: formatDeliveryFee(m.delivery_fee),
        banner: cleanImageUrl(m.banner_url),
        href: `/merchant/${m.id}`,
      }))
    : STORES.map((s) => ({ ...s, banner: null as string | null, href: '/merchant' }));
  const marqueeNames = live.length ? live.map((m) => m.business_name) : MARQUEE;

  const reviewCards = apiReviews.length
    ? apiReviews.map((r) => ({
        id: r.id,
        text: r.comment as string,
        name: displayName(r.author?.full_name),
        meta: 'Verified Nana customer',
      }))
    : REVIEWS;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <Section
        noReveal
        style={{
          background: '#fff',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'clamp(28px,4.5vw,54px) 0 clamp(40px,6vw,76px)',
        }}
      >
        <Container>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(46px,10.8vw,116px)',
              lineHeight: 0.88,
              letterSpacing: '-0.05em',
              fontWeight: 900,
              color: 'var(--text-strong)',
            }}
          >
            Get anything
            <br />
            delivered
            <Dot />
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))',
              gap: 'clamp(30px,5vw,60px)',
              marginTop: 'clamp(26px,4vw,46px)',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  maxWidth: '25em',
                  fontSize: 'clamp(16px,2.1vw,19px)',
                  lineHeight: 1.45,
                  color: 'var(--text-muted)',
                }}
              >
                From the restaurants, stores and markets around you. Riders reach
                most addresses in about fifteen minutes.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 16,
                  marginTop: 28,
                }}
              >
                <a
                  href={PLAY_STORE}
                  target="_blank"
                  rel="noreferrer"
                  className="n-btn n-btn--dark"
                  style={{ height: 56, padding: '0 28px', fontSize: 16 }}
                >
                  Get the app
                  <ArrowRight style={{ width: 17, height: 17 }} />
                </a>
                <Link
                  href="/merchant"
                  className="n-underline"
                  style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--text-strong)' }}
                >
                  Browse stores first
                </Link>
              </div>
            </div>
            <div style={{ position: 'relative', justifySelf: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(246px,70vw,286px)',
                  aspectRatio: '9 / 19',
                  borderRadius: 44,
                  background: 'var(--stone-900)',
                  padding: 9,
                  boxShadow: 'var(--shadow-xl)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 36,
                    overflow: 'hidden',
                    background: 'var(--stone-100)',
                  }}
                >
                  <Placeholder label="App home screenshot (9:19)" />
                </div>
              </div>
              <FloatCard
                style={{ left: -16, top: '15%' }}
                label="Arriving"
                value="in 12 min"
              />
              <FloatCard
                style={{ right: -12, bottom: '13%' }}
                label="Live tracking"
                value="Rider en route"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Marquee ─────────────────────────────────────────── */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          padding: '15px 0',
        }}
      >
        <div className="n-marquee-track">
          {[...marqueeNames, ...marqueeNames].map((name, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 26,
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--text-body)',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--nana-blue-300)' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── Categories ──────────────────────────────────────── */}
      <Section style={{ padding: 'clamp(52px,8vw,96px) 0' }}>
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))',
              gap: 'clamp(20px,4vw,48px)',
              alignItems: 'end',
              marginBottom: 'clamp(34px,5vw,52px)',
            }}
          >
            <div>
              <Eyebrow>Three parts, one app</Eyebrow>
              <h2
                style={{
                  margin: 0,
                  fontSize: 'clamp(30px,5.4vw,50px)',
                  lineHeight: 1,
                  letterSpacing: '-0.042em',
                  fontWeight: 900,
                  color: 'var(--text-strong)',
                }}
              >
                Groceries, food
                <br />
                and errands
                <Dot />
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.5, color: 'var(--text-muted)', maxWidth: '26em' }}>
              Whatever you need brought to you, it is one of these three. Browse
              it all here — ordering happens in the app.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(224px,1fr))',
              gap: 'clamp(20px,2.4vw,34px)',
            }}
          >
            {CATEGORIES.map((c) => (
              <Link
                key={c.n}
                href={c.href}
                className="n-cat"
                style={{ display: 'flex', flexDirection: 'column', color: 'inherit', paddingTop: 20 }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{c.n}</span>
                  <ArrowRight style={{ width: 17, height: 17, color: 'var(--color-primary)' }} />
                </div>
                <h3
                  style={{
                    margin: '14px 0 0',
                    fontSize: 'clamp(30px,4.4vw,40px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.045em',
                    fontWeight: 900,
                    color: 'var(--text-strong)',
                  }}
                >
                  {c.title}
                  <Dot />
                </h3>
                <p style={{ margin: '12px 0 20px', fontSize: 15.5, lineHeight: 1.5, color: 'var(--text-muted)', maxWidth: '22em' }}>{c.copy}</p>
                <div
                  style={{
                    borderRadius: 18,
                    overflow: 'hidden',
                    background: 'var(--stone-100)',
                    aspectRatio: '4 / 3',
                    marginBottom: 18,
                  }}
                >
                  <Placeholder className="n-cat__img" label={c.img} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 'auto' }}>
                  {c.points.map((p) => (
                    <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, color: 'var(--text-body)' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--nana-blue-300)', flex: 'none' }} />
                      {p}
                    </span>
                  ))}
                </div>
                <span
                  className="n-underline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 22, fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)', alignSelf: 'flex-start' }}
                >
                  {c.cta}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Browse strip ────────────────────────────────────── */}
      <Section
        id="browse"
        style={{
          padding: 'clamp(52px,8vw,92px) 0',
          background: '#fff',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 26 }}>
            <div>
              <Eyebrow style={{ marginBottom: 10 }}>Near you</Eyebrow>
              <h2 style={sectionHead}>
                Have a look around first
                <Dot />
              </h2>
              <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--text-muted)', maxWidth: '34em' }}>
                Full menus and prices are on the web. When you&apos;re ready to
                order, the app takes it from there.
              </p>
            </div>
            <Link href="/merchant" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, color: 'var(--nana-blue-600)' }}>
              See a sample store
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(226px,1fr))', gap: 18 }}>
            {storeCards.map((s) => (
              <Link key={s.id} href={s.href} className="n-lift" style={{ display: 'block', color: 'inherit' }}>
                <div style={{ aspectRatio: '16 / 10', borderRadius: 18, overflow: 'hidden', background: 'var(--stone-100)', boxShadow: 'var(--shadow-xs)' }}>
                  {s.banner ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.banner} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Placeholder label="Store photo" />
                  )}
                </div>
                <div style={{ padding: '12px 2px 0' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-strong)' }}>{s.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5, fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-body)', fontWeight: 600 }}>
                      <Star style={{ width: 13, height: 13 }} />
                      {s.rating}
                    </span>
                    <span>·</span>
                    <span>{s.time}</span>
                    <span>·</span>
                    <span>{s.fee}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── How it works ────────────────────────────────────── */}
      <Section style={{ padding: 'clamp(52px,8vw,92px) 0', background: '#fff', borderBottom: '1px solid var(--border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '26em', marginBottom: 'clamp(30px,4vw,44px)' }}>
            <Eyebrow>How it works</Eyebrow>
            <h2 style={sectionHead}>
              Four taps, then it&apos;s on its way
              <Dot />
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: 6,
                right: 6,
                top: 7,
                height: 2,
                background:
                  'repeating-linear-gradient(90deg,var(--nana-blue-300) 0 3px,transparent 3px 11px)',
              }}
            />
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(212px,1fr))', gap: 'clamp(24px,3vw,34px)' }}>
              {STEPS.map((s) => (
                <div key={s.n}>
                  <span style={{ display: 'block', width: 15, height: 15, borderRadius: '50%', background: 'var(--color-primary)', boxShadow: '0 0 0 5px #fff' }} />
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-muted)', marginTop: 18 }}>{s.n}</div>
                  <div style={{ marginTop: 6, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{s.title}</div>
                  <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-muted)', maxWidth: '22em' }}>{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Reviews ─────────────────────────────────────────── */}
      <Section style={{ padding: 'clamp(52px,8vw,92px) 0' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 28 }}>
            <div>
              <Eyebrow style={{ marginBottom: 10 }}>Reviews</Eyebrow>
              <h2 style={sectionHead}>
                4.8 out of 5, and counting
                <Dot />
              </h2>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>From 3,100+ ratings on Google Play and the App Store</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(268px,1fr))', gap: 18 }}>
            {reviewCards.map((r) => (
              <div key={r.id} style={{ background: '#fff', borderRadius: 18, padding: 26, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', gap: 2, color: 'var(--nana-amber-400)' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} style={{ width: 15, height: 15 }} fill="currentColor" />
                  ))}
                </div>
                <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--text-body)' }}>{r.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 20 }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', background: 'var(--stone-200)', flex: 'none' }}>
                    <Placeholder />
                  </span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)' }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Grow with Nana ──────────────────────────────────── */}
      <Section style={{ padding: 'clamp(52px,8vw,92px) 0', background: '#fff', borderTop: '1px solid var(--border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '24em', marginBottom: 30 }}>
            <Eyebrow style={{ marginBottom: 10 }}>Beyond delivery</Eyebrow>
            <h2 style={sectionHead}>
              Grow with Nana
              <Dot />
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(248px,1fr))', gap: 18 }}>
            {GROW.map((g) => {
              const Icon = g.icon;
              return (
                <Link key={g.title} href={g.href} className="n-tile" style={{ display: 'block', background: 'var(--surface-page)', borderRadius: 18, padding: 26, color: 'inherit' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, color: 'var(--color-primary)' }}>
                    <Icon style={{ width: 20, height: 20 }} />
                  </span>
                  <div style={{ marginTop: 18, fontSize: 19, fontWeight: 700, color: 'var(--text-strong)' }}>{g.title}</div>
                  <p style={{ margin: '8px 0 16px', fontSize: 14, lineHeight: 1.45, color: 'var(--text-muted)' }}>{g.copy}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: 'var(--nana-blue-600)' }}>
                    {g.cta}
                    <ArrowRight style={{ width: 15, height: 15 }} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── App CTA ─────────────────────────────────────────── */}
      <Section style={{ padding: 'clamp(56px,9vw,104px) 0', background: 'var(--stone-900)' }}>
        <Container
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))',
            gap: 'clamp(30px,5vw,60px)',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 'clamp(30px,5.2vw,46px)', lineHeight: 1.04, letterSpacing: '-0.045em', fontWeight: 900, color: '#fff' }}>
              Hungry now? The app is faster than this page
              <Dot />
            </h2>
            <p style={{ margin: '16px 0 0', fontSize: 17, lineHeight: 1.5, color: 'var(--stone-400)', maxWidth: '28em' }}>
              Free to download. No hidden fees at checkout, and support that
              picks up.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              <a href={PLAY_STORE} target="_blank" rel="noreferrer" className="n-btn n-btn--primary" style={{ height: 56, padding: '0 26px', fontSize: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/google-icon.svg" alt="" style={{ width: 18, height: 18 }} />
                Google Play
              </a>
              <a href={APP_STORE} target="_blank" rel="noreferrer" className="n-btn n-btn--ghost-dark" style={{ height: 56, padding: '0 26px', fontSize: 16 }}>
                {/* app-store.svg is white — sits on the dark section as-is */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app-store.svg" alt="" style={{ width: 18, height: 18 }} />
                App Store
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
            <div style={{ width: 150, height: 150, borderRadius: 20, background: '#fff', padding: 12 }}>
              <Placeholder label="QR code" radius={10} />
            </div>
            <div style={{ maxWidth: '15em' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Scan to install</div>
              <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.45, color: 'var(--stone-400)' }}>
                Point your camera here and we&apos;ll send you to the right store.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function FloatCard({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: 'absolute', ...style }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          background: '#fff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 14,
          padding: '11px 15px',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--color-primary)', flex: 'none' }} />
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{value}</div>
        </div>
      </div>
    </div>
  );
}

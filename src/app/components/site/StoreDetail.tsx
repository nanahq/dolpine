import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Bike, MapPin, Info } from 'lucide-react';
import { Container, Section, Dot } from './primitives';
import { Placeholder } from './Placeholder';
import { MenuTabs, type MenuGroupVM } from './MenuTabs';
import type { ApiMerchantDetail, ApiReview } from '../../../lib/api/types';
import {
  formatNaira,
  formatPrepWindow,
  formatRating,
  openStatusLabel,
  hoursSummary,
  relativeTime,
  displayName,
  cleanImageUrl,
} from '../../../lib/format';

const chip = (bg: string, color: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  height: 30,
  padding: '0 12px',
  borderRadius: 999,
  background: bg,
  color,
  fontSize: 12.5,
  fontWeight: 600,
  whiteSpace: 'nowrap',
});

function buildMenu(detail: ApiMerchantDetail): MenuGroupVM[] {
  return (detail.category ?? [])
    .map((cat) => ({
      id: cat.id,
      name: cat.name,
      items: (cat.products ?? [])
        .filter((p) => p.is_available)
        .map((p) => ({
          id: p.id,
          name: p.name,
          desc: p.description ?? undefined,
          price: formatNaira(p.sale_price ?? p.base_price),
          imageUrl: cleanImageUrl(p.image_url),
        })),
    }))
    .filter((g) => g.items.length > 0);
}

function ratingBars(reviews: ApiReview[]) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating ?? 0) === star).length,
  }));
  const total = counts.reduce((s, c) => s + c.count, 0) || 1;
  return counts.map((c) => ({ star: c.star, pct: Math.round((c.count / total) * 100) }));
}

export function StoreDetail({
  detail,
  reviews,
}: {
  detail: ApiMerchantDetail;
  reviews: ApiReview[];
}) {
  const menu = buildMenu(detail);
  const bars = ratingBars(reviews);
  const cuisines = detail.cuisine_types?.length
    ? detail.cuisine_types.join(' · ')
    : 'Restaurant';

  return (
    <>
      {/* Cover */}
      <section style={{ position: 'relative', background: 'var(--stone-100)' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '21 / 8', maxHeight: 380, overflow: 'hidden' }}>
          {cleanImageUrl(detail.banner_url) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cleanImageUrl(detail.banner_url)!} alt={detail.business_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Placeholder label="Restaurant cover photo" />
          )}
        </div>
        <Link
          href="/#browse"
          style={{
            position: 'absolute', top: 18, left: 20, display: 'inline-flex', alignItems: 'center', gap: 7,
            height: 38, padding: '0 16px', borderRadius: 999, background: 'rgba(255,255,255,.92)',
            color: 'var(--text-strong)', fontSize: 14, fontWeight: 600, boxShadow: 'var(--shadow-sm)',
          }}
        >
          <ArrowLeft style={{ width: 15, height: 15 }} />
          All stores
        </Link>
      </section>

      {/* Header card */}
      <section>
        <Container>
          <div
            style={{
              background: '#fff', borderRadius: 24, boxShadow: 'var(--shadow-md)', padding: 'clamp(22px,3.4vw,32px)',
              marginTop: -56, position: 'relative', display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 26, alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <span style={{ flex: 'none', width: 74, height: 74, borderRadius: 20, overflow: 'hidden', background: 'var(--stone-100)', boxShadow: 'var(--shadow-xs)' }}>
                {cleanImageUrl(detail.logo_url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cleanImageUrl(detail.logo_url)!} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Placeholder label="Logo" />
                )}
              </span>
              <div>
                <h1 style={{ margin: 0, fontSize: 'clamp(25px,4vw,34px)', lineHeight: 1.1, letterSpacing: '-0.032em', fontWeight: 700, color: 'var(--text-strong)' }}>
                  {detail.business_name}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 9, marginTop: 9, fontSize: 14, color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 700, color: 'var(--text-strong)' }}>
                    <Star style={{ width: 15, height: 15, color: 'var(--nana-amber-400)' }} fill="currentColor" />
                    {formatRating(detail.rating)}
                  </span>
                  <span>({detail.total_reviews} ratings)</span>
                  <span>·</span>
                  <span>{cuisines}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                  <span style={chip('var(--nana-lime-50)', 'var(--nana-lime-700)')}>
                    <Clock style={{ width: 13, height: 13 }} />
                    {formatPrepWindow(detail.preparation_time)}
                  </span>
                  <span style={chip('var(--surface-page)', 'var(--text-body)')}>
                    <Bike style={{ width: 13, height: 13 }} />
                    {formatNaira(detail.delivery_fee) || '—'} delivery
                  </span>
                  <span style={chip('var(--surface-page)', 'var(--text-body)')}>
                    {openStatusLabel(detail.is_open, detail.operating_hours)}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ maxWidth: '16em' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>Ordering happens in the app</div>
                <p style={{ margin: '5px 0 0', fontSize: 13.5, lineHeight: 1.45, color: 'var(--text-muted)' }}>
                  Menus and prices are live here. Scan to order this store in seconds.
                </p>
              </div>
              <div style={{ flex: 'none', width: 104, height: 104, borderRadius: 16, background: 'var(--surface-page)', padding: 9 }}>
                <Placeholder label="QR" radius={8} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Menu */}
      <Section style={{ padding: 'clamp(38px,6vw,64px) 0 clamp(46px,7vw,80px)' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 22 }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.4vw,30px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--text-strong)' }}>
              Menu
              <Dot />
            </h2>
            <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Prices in ₦ · live from the app</span>
          </div>
          <MenuTabs groups={menu} />
        </Container>
      </Section>

      {/* Ratings + reviews */}
      <Section style={{ padding: 'clamp(46px,7vw,80px) 0', background: '#fff', borderTop: '1px solid var(--border-subtle)' }}>
        <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 'clamp(30px,5vw,52px)', alignItems: 'start' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.4vw,30px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--text-strong)' }}>
              What customers say
              <Dot />
            </h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 20 }}>
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text-strong)' }}>
                {formatRating(detail.rating)}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, color: 'var(--nana-amber-400)' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} style={{ width: 14, height: 14 }} fill="currentColor" />
                  ))}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 4 }}>{detail.total_reviews} ratings</div>
              </div>
            </div>
            {reviews.length > 0 && (
              <div style={{ display: 'grid', gap: 9, marginTop: 24, maxWidth: 320 }}>
                {bars.map((b) => (
                  <div key={b.star} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-muted)', width: 12 }}>{b.star}</span>
                    <span style={{ flex: 1, height: 7, borderRadius: 99, background: 'var(--stone-200)', overflow: 'hidden' }}>
                      <span style={{ display: 'block', width: `${b.pct}%`, height: '100%', background: 'var(--color-primary)' }} />
                    </span>
                    <span style={{ fontSize: 12.5, color: 'var(--text-muted)', width: 34, textAlign: 'right' }}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 28, padding: 20, borderRadius: 16, background: 'var(--surface-page)' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)', marginBottom: 12 }}>Store details</div>
              <div style={{ display: 'grid', gap: 10, fontSize: 14, color: 'var(--text-body)' }}>
                {detail.address && (
                  <div style={{ display: 'flex', gap: 9 }}>
                    <MapPin style={{ width: 16, height: 16, color: 'var(--text-subtle)', flex: 'none' }} />
                    <span>{[detail.address.address_line_1, detail.address.city].filter(Boolean).join(', ')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 9 }}>
                  <Clock style={{ width: 16, height: 16, color: 'var(--text-subtle)', flex: 'none' }} />
                  <span>{hoursSummary(detail.operating_hours)}</span>
                </div>
                <div style={{ display: 'flex', gap: 9 }}>
                  <Bike style={{ width: 16, height: 16, color: 'var(--text-subtle)', flex: 'none' }} />
                  <span>{formatNaira(detail.delivery_fee) || '—'} delivery{detail.address?.city ? ` around ${detail.address.city}` : ''}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {reviews.slice(0, 3).map((r) => (
              <div key={r.id} style={{ background: 'var(--surface-page)', borderRadius: 18, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: 'var(--stone-200)', flex: 'none' }}>
                      {cleanImageUrl(r.author?.profile_image_url) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cleanImageUrl(r.author?.profile_image_url)!} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Placeholder />
                      )}
                    </span>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-strong)' }}>{displayName(r.author?.full_name)}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{relativeTime(r.created_at)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 2, color: 'var(--nana-amber-400)', flex: 'none' }}>
                    {Array.from({ length: Math.max(0, Math.round(r.rating ?? 0)) }).map((_, i) => (
                      <Star key={i} style={{ width: 13, height: 13 }} fill="currentColor" />
                    ))}
                  </div>
                </div>
                {r.comment ? (
                  <p style={{ margin: '13px 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--text-body)' }}>{r.comment}</p>
                ) : null}
              </div>
            ))}
            {reviews.length === 0 && (
              <div style={{ background: 'var(--surface-page)', borderRadius: 18, padding: 22, fontSize: 15, color: 'var(--text-muted)' }}>
                No written reviews yet — be the first to order and rate this store in the app.
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 20, borderRadius: 18, background: 'var(--nana-blue-50)' }}>
              <Info style={{ width: 20, height: 20, color: 'var(--nana-blue-600)', flex: 'none' }} />
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: 'var(--nana-blue-800)' }}>
                Only customers who completed an order can rate a store. Ratings older than a year are dropped.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

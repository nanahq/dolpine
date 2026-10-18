'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    n: '01',
    title: 'Food',
    copy: 'Restaurants near you, hot and on time.',
    href: '/marketplace?cat=food',
    bg: 'var(--blue)',
    fg: 'var(--ink)',
    dot: ['var(--ink)', '#fff'],
  },
  {
    n: '02',
    title: 'Groceries',
    copy: 'Staples, produce and household, picked fresh.',
    href: '/marketplace?cat=grocery',
    bg: 'var(--green)',
    fg: '#fff',
    dot: ['var(--yellow)', 'var(--ink)'],
  },
  {
    n: '03 · In the app',
    title: 'Errands',
    copy: 'Write a list. A rider shops any store.',
    href: '#get-app',
    bg: 'var(--yellow)',
    fg: 'var(--ink)',
    dot: ['var(--ink)', '#fff'],
  },
  {
    n: '04 · In the app',
    title: 'Parcels',
    copy: 'Send anything across the city, tracked live.',
    href: '#get-app',
    bg: 'var(--ink)',
    fg: '#fff',
    dot: ['var(--blue)', 'var(--ink)'],
  },
];

// Lines the first card up with the .v-wrap content edge, while the track bleeds to the viewport.
const EDGE = 'max(var(--gutter), calc((100vw - 1280px) / 2 + var(--gutter)))';

/**
 * Pins the section while vertical scroll drives the cards sideways.
 * The section is made taller by exactly the track's overflow, so the last
 * card lands at the edge just as the pin releases.
 */
export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPinned(false);
      return;
    }
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let distance = 0;
    let frame = 0;
    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      setTravel(distance);
    };
    const update = () => {
      frame = 0;
      const progress = Math.min(
        1,
        Math.max(0, -section.getBoundingClientRect().top / (distance || 1)),
      );
      track.style.transform = `translate3d(${-progress * distance}px,0,0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div style={{ paddingTop: 'clamp(96px,10vw,140px)' }}>
      <div
        className="v-wrap v-reveal"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <h2 className="v-h2">
          One app.
          <br />
          Four ways
          <br />
          to get it done.
        </h2>
        <p className="v-lede" style={{ maxWidth: 380 }}>
          Order from a menu, shop a store, send a rider with a list, or move a
          parcel across town.
        </p>
      </div>
      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          height: pinned ? `calc(100vh + ${travel}px)` : 'auto',
        }}
      >
        <div
          style={{
            position: pinned ? 'sticky' : 'relative',
            top: 0,
            height: pinned ? '100vh' : 'auto',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // Clears the fixed site header so the card sits centred in what's left.
            padding: pinned ? '72px 0 16px' : '40px 0',
            boxSizing: 'border-box',
          }}
        >
          <div
            ref={trackRef}
            className={pinned ? undefined : 'v-rail'}
            style={{
              display: 'flex',
              gap: 'clamp(14px,1.6vw,24px)',
              margin: 0,
              width: pinned ? 'max-content' : undefined,
              paddingLeft: EDGE,
              paddingRight: EDGE,
              willChange: pinned ? 'transform' : undefined,
            }}
          >
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="v-tap"
                style={{
                  flexShrink: 0,
                  width: 'max(50vw, min(86vw, 520px))',
                  height: 'max(60vh, 380px)',
                  borderRadius: 'clamp(28px,3vw,40px)',
                  background: s.bg,
                  padding: 'clamp(24px,3vw,40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: s.fg }}>
                    {s.n}
                  </span>
                  <span
                    style={{
                      width: 'clamp(48px,4.5vw,60px)',
                      height: 'clamp(48px,4.5vw,60px)',
                      borderRadius: 999,
                      background: s.dot[0],
                      color: s.dot[1],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                    }}
                  >
                    →
                  </span>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                >
                  <span
                    className="v-display v-display--black"
                    style={{
                      fontSize: 'clamp(60px,8vw,144px)',
                      lineHeight: 0.85,
                      color: s.fg,
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(16px,1.4vw,19px)',
                      lineHeight: 1.45,
                      color: s.fg,
                      maxWidth: 380,
                    }}
                  >
                    {s.copy}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

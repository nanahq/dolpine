import React from 'react';

/** Full-bleed coloured hero used by every secondary page. */
export function PageHero({
  bg,
  fg = 'var(--ink)',
  eyebrow,
  eyebrowFg,
  title,
  lede,
  ledeFg,
  size = 'clamp(72px,11vw,180px)',
  children,
}: {
  bg: string;
  fg?: string;
  eyebrow: string;
  eyebrowFg?: string;
  title: React.ReactNode;
  lede: string;
  ledeFg?: string;
  size?: string;
  children?: React.ReactNode;
}) {
  return (
    <section style={{ background: bg }}>
      <div className="v-wrap" style={{ paddingTop: 'clamp(56px,8vw,120px)', paddingBottom: 'clamp(56px,8vw,120px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <span className="v-eyebrow v-rise" style={{ color: eyebrowFg ?? fg, animationDuration: '.8s' }}>{eyebrow}</span>
        <h1 className="v-display v-rise" style={{ fontSize: size, color: fg, animationDelay: '.1s' }}>{title}</h1>
        <p className="v-rise" style={{ margin: 0, fontSize: 'clamp(18px,1.8vw,22px)', lineHeight: 1.5, color: ledeFg ?? fg, maxWidth: 600, animationDelay: '.2s' }}>{lede}</p>
        {children}
      </div>
    </section>
  );
}

/** "01 / 02 / 03" benefit list beside a sign-up form. */
export function NumberedPoints({ points, numColor }: { points: { title: string; copy: string }[]; numColor: string }) {
  return (
    <>
      {points.map((p, i) => (
        <div key={p.title} className="v-reveal" style={{ display: 'flex', gap: 20 }}>
          <span className="v-display v-display--black" style={{ fontSize: 72, lineHeight: 0.8, color: numColor, width: 72, flexShrink: 0 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 600 }}>{p.title}</span>
            <span style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--muted)' }}>{p.copy}</span>
          </div>
        </div>
      ))}
    </>
  );
}

/** Green tick and big uppercase thank-you shown in place of a submitted form. */
export function SentState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="v-rise" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', animationDuration: '.6s' }}>
      <div className="v-pop" style={{ width: 72, height: 72, borderRadius: 999, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 34, color: '#fff' }}>✓</span>
      </div>
      <span className="v-display" style={{ fontSize: 56, lineHeight: 0.88 }}>{title}</span>
      <span style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--muted)' }}>{copy}</span>
    </div>
  );
}

export function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((o) => (
        <button key={o} type="button" className={`v-chip${o === value ? ' is-on' : ''}`} onClick={() => onChange(o)} aria-pressed={o === value}>
          {o}
        </button>
      ))}
    </div>
  );
}

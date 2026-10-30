import React from 'react';

export type Bar = { label: string; value: number; tip: string; partial?: boolean };

/**
 * Single-series column chart. Negative values hang below a zero line (in danger red);
 * a still-running period is hatched so it doesn't read as a drop.
 */
export function BarChart({ bars, height = 180, variant }: { bars: Bar[]; height?: number; variant?: 'burn' }) {
  const max = Math.max(0, ...bars.map((b) => b.value));
  const min = Math.min(0, ...bars.map((b) => b.value));
  const span = max - min || 1;
  const posH = (max / span) * height;
  const negH = height - posH;

  return (
    <div>
      <div className={`im-bars${variant ? ` im-bars--${variant}` : ''}`} style={{ height }}>
        {min < 0 && <div className="im-zero" style={{ top: posH }} />}
        {bars.map((b, i) => (
          <div key={b.label} className={`im-col${b.partial ? ' im-col--partial' : ''}`}>
            {/* Edge columns anchor the tooltip inward so it isn't clipped by the page. */}
            <span className="im-tip" style={i < 2 ? { left: 0, transform: 'none' } : i >= bars.length - 2 ? { left: 'auto', right: 0, transform: 'none' } : undefined}>
              {b.tip}
            </span>
            <div className="im-col__pos" style={{ height: posH }}>
              {b.value > 0 && <div className="im-bar" style={{ height: (b.value / span) * height }} />}
            </div>
            <div className="im-col__neg" style={{ height: negH }}>
              {b.value < 0 && <div className="im-bar" style={{ height: (-b.value / span) * height }} />}
            </div>
          </div>
        ))}
      </div>
      <div className="im-axis">
        {bars.map((b) => (
          <span key={b.label}>{b.label}</span>
        ))}
      </div>
    </div>
  );
}

export function Stat({ label, value, note, tag }: { label: string; value: string; note?: string; tag?: string }) {
  return (
    <div className="v-panel" style={{ gap: 8 }}>
      {tag && <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--blue-ink)' }}>{tag}</span>}
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{label}</span>
      <span className="v-h3 v-num" style={{ fontSize: 36, color: 'var(--ink)' }}>{value}</span>
      {note && <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.4 }}>{note}</span>}
    </div>
  );
}

export function Panel({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="v-panel" style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
        {sub && <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.45 }}>{sub}</span>}
      </div>
      {children}
    </div>
  );
}

/** One-hue sequential fill for a retention %: light blue at 0 → deep blue at `ceiling`. */
export function heat(pctValue: number, ceiling: number): React.CSSProperties {
  const t = Math.min(1, pctValue / ceiling);
  return {
    background: `color-mix(in srgb, var(--blue-deep) ${Math.round(8 + t * 82)}%, #fff)`,
    color: t > 0.45 ? '#fff' : 'var(--text)',
  };
}

function H2({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h2 className="v-h3" style={{ fontSize: 'clamp(26px,3vw,36px)', color: 'var(--ink)' }}>{children}</h2>
      {sub && <p className="v-lede" style={{ fontSize: 15, maxWidth: 720 }}>{sub}</p>}
    </div>
  );
}

export function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <H2 sub={sub}>{title}</H2>
      {children}
    </section>
  );
}

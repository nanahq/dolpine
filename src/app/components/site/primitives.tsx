import React from 'react';

/** Centered 1180px content column with 20px side gutters. */
export const Container: React.FC<
  React.PropsWithChildren<{ style?: React.CSSProperties; max?: number }>
> = ({ children, style, max = 1180 }) => (
  <div style={{ maxWidth: max, margin: '0 auto', padding: '0 20px', ...style }}>
    {children}
  </div>
);

/** A page section. Reveals on scroll unless `noReveal` is set. */
export const Section: React.FC<
  React.PropsWithChildren<{
    style?: React.CSSProperties;
    className?: string;
    id?: string;
    noReveal?: boolean;
  }>
> = ({ children, style, className = '', id, noReveal }) => (
  <section
    id={id}
    className={`${noReveal ? '' : 'n-reveal'} ${className}`.trim()}
    style={style}
  >
    {children}
  </section>
);

/** The primary-blue full stop that terminates most Nana headings. */
export const Dot: React.FC = () => (
  <span style={{ color: 'var(--color-primary)' }}>.</span>
);

/** Small overline label with a leading dot (or uppercase variant). */
export const Eyebrow: React.FC<
  React.PropsWithChildren<{ upper?: boolean; style?: React.CSSProperties }>
> = ({ children, upper, style }) => (
  <div
    className={`n-eyebrow ${upper ? 'n-eyebrow--upper' : ''}`.trim()}
    style={{ marginBottom: 14, ...style }}
  >
    {children}
  </div>
);

/** Labelled text input matching the DS Input component. */
export const Field: React.FC<{
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
}> = ({ label, type = 'text', placeholder, required, name }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label ? (
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>
        {label}
      </span>
    ) : null}
    <input
      className="n-input"
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
    />
  </label>
);

/** Labelled select matching the DS styling. */
export const SelectField: React.FC<
  React.PropsWithChildren<{ label: string; required?: boolean; name?: string }>
> = ({ label, required, name, children }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>
      {label}
    </span>
    <select className="n-select" required={required} name={name} defaultValue="">
      {children}
    </select>
  </label>
);

/** Labelled textarea. */
export const TextareaField: React.FC<{
  label: string;
  placeholder?: string;
  rows?: number;
  name?: string;
}> = ({ label, placeholder, rows = 4, name }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>
      {label}
    </span>
    <textarea
      className="n-textarea"
      rows={rows}
      name={name}
      placeholder={placeholder}
    />
  </label>
);

/** Selectable chip matching the DS Tag component (used for menu tabs). */
export const Tag: React.FC<
  React.PropsWithChildren<{ selected?: boolean; onClick?: () => void }>
> = ({ selected, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 38,
      padding: '0 16px',
      borderRadius: 999,
      whiteSpace: 'nowrap',
      fontSize: 14,
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      border: selected ? '1.5px solid var(--color-primary)' : '1.5px solid var(--border-subtle)',
      background: selected ? 'var(--color-primary)' : '#fff',
      color: selected ? '#fff' : 'var(--text-body)',
      transition: 'all 160ms var(--ease-standard)',
    }}
  >
    {children}
  </button>
);

/** Success confirmation panel shown after a form submits. */
export const FormSuccess: React.FC<{ title: React.ReactNode; body: string }> = ({
  title,
  body,
}) => (
  <div style={{ textAlign: 'center', padding: '26px 0' }}>
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'var(--nana-lime-50)',
        color: 'var(--nana-lime-600)',
      }}
    >
      {/* check drawn with border to avoid an extra icon import here */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    </span>
    <h2
      style={{
        margin: '20px 0 0',
        fontSize: 26,
        letterSpacing: '-0.02em',
        fontWeight: 700,
        color: 'var(--text-strong)',
      }}
    >
      {title}
    </h2>
    <p
      style={{
        margin: '10px auto 0',
        fontSize: 16,
        lineHeight: 1.5,
        color: 'var(--text-muted)',
        maxWidth: '26em',
      }}
    >
      {body}
    </p>
  </div>
);

/** Shared heading style helpers so pages stay consistent. */
export const h2Style: React.CSSProperties = {
  margin: 0,
  fontSize: 'clamp(25px,4.2vw,36px)',
  lineHeight: 1.08,
  letterSpacing: '-0.032em',
  fontWeight: 700,
  color: 'var(--text-strong)',
};

import React from 'react';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders an article's markdown with the help centre's own type scale.
 *
 * No `rehype-raw` on purpose: react-markdown ignores raw HTML by default, so a
 * markdown file can never inject a script or an iframe into the marketing site.
 */

const listStyle: React.CSSProperties = {
  margin: '22px 0 0',
  paddingLeft: 22,
  display: 'grid',
  gap: 12,
  fontSize: 16.5,
  lineHeight: 1.55,
  color: 'var(--text-body)',
};

const cellStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid var(--border-subtle)',
  fontSize: 15,
  lineHeight: 1.5,
  textAlign: 'left',
  verticalAlign: 'top',
};

const components: Components = {
  h1: ({ children }) => (
    <h2 style={{ margin: '38px 0 0', fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--text-strong)' }}>
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 style={{ margin: '38px 0 0', fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.018em', fontWeight: 700, color: 'var(--text-strong)' }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ margin: '30px 0 0', fontSize: 18, lineHeight: 1.25, fontWeight: 700, color: 'var(--text-strong)' }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ margin: '26px 0 0', fontSize: 16, lineHeight: 1.3, fontWeight: 700, color: 'var(--text-strong)' }}>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p style={{ margin: '22px 0 0', fontSize: 17, lineHeight: 1.6, color: 'var(--text-body)' }}>{children}</p>
  ),
  ol: ({ children }) => <ol style={listStyle}>{children}</ol>,
  ul: ({ children }) => <ul style={listStyle}>{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong style={{ color: 'var(--text-strong)' }}>{children}</strong>,
  a: ({ href, children }) => {
    const to = href ?? '#';
    // Internal links keep client-side navigation; anything else opens away.
    return to.startsWith('/') ? (
      <Link href={to} style={{ fontWeight: 600 }}>
        {children}
      </Link>
    ) : (
      <a href={to} target="_blank" rel="noreferrer noopener" style={{ fontWeight: 600 }}>
        {children}
      </a>
    );
  },
  // Blockquotes are the authoring shorthand for the help centre's callout box.
  blockquote: ({ children }) => (
    <div style={{ marginTop: 26, padding: '4px 20px', borderRadius: 16, background: 'var(--nana-blue-50)', color: 'var(--nana-blue-800)', fontSize: 15, lineHeight: 1.55 }}>
      {children}
    </div>
  ),
  hr: () => <hr style={{ margin: '32px 0 0', border: 0, borderTop: '1px solid var(--border-subtle)' }} />,
  code: ({ children }) => (
    <code style={{ padding: '2px 6px', borderRadius: 6, background: 'var(--surface-sunken)', fontSize: '0.9em' }}>
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre style={{ margin: '22px 0 0', padding: 18, borderRadius: 14, background: 'var(--surface-sunken)', overflowX: 'auto', fontSize: 14, lineHeight: 1.5 }}>
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div style={{ marginTop: 24, overflowX: 'auto', borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th style={{ ...cellStyle, fontWeight: 700, color: 'var(--text-strong)' }}>{children}</th>
  ),
  td: ({ children }) => <td style={{ ...cellStyle, color: 'var(--text-body)' }}>{children}</td>,
  img: ({ src, alt }) =>
    typeof src === 'string' ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ''}
        style={{ marginTop: 24, width: '100%', height: 'auto', borderRadius: 16, display: 'block' }}
      />
    ) : null,
};

export function ArticleMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}

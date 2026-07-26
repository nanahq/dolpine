import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Section, Eyebrow } from '../../components/site/primitives';
import { ARTICLES, ARTICLE_SLUGS, type Block } from '../articles';

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug];
  return { title: article ? article.title : 'Help' };
}

/** Minimal **bold** renderer — the seam markdown will replace later. */
function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

const calloutTone: Record<'blue' | 'amber', { bg: string; color: string }> = {
  blue: { bg: 'var(--nana-blue-50)', color: 'var(--nana-blue-800)' },
  amber: { bg: 'var(--nana-amber-50)', color: 'var(--nana-amber-600)' },
};

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p style={{ margin: '22px 0 0', fontSize: 17, lineHeight: 1.6, color: 'var(--text-body)' }}>
          {renderInline(block.text)}
        </p>
      );
    case 'ol':
      return (
        <ol style={{ margin: '22px 0 0', paddingLeft: 22, display: 'grid', gap: 12, fontSize: 16.5, lineHeight: 1.55, color: 'var(--text-body)' }}>
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    case 'callout': {
      const tone = calloutTone[block.tone];
      return (
        <div style={{ marginTop: 26, padding: 20, borderRadius: 16, background: tone.bg, fontSize: 15, lineHeight: 1.55, color: tone.color }}>
          {renderInline(block.text)}
        </div>
      );
    }
    case 'cards':
      return (
        <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
          {block.items.map((c) => (
            <div key={c.title} style={{ padding: '18px 20px', borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-strong)' }}>{c.title}</div>
              <p style={{ margin: '5px 0 0', fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)' }}>{c.copy}</p>
            </div>
          ))}
        </div>
      );
    case 'rows':
      return (
        <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
          {block.items.map((r) => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, padding: '18px 20px', borderRadius: 16, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: 15.5, color: 'var(--text-body)' }}>{r.label}</span>
              <span style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text-strong)' }}>{r.value}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug];
  if (!article) notFound();

  return (
    <Section noReveal style={{ padding: 'clamp(28px,4vw,44px) 0 clamp(46px,7vw,84px)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
        <Link href="/help" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: 'var(--nana-blue-600)', marginBottom: 24 }}>
          <ArrowLeft style={{ width: 15, height: 15 }} />
          Help centre
        </Link>

        <article>
          <Eyebrow style={{ marginBottom: 12 }}>{article.category}</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'clamp(28px,4.8vw,40px)', lineHeight: 1.08, letterSpacing: '-0.032em', fontWeight: 700, color: 'var(--text-strong)' }}>
            {article.title}
          </h1>
          <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--text-subtle)' }}>{article.meta}</p>

          {article.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}

          {article.related.length > 0 && (
            <div style={{ marginTop: 34, paddingTop: 24, borderTop: '1px solid var(--border-subtle)', display: 'grid', gap: 10 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>Related</div>
              {article.related.map((r) => (
                <Link key={r.href} href={r.href} style={{ fontSize: 15.5, fontWeight: 600 }}>
                  {r.label}
                </Link>
              ))}
            </div>
          )}
        </article>
      </div>
    </Section>
  );
}

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Section, Eyebrow } from '../../components/site/primitives';
import { getHelpArticle, getHelpArticles } from '@/lib/api/help';
import { ArticleMarkdown } from '../article-markdown';

/** Articles change rarely; five minutes is enough for a publish to land. */
export const revalidate = 300;

/**
 * Prerender the articles that exist at build time. New ones are rendered on
 * first request and then cached — an unreachable API returns [] here, which
 * degrades to fully on-demand rendering rather than failing the build.
 */
export async function generateStaticParams() {
  const articles = await getHelpArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getHelpArticle(params.slug);
  if (!article) return { title: 'Help' };
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, type: 'article' },
  };
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

/** "Updated March 2026 · 2 min read", derived rather than authored. */
function metaLine(updatedAt: string, body: string): string {
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `Updated ${dateFmt.format(new Date(updatedAt))} · ${minutes} min read`;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getHelpArticle(params.slug);
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
          <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--text-subtle)' }}>
            {metaLine(article.updated_at, article.body_md)}
          </p>

          <ArticleMarkdown>{article.body_md}</ArticleMarkdown>

          {article.related.length > 0 && (
            <div style={{ marginTop: 34, paddingTop: 24, borderTop: '1px solid var(--border-subtle)', display: 'grid', gap: 10 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>Related</div>
              {article.related.map((r) => (
                <Link key={r.slug} href={`/help/${r.slug}`} style={{ fontSize: 15.5, fontWeight: 600 }}>
                  {r.title}
                </Link>
              ))}
            </div>
          )}
        </article>
      </div>
    </Section>
  );
}

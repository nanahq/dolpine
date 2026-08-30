import { apiGet } from './config';

/** Card-level article data — what `/help-articles` returns. No body. */
export interface HelpArticleSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  position: number;
  published_at: string | null;
  updated_at: string;
}

export interface HelpArticle extends HelpArticleSummary {
  body_md: string;
  related: { slug: string; title: string }[];
}

/** One help-centre section: a category and the articles filed under it. */
export interface HelpCategory {
  title: string;
  items: HelpArticleSummary[];
}

/**
 * Every published article, already ordered by category then position on the
 * API side. Returns [] if the API is unreachable — the help page still renders
 * its search box and quick answers rather than 500ing.
 */
export async function getHelpArticles(): Promise<HelpArticleSummary[]> {
  return (await apiGet<HelpArticleSummary[]>('help-articles')) ?? [];
}

/** The same list, grouped into the sections the help index renders. */
export async function getHelpCategories(): Promise<HelpCategory[]> {
  const articles = await getHelpArticles();
  const sections: HelpCategory[] = [];

  for (const article of articles) {
    const last = sections[sections.length - 1];
    if (last && last.title === article.category) last.items.push(article);
    else sections.push({ title: article.category, items: [article] });
  }

  return sections;
}

/** One article by slug, with its markdown body. `null` when it doesn't exist. */
export async function getHelpArticle(slug: string): Promise<HelpArticle | null> {
  return apiGet<HelpArticle>(`help-articles/${encodeURIComponent(slug)}`);
}

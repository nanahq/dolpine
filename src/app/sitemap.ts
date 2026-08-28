import type { MetadataRoute } from 'next';
import { getAllMerchants } from '@/lib/api/merchants';
import { ARTICLE_SLUGS } from './help/articles';

const SITE_URL = 'https://trynanaapp.com';

/**
 * Public marketing routes.
 *
 * Deliberately excluded, because they are transactional rather than content
 * and carry a per-visitor token or auto-redirect away: `/open`, `/upload`,
 * `/track/[order_id]`, `/collect/[token]` and `/drops/[id]`. They are also
 * disallowed in robots.ts.
 */
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/merchant', priority: 0.9, changeFrequency: 'daily' },
  { path: '/vendors', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/riders', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/help', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/download', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/investors', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/delete', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

/** Refresh hourly so newly onboarded merchants appear without a redeploy. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // If the API is unreachable this returns [], leaving the static routes
  // intact — a thin sitemap beats a build failure or a 500 on /sitemap.xml.
  const merchants = await getAllMerchants();

  return [
    ...ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...ARTICLE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/help/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...merchants.map((merchant) => ({
      url: `${SITE_URL}/merchant/${merchant.id}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}

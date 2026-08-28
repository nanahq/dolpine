import type { MetadataRoute } from 'next';

const SITE_URL = 'https://trynanaapp.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Per-visitor or transactional URLs. Keeping them out of the index also
      // stops order-tracking and collection links leaking into search results.
      disallow: ['/api/', '/open', '/upload', '/track/', '/collect/', '/drops/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

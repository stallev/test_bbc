import type { MetadataRoute } from 'next';
import { DOMAIN_NAME } from '@/constants/EndpointsList';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '*?w=*',
      disallow: '*?*',
    },
    sitemap: `${DOMAIN_NAME}/sitemapindex.xml`,
  };
}

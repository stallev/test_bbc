/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const upcomingSitemapUrl = `${siteUrl}/upcoming-events/upcoming-sitemap.xml`;
const blogSitemapUrl = `${siteUrl}/blog/blog-sitemap.xml`;
const timelineEventsSitemapUrl = `${siteUrl}/timeline/timeline-sitemap.xml`;
const staffSitemapUrl = `${siteUrl}/staff/staff-sitemap.xml`;
const policies = [
  { 
    userAgent: '*',
    disallow: [
      '*?*',
    ],
    allow: [
      '*?w=*',
    ],
  },
];

const excludeOptions = [
  '/blog/*',
  '/staff/*',
  '/timeline/*',
  '/upcoming-events/*',
  '/404',
  '/blog/blog-sitemap.xml',
  '/upcoming-events/upcoming-sitemap.xml',
  '/timeline/timeline-sitemap.xml',
  '/staff/staff-sitemap.xml',
  '/ru*',
  '/en*',
];

const robotsTxtOptions = {
  additionalSitemaps: [
    blogSitemapUrl,
    staffSitemapUrl,
    timelineEventsSitemapUrl,
    upcomingSitemapUrl,
  ],
  policies,
};

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'yearly',
  autoLastmod: false,
  exclude: excludeOptions,
  robotsTxtOptions,
};

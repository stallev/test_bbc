/** @type {import('next').NextConfig} */
const { settings } = require("./src/config/config.json");

const languages = settings.languages;
const defaultLanguage = settings.default_language;

const otherLanguages = languages.filter((lang) => lang !== defaultLanguage);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://maps.google.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://i.ytimg.com https://testwordpressmedia1.s3.amazonaws.com https://maps.googleapis.com https://maps.gstatic.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  frame-src 'self' https://wallet.subsplash.com https://subsplash.com https://www.youtube-nocookie.com/ https://testwordpressmedia1.s3.amazonaws.com/;
  connect-src 'self' https://api.iconify.design https://testchurchapi.stallevs.ru/graphql https://testchurchapi.stallevs.ru/wp-json/timeline/timeline-data https://testchurchapi.stallevs.ru/wp-json/events/upcoming-events-list https://www.googleapis.com/youtube/v3/playlistItems https://youtube.googleapis.com/youtube/v3/videos https://maps.googleapis.com;
  media-src 'self' https://testwordpressmedia1.s3.amazonaws.com https://testchurchapi.stallevs.ru/;
`;

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [425, 570, 768, 1024],
    imageSizes: [16, 64, 96, 128, 256, 384, 512],
    domains: ['testwordpressmedia1.s3.amazonaws.com', 'secure.gravatar.com', 'testchurchapi.stallevs.ru', '3.85.115.123'],
    minimumCacheTTL: 86400,
  },
  reactStrictMode: true,
  output: "standalone",
  compress: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: `/:locale(!${defaultLanguage}|${otherLanguages.join("|")})/:path*`,
        destination: `/:locale/:path*`,
      },
      {
        source: `/:path*`,
        destination: `/${defaultLanguage}/:path*`,
      },
    ];
  },
};

module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

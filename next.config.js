/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { i18n } = require('./next-i18next.config');

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://i.ytimg.com https://testwordpressmedia1.s3.amazonaws.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  frame-src 'self' https://wallet.subsplash.com https://subsplash.com https://www.youtube-nocookie.com/;
  connect-src 'self' https://api.iconify.design;
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
  compress: true,
  i18n,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
};

module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

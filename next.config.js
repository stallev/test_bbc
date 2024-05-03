/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { i18n } = require('./next-i18next.config');

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
};

module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;

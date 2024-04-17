/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = () => {
  return {
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [425, 570, 768, 1024],
      imageSizes: [16, 64, 96, 128, 256, 384, 512],
      domains: ['testchurchapi.stallevs.ru', 'testwordpressmedia1.s3.amazonaws.com', 'secure.gravatar.com', '1.gravatar.com', 'ec2-18-205-106-197.compute-1.amazonaws.com', 'bbc'],
      minimumCacheTTL: 86400,
    },
    reactStrictMode: true,
    compress: true,
    i18n,
  };
};

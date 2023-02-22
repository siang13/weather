/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
  output: 'standalone',
};

module.exports = nextConfig;

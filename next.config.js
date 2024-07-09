/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/PokeAPI/sprites/**',
        }
      ],
    },
  }

module.exports.default = nextConfig;

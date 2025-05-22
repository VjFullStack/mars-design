/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',  // Contentful assets domain
      },
      {
        protocol: 'https',
        hostname: 'downloads.ctfassets.net', // Contentful downloads domain
      },
    ],
  },
}

module.exports = nextConfig

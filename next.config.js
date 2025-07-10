/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the output: 'export' as it's incompatible with server actions
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['localhost'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

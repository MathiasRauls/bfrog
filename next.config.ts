import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Prefer AVIF then WebP — best compression for modern browsers
    formats: ['image/avif', 'image/webp'],
    // Explicit quality allowlist (required in v16)
    qualities: [50, 75, 90],
    // Tightened in v16: max 3 redirects when resolving image URLs
    maximumRedirects: 3,
    // Remote image sources — use remotePatterns, not deprecated domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
    ],
  },
};

export default nextConfig;

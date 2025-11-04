import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Se usar SVGs externos, habilite:
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  poweredByHeader: false,
  reactStrictMode: true,

  // Deixe o _next/image e estáticos cachearem corretamente
  headers: async () => [
    {
      source: '/_next/image',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/_next/static/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/(.*)',
      headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
    },
  ],
};

export default nextConfig;

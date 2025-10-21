import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '4qozbotg9nhsxukb.public.blob.vercel-storage.com' },
      // Supabase: explicitar o pathname ajuda o otimizador
      { protocol: 'https', hostname: 'nfwfolrcpaxqwgkzzfok.supabase.co', pathname: '/storage/v1/object/**' },
      // Se usar o transformador do Supabase no futuro:
      // { protocol: 'https', hostname: 'nfwfolrcpaxqwgkzzfok.supabase.co', pathname: '/storage/v1/render/image/**' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
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

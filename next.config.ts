import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      '4qozbotg9nhsxukb.public.blob.vercel-storage.com',
      'nfwfolrcpaxqwgkzzfok.supabase.co',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '4qozbotg9nhsxukb.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'nfwfolrcpaxqwgkzzfok.supabase.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

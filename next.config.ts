import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Local product/mural shots are already web-optimized; skipping the
    // on-demand optimizer keeps dev fast and avoids the demo's image pipeline
    // stalling on first load.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig

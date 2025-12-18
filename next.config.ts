import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export for Vercel deployment
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://app.coiep.com',
  },
}

export default nextConfig

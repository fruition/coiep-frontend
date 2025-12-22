import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://app.coiep.com',
  },
}

export default nextConfig

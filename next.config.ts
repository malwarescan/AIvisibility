// next.config.ts - Self-Validating Configuration
import type { NextConfig } from 'next'

// SAFETY CHECK: Prevent dangerous experimental features
const validateExperimentalConfig = (config: any) => {
  if (config.experimental?.optimizeCss === true) {
    console.error('🚨 DANGER: optimizeCss is enabled!')
    console.error('This requires critters dependency and has caused site breakages.')
    console.error('Set ALLOW_EXPERIMENTAL=true environment variable to override.')
    
    if (process.env.ALLOW_EXPERIMENTAL !== 'true') {
      console.error('Forcing optimizeCss to false for safety.')
      config.experimental.optimizeCss = false
    }
  }
}

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // ✅ KEEP FALSE - Required for stability
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

// Validate configuration before export
validateExperimentalConfig(nextConfig)

export default nextConfig

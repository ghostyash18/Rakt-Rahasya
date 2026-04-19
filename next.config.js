/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed `appDir` — Next is rejecting this option in this environment.
  // The framework will auto-detect the `app/` folder when supported.
  images: {
    domains: ['localhost'],
  },
  // Provide a safe default for CUSTOM_KEY so Next sees a string value.
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
  },
}

module.exports = nextConfig

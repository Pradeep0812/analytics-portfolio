/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization for Netlify compatibility
  images: {
    unoptimized: true,
  },
  // Strict mode for better development
  reactStrictMode: true,
  // Trailing slashes for consistent routing
  trailingSlash: true,
  // Note: DO NOT use 'output: standalone' - Netlify's Next.js plugin manages this
};

module.exports = nextConfig;

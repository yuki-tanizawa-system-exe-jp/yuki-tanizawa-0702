/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercelでは output: 'export' は不要
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Vercelでは basePath と assetPrefix は不要
}

module.exports = nextConfig
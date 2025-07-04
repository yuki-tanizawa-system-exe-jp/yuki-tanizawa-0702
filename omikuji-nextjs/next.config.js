/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/omikuji-nextjs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/omikuji-nextjs/' : '',
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages用に静的エクスポートを有効化
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages用の設定（必要に応じて変更）
  // basePath: '/yuki-tanizawa-0702',
  // assetPrefix: '/yuki-tanizawa-0702',
}

module.exports = nextConfig
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = withMDX(nextConfig) 
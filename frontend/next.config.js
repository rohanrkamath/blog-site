/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment settings
  output: 'standalone', // Better for Vercel than 'export'
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Image optimization for Vercel
  images: {
    unoptimized: false, // Enable Vercel's image optimization
    formats: ['image/webp', 'image/avif'],
  },

  // Webpack fallbacks for Node.js modules
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },

  // Vercel-specific optimizations
  experimental: {
    // Enable Vercel's edge runtime features
    serverComponentsExternalPackages: ['gray-matter', 'remark', 'remark-gfm', 'remark-html', 'reading-time'],
  },
}

module.exports = nextConfig 
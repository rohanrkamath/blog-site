const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5051",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.atakanuludag.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "atakanuludag.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.atakanuludag.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-rkamath-blog-site-production.up.railway.app',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    domains: ['localhost', 'images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/article/:path*',
        destination: 'http://localhost:4000/article/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

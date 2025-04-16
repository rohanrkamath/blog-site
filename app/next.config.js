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
    ],
    domains: ['localhost'],
  },
};

module.exports = nextConfig;

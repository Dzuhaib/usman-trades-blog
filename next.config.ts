import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/lib": path.resolve(__dirname, "lib"),
    };
    return config;
  },
  serverExternalPackages: ["@tailwindcss/oxide", "@tailwindcss/postcss", "@tailwindcss/node", "lightningcss"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home/',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

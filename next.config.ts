import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@tailwindcss/oxide", "@tailwindcss/postcss", "@tailwindcss/node", "lightningcss"],
  images: {
    domains: ['images.pexels.com'],
  },
};

export default nextConfig;

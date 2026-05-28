import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@tailwindcss/oxide", "@tailwindcss/postcss", "@tailwindcss/node", "lightningcss"],
};

export default nextConfig;

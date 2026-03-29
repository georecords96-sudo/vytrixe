import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["child_process"],
  experimental: {
    // appDir: true, // App Router is default in Next 14+
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack root needs to be set to current directory to keep it isolated from parent
  experimental: {
    turbopack: {
      root: "./",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-511f742672b04e3b87f54eaabdf2a80d.r2.dev",
      },
    ],
  },
};

export default nextConfig;

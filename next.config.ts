import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
      },
      {
        hostname: "lajwicgoysuobrdzahou.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

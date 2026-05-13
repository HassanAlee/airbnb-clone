import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
    KINDE_POST_LOGOUT_REDIRECT_URL:
      process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`,
    KINDE_POST_LOGIN_REDIRECT_URL:
      process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
      `https://${process.env.VERCEL_URL}/api/auth/create`,
  },
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

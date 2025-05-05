import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.rocono.xyz",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 85],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "lenis"],
  },
};

export default nextConfig;

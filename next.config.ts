import type { NextConfig } from "next";

/**
 * Hosting: GitHub Pages for org/user site `sut-ds.github.io`.
 * basePath stays empty for that host. Static export is required.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Hide the floating Next.js Dev Tools “N” badge during local development.
  // Compile/runtime errors still surface via the error overlay.
  devIndicators: false,
};

export default nextConfig;

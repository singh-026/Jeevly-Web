import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // basePath is only needed for GitHub Pages deployment; skip it during local dev
  basePath: process.env.NODE_ENV === "production" ? "/Jeevly-Web" : undefined,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Требование Dockerfile / Cloud Run (см. docs/architecture/002-gcp-architecture.md, раздел 7)
  output: "standalone",
};

export default nextConfig;

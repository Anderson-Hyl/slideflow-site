import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites at `username.github.io/<repo>/`, so we
 * prefix the build with `/slideflow-site` only when deploying via the
 * GitHub Actions workflow (which sets GITHUB_PAGES=true). Local `npm run dev`
 * and ad-hoc builds keep the site at the root.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/slideflow-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  // Forward to client code so `withBase()` can prefix raw <a> / <img> URLs.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

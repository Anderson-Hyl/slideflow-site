/**
 * Prefix internal URLs with the deploy basePath.
 *
 * Local dev:                   NEXT_PUBLIC_BASE_PATH = ""   → returns paths unchanged
 * GitHub Pages (project page): NEXT_PUBLIC_BASE_PATH = "/slideflow-site"
 *
 * Use for raw `<a href>` and `<img src>` (Next.js auto-prefixes only `<Link>` /
 * `next/image`, not native tags).
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!path || path === "/") return BASE || "/";
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

// Site identity and canonical base URL used by metadata, sitemap, robots,
// and JSON-LD.
//
// Set NEXT_PUBLIC_SITE_URL to the production domain (no trailing slash),
// e.g. NEXT_PUBLIC_SITE_URL=https://your-domain.com in .env.local and in the
// hosting provider's environment variables. Without it, Vercel's production
// domain is used when available, otherwise http://localhost:3000.

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Iratera Kaloka";

export const SITE_DESCRIPTION = "Growing Up With Iratera";

// Fallback share image when an article has no cover (2407 x 2407 PNG).
export const DEFAULT_OG_IMAGE = {
  url: "/logos/iratera-logo.png",
  width: 2407,
  height: 2407,
  alt: SITE_NAME,
};

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

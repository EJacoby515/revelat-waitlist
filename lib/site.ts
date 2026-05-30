// Single source of truth for the canonical origin. Set NEXT_PUBLIC_SITE_URL in
// the deploy env; falls back to the production domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://revelat.app";

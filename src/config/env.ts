/**
 * Public environment, inlined into the bundle at build time (see .env.local).
 * Each `process.env.NEXT_PUBLIC_*` must be written out in full: Next only
 * inlines literal references, not dynamic lookups.
 */
export const env = {
  /** Jeevly backend origin, without a trailing slash. Undefined if not configured. */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || undefined,
};

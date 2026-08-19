/**
 * Runtime configuration for the frontend.
 *
 * API_BASE_URL is configurable per environment (Vercel env var VITE_API_BASE_URL).
 * Empty value = same-origin requests, which is the default when the app and its
 * server functions are deployed together.
 */
export const API_BASE_URL = (import.meta.env["VITE_API_BASE_URL"] ?? "").replace(/\/$/, "");

export const SITE_URL = import.meta.env["VITE_SITE_URL"] ?? "";

/** Build an absolute API URL from a relative path such as `/api/public/health`. */
export function apiUrl(path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${suffix}`;
}

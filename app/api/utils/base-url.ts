export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;
  return `http://${host}:${port}`;
}

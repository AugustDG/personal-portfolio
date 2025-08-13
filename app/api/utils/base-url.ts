export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;

  const publicUrl = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  if (publicUrl) return publicUrl;

  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;

  return `http://${host}:${port}`;
}

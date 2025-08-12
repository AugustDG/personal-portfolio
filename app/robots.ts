import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  const isProd = process.env.NODE_ENV === "production";

  return {
    rules: isProd
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }], // block non-production deploys
    sitemap: base ? `${base}/sitemap.xml` : undefined,
    host: base || undefined,
  };
}

import { MetadataRoute } from "next";
import { getBlogs, getProjects, getPhotos } from "@/lib/directus";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  const [posts, projects, galleries] = await Promise.all([
    getBlogs(),
    getProjects(),
    getPhotos(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/blog",
    "/galleries",
  ].map((p) => ({ url: `${base}${p || "/"}`, lastModified: new Date() }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updated_at ? parseDate(p.updated_at) : new Date(),
  }));
  const projectRoutes: MetadataRoute.Sitemap = projects.map((pr) => ({
    url: `${base}/projects/${pr.slug}`,
    lastModified: new Date(),
  }));
  const galleryRoutes: MetadataRoute.Sitemap = galleries.map((g) => ({
    url: `${base}/galleries/${g.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...galleryRoutes];
}

function parseDate(str: string) {
  // incoming format "HH:mm DD/MM/YYYY"; fallback to now
  const match = /(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{4})/.exec(str);
  if (!match) return new Date();
  const [_, hh, mm, dd, mon, yyyy] = match;
  return new Date(
    Number(yyyy),
    Number(mon) - 1,
    Number(dd),
    Number(hh),
    Number(mm),
  );
}

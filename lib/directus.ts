import { createDirectus, rest, readItems } from "@directus/sdk";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  featured: boolean;
  collaborators?: string[];
  started_at?: string;
  ended_at?: string | null;
  tools?: string[];
  tags?: string[];
  palette?: string[];
  header_image?: Image;
  header_image_url?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  body: string;
  tags?: string[];
  header_image?: string;
  published_at?: string;
  header_image_url?: string;
}

export interface Image {
  id: string;
  src: string; // assuming a custom field or external URL; adapt if file relation
  description?: string;
  src_url?: string;
}
export interface Gallery {
  id: string;
  slug: string;
  title: string;
  images: Image[];
  tags?: string[]; // optional if later added
}

const url = process.env.DIRECTUS_URL || "";
export const directus = createDirectus(url).with(rest());

async function safeRequest<T>(fn: () => Promise<T>): Promise<T | null> {
  if (!url) return null;
  try {
    return await fn();
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Directus request failed", e);
    }
    return null;
  }
}

function expandAsset(
  id?: string,
  params?: Record<string, string | number>,
): string | undefined {
  if (!id) return undefined;
  if (id.startsWith("http://") || id.startsWith("https://")) return id; // already full
  if (!url) return undefined;
  const base = url.replace(/\/$/, "");
  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";
  return `${base}/assets/${id}${qs}`;
}

export async function getProjects(): Promise<Project[]> {
  const data = await safeRequest(() =>
    directus.request(
      readItems("projects", {
        fields: [
          "id",
          "slug",
          "title",
          "description",
          "body",
          "featured",
          "collaborators",
          "started_at",
          "ended_at",
          "tools",
          "tags",
          "palette",
          "header_image.id",
          "header_image.src",
          "header_image.description",
        ],
        limit: -1,
        sort: ["-started_at"],
      }),
    ),
  );
  return ((data as Project[]) || []).map((p) => ({
    ...p,
    header_image_url: expandAsset(p.header_image?.src, {
      width: 1600,
      quality: 85,
    }),
  }));
}

export async function getBlogs(): Promise<BlogPost[]> {
  const data = await safeRequest(() =>
    directus.request(
      readItems("blog_posts", {
        fields: [
          "id",
          "slug",
          "title",
          "body",
          "tags",
          "header_image",
          "published_at",
        ],
        limit: -1,
        sort: ["-published_at"],
      }),
    ),
  );
  return ((data as BlogPost[]) || []).map((b) => ({
    ...b,
    header_image_url: expandAsset(b.header_image, { width: 1600, quality: 85 }),
  }));
}

export async function getGalleries(): Promise<Gallery[]> {
  const data = await safeRequest(() =>
    directus.request(
      readItems("galleries", {
        fields: [
          "id",
          "slug",
          "title",
          // relational images.* (explicit fields for safety)
          "images.id",
          "images.src",
          "images.description",
          "tags",
        ],
        limit: -1,
        sort: ["title"],
      }),
    ),
  );
  // Directus returns relational arrays flat inside object; ensure shape
  if (!data) return [];
  return (data as any[]).map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    images: (g.images || []).map((img: any) => ({
      id: img.id,
      src: img.src,
      src_url: expandAsset(img.src, { width: 1400, quality: 80 }),
      description: img.description,
    })),
    tags: g.tags || [],
  })) as Gallery[];
}

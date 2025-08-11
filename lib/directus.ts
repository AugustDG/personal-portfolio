import { createDirectus, rest, readItems } from "@directus/sdk";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  featured: boolean;
  collaborators?: string[];
  // Formatted as MM/YYYY
  started_at?: string;
  // Formatted as MM/YYYY (null if ongoing)
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
  excerpt: string;
  tags?: string[];
  header_image?: Image;
  // Formatted as HH:mm DD/MM/YYYY
  published_at?: string;
  // Formatted as HH:mm DD/MM/YYYY
  updated_at?: string;
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

export interface SiteMeta {
  id: string;
  intro: string;
  socials: { label: string; url: string }[];
  profile_image?: Image;
  profile_image_url?: string;
}

const publicDirectusUrl = process.env.DIRECTUS_PUBLIC_URL || "";
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
  const base = publicDirectusUrl.replace(/\/$/, "");
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
          "header_image.*",
        ],
        limit: -1,
        sort: ["-started_at"],
      }),
    ),
  );
  return ((data as any[]) || []).map((p) => {
    const formatMonthYear = (value?: string | null) => {
      if (!value) return undefined;
      const d = new Date(value);
      if (isNaN(d.getTime())) return undefined;
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${mm}/${yyyy}`;
    };
    return {
      ...p,
      started_at: formatMonthYear(p.started_at),
      ended_at: p.ended_at ? formatMonthYear(p.ended_at) : null,
      header_image_url: expandAsset(p.header_image?.src, {
        width: 1600,
        quality: 85,
      }),
    } as Project;
  });
}

export async function getBlogs(): Promise<BlogPost[]> {
  const data = await safeRequest(() =>
    directus.request(
      readItems("blog", {
        fields: [
          "id",
          "slug",
          "title",
          "body",
          "excerpt",
          "tags",
          "header_image.*",
          "published_at",
          "updated_at",
        ],
        limit: -1,
        sort: ["-published_at"],
      }),
    ),
  );
  return ((data as any[]) || []).map((b) => {
    const formatDateTime = (value?: string | null) => {
      if (!value) return undefined;
      const d = new Date(value);
      if (isNaN(d.getTime())) return undefined;
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const mon = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${hh}:${mm} ${day}/${mon}/${yyyy}`;
    };
    return {
      ...b,
      published_at: formatDateTime(b.published_at),
      updated_at: formatDateTime(b.updated_at),
      header_image_url: expandAsset(b.header_image?.src, {
        width: 1600,
        quality: 85,
      }),
    } as BlogPost;
  });
}

export async function getPhotos(): Promise<Gallery[]> {
  const data = await safeRequest(() =>
    directus.request(
      readItems("galleries", {
        fields: ["id", "slug", "title", "images.images_id.*", "tags"],
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
      id: img.images_id.id,
      src: img.images_id.src,
      src_url: expandAsset(img.images_id.src, { width: 1400, quality: 80 }),
      description: img.images_id.description,
    })),
    tags: g.tags || [],
  })) as Gallery[];
}

export async function getSiteMeta(): Promise<SiteMeta | null> {
  const data = await safeRequest(() =>
    directus.request(
      readItems("site_meta", {
        fields: ["id", "intro", "socials", "profile_image.*"],
        limit: 1,
      }),
    ),
  );
  if (!data) return null;
  const record = Array.isArray(data) ? data[0] : (data as any);
  if (!record) return null;
  return {
    id: record.id,
    intro: record.intro || "",
    socials: (record.socials || []).map((s: any) => ({
      label: s.label,
      url: s.url,
    })),
    profile_image: record.profile_image,
    profile_image_url: expandAsset(record.profile_image?.src, {
      width: 320,
      quality: 85,
    }),
  };
}

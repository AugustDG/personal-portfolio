import { createDirectus, rest } from "@directus/sdk";

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
  header_image?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  body: string;
  tags?: string[];
  header_image?: string;
  published_at?: string;
}

export interface Gallery {
  id: string;
  slug: string;
  title: string;
  images: { id: string; src: string; description?: string }[];
}

const url = process.env.DIRECTUS_URL || "";
export const directus = createDirectus(url).with(rest());

async function fetchCollection<T>(collection: string): Promise<T[]> {
  if (!url) return [];
  try {
    const res = await fetch(`${url}/items/${collection}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data as T[];
  } catch {
    return [];
  }
}

export function getProjects(): Promise<Project[]> {
  return fetchCollection<Project>("projects");
}
export function getBlogs(): Promise<BlogPost[]> {
  return fetchCollection<BlogPost>("blog_posts");
}
export function getGalleries(): Promise<Gallery[]> {
  return fetchCollection<Gallery>("galleries");
}

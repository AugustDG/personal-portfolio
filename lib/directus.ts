import { createDirectus, rest } from "@directus/sdk";

// Define Directus schema types
interface Blog {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featured_image?: string;
  tags?: string[];
  published: boolean;
  body: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  featured_image?: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  date?: string;
  featured: boolean;
  body: string;
}

interface Gallery {
  id: string;
  name: string;
  description?: string;
  images: GalleryImage[];
}

interface GalleryImage {
  id: string;
  filename: string;
  url: string;
  thumbnail?: string;
  alt: string;
  caption?: string;
}

interface About {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  skills: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

// Directus schema
interface DirectusSchema {
  blog: Blog[];
  projects: Project[];
  galleries: Gallery[];
  about: About[];
}

// Create Directus client
const directusUrl = process.env.DIRECTUS_URL || "http://localhost:8055";
const directus = createDirectus<DirectusSchema>(directusUrl).with(rest());

console.log("Directus client initialized with URL:", directusUrl);

export { directus };
export type { Blog, Project, Gallery, GalleryImage, About };

import { directus } from "./directus";
import { readItems } from "@directus/sdk";
import {
  BlogPost,
  Project as ProjectType,
  Gallery as GalleryType,
  AboutContent,
} from "@/types";

// Directus types (redefined locally to avoid import issues)
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
  images: any[];
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

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogs = await directus.request(
      readItems("blog", {
        filter: { published: { _eq: true } },
        sort: ["-date"],
      })
    );

    return blogs.map((blog: Blog) => ({
      slug: blog.slug,
      title: blog.title,
      content: blog.body || "",
      date: blog.date,
      excerpt: blog.excerpt || "",
      tags: blog.tags || [],
      published: blog.published,
      featured_image: blog.featured_image
        ? `/assets/${blog.featured_image}`
        : undefined,
    }));
  } catch (error) {
    console.error(
      "Error fetching blog posts from Directus, falling back to file system:",
      error
    );

    return [];
  }
}

export async function getAllProjects(): Promise<ProjectType[]> {
  try {
    const projects = await directus.request(
      readItems("projects", {
        sort: ["-date"],
      })
    );

    return projects.map((project: Project) => ({
      slug: project.slug,
      title: project.title,
      content: project.body || "",
      description: project.description || "",
      technologies: project.technologies || [],
      githubUrl: project.github_url || undefined,
      liveUrl: project.live_url || undefined,
      date: project.date,
      featured: project.featured || false,
      featured_image: project.featured_image
        ? `/assets/${project.featured_image}`
        : undefined,
    }));
  } catch (error) {
    console.error(
      "Error fetching projects from Directus, falling back to file system:",
      error
    );

    return [];
  }
}

export async function getAllGalleries(): Promise<GalleryType[]> {
  try {
    const galleries = await directus.request(
      readItems("galleries", {
        fields: ["*", "images.*"],
      })
    );

    return galleries.map((gallery: Gallery) => ({
      name: gallery.name,
      description: gallery.description || "",
      images: (gallery.images || []).map((image: any) => ({
        filename: image.filename,
        url: `/assets/${image.directus_files_id}`,
        thumbnail: image.directus_files_id
          ? `/assets/${image.directus_files_id}?width=512&height=512`
          : undefined,
        alt: image.alt,
        caption: image.caption || undefined,
      })),
    }));
  } catch (error) {
    console.error(
      "Error fetching galleries from Directus, falling back to file system:",
      error
    );

    return [];
  }
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const aboutData = await directus.request(
      readItems("about", {
        limit: 1,
      })
    );

    if (!aboutData || aboutData.length === 0) {
      return getDefaultAbout();
    }

    const about = aboutData[0] as About;
    return {
      name: about.name,
      title: about.title,
      bio: about.bio || "",
      avatar: about.avatar ? `/assets/${about.avatar}` : "/images/avatar.jpg",
      skills: about.skills || [],
      contact: {
        email: about.contact?.email || "",
        github: about.contact?.github || "",
        linkedin: about.contact?.linkedin || "",
        twitter: about.contact?.twitter || "",
      },
    };
  } catch (error) {
    console.error(
      "Error fetching about content from Directus, falling back to file system:",
      error
    );

    return getDefaultAbout();
  }
}

function getDefaultAbout(): AboutContent {
  return {
    name: "Your Name",
    title: "Your Title",
    bio: "A brief bio about yourself.",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    contact: {
      email: "your.email@example.com",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
    },
  };
}

// Data types for CMS content
export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  excerpt: string;
  tags?: string[];
  published?: boolean;
  featured_image?: string;
}

export interface Project {
  slug: string;
  title: string;
  content: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  description?: string;
  date?: string;
  featured?: boolean;
  featured_image?: string;
}

export interface Gallery {
  name: string;
  images: GalleryImage[];
  description?: string;
}

export interface GalleryImage {
  filename: string;
  url: string;
  thumbnail?: string;
  alt: string;
  caption?: string;
}

export interface AboutContent {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
  };
  avatar?: string;
}

// Command system types
export interface CommandHandler {
  description: string;
  handler: (args: string[], output: OutputFunction) => Promise<void> | void;
  autoComplete?: (args: string[]) => string[];
}

export interface CommandMap {
  [key: string]: CommandHandler;
}

export type OutputFunction = (content: React.ReactNode) => void;

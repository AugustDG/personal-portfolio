// Data types for CMS content
export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  excerpt: string;
}

export interface Project {
  slug: string;
  title: string;
  content: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Gallery {
  name: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  filename: string;
  url: string;
  thumbnail: string;
  alt: string;
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
  };
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

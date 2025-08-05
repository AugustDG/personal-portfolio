import { BlogPost, Project, Gallery, AboutContent } from "../types";

// Mock data - replace with TinaCMS API calls
export const mockAbout: AboutContent = {
  name: "Your Name",
  title: "Full Stack Developer",
  bio: `Welcome to my terminal-style portfolio! I'm a passionate developer who loves creating 
innovative solutions and exploring new technologies. This interactive terminal showcases 
my work and provides an unique way to navigate through my projects and thoughts.`,
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Docker",
    "AWS",
  ],
  contact: {
    email: "hello@yourname.dev",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourname",
  },
};

export const mockBlogPosts: BlogPost[] = [
  {
    slug: "building-terminal-portfolio",
    title: "Building a Terminal-Style Portfolio with Next.js",
    date: "2025-01-15",
    excerpt:
      "How I created an interactive terminal interface for my portfolio using React and xterm.js",
    content: `# Building a Terminal-Style Portfolio

This portfolio represents a unique approach to web development, combining the nostalgia 
of terminal interfaces with modern web technologies.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **xterm.js** - Terminal emulator for the web
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety and better DX

## Key Features

1. **Interactive Command System** - Navigate using familiar terminal commands
2. **Responsive Design** - Works seamlessly on mobile and desktop
3. **Theme Support** - Respects system dark/light mode preferences
4. **Auto-completion** - Smart suggestions as you type

The result is an engaging, accessible portfolio that stands out from traditional designs 
while maintaining excellent usability.`,
  },
  {
    slug: "react-hooks-deep-dive",
    title: "React Hooks: A Deep Dive into Custom Hooks",
    date: "2025-01-10",
    excerpt:
      "Exploring advanced patterns and best practices for creating reusable custom hooks",
    content: `# React Hooks Deep Dive

Custom hooks are one of React's most powerful features, allowing us to extract component 
logic into reusable functions.

## Best Practices

- Always start hook names with "use"
- Keep hooks focused on a single concern
- Return objects for multiple values
- Use TypeScript for better type safety

## Example: useLocalStorage Hook

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation details...
}
\`\`\`

This pattern enables clean, testable, and reusable code across your application.`,
  },
];

export const mockProjects: Project[] = [
  {
    slug: "terminal-portfolio",
    title: "Terminal Portfolio Website",
    technologies: ["Next.js", "TypeScript", "xterm.js", "Tailwind CSS"],
    liveUrl: "https://yourname.dev",
    githubUrl: "https://github.com/yourusername/terminal-portfolio",
    content: `# Terminal Portfolio

An innovative portfolio website that reimagines the traditional web portfolio as an 
interactive terminal experience.

## Features

- **Full Terminal Emulation** - Complete command-line interface
- **Mobile Optimized** - Touch-friendly interactions
- **CMS Integration** - Content managed through TinaCMS
- **Performance Focused** - Optimized for speed and accessibility

## Technical Highlights

The project uses modern React patterns with hooks for state management, implements 
a robust command system with auto-completion, and provides seamless theme switching.

## Screenshots

![Terminal Interface](https://via.placeholder.com/600x400/0a0a0a/10b981?text=Terminal+Interface)

The interface provides an authentic terminal feel while maintaining modern web standards.`,
  },
  {
    slug: "task-management-app",
    title: "Collaborative Task Management Platform",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    liveUrl: "https://taskapp.example.com",
    githubUrl: "https://github.com/yourusername/task-app",
    content: `# Task Management Platform

A real-time collaborative platform for team project management with advanced features 
for tracking progress and communication.

## Key Features

- **Real-time Collaboration** - Live updates using WebSockets
- **Advanced Filtering** - Complex queries and saved filters
- **Time Tracking** - Built-in productivity analytics
- **Team Management** - Role-based access control

## Architecture

Built with a microservices approach, the platform scales efficiently and provides 
excellent performance even with large teams and complex projects.`,
  },
];

export const mockGalleries: Gallery[] = [
  {
    name: "web-development",
    images: [
      {
        filename: "portfolio-dark.jpg",
        url: "https://via.placeholder.com/800x600/0a0a0a/10b981?text=Portfolio+Dark+Mode",
        thumbnail:
          "https://via.placeholder.com/200x150/0a0a0a/10b981?text=Portfolio+Dark",
        alt: "Portfolio website in dark mode",
      },
      {
        filename: "portfolio-light.jpg",
        url: "https://via.placeholder.com/800x600/fafafa/16a34a?text=Portfolio+Light+Mode",
        thumbnail:
          "https://via.placeholder.com/200x150/fafafa/16a34a?text=Portfolio+Light",
        alt: "Portfolio website in light mode",
      },
      {
        filename: "task-app-dashboard.jpg",
        url: "https://via.placeholder.com/800x600/1e40af/f59e0b?text=Task+Dashboard",
        thumbnail:
          "https://via.placeholder.com/200x150/1e40af/f59e0b?text=Dashboard",
        alt: "Task management app dashboard",
      },
    ],
  },
  {
    name: "photography",
    images: [
      {
        filename: "landscape-1.jpg",
        url: "https://via.placeholder.com/800x600/059669/ffffff?text=Mountain+Landscape",
        thumbnail:
          "https://via.placeholder.com/200x150/059669/ffffff?text=Mountain",
        alt: "Mountain landscape photography",
      },
      {
        filename: "city-night.jpg",
        url: "https://via.placeholder.com/800x600/1e1b4b/f59e0b?text=City+Night",
        thumbnail:
          "https://via.placeholder.com/200x150/1e1b4b/f59e0b?text=City",
        alt: "City night photography",
      },
    ],
  },
];

// API functions - replace with actual TinaCMS calls
export async function getAbout(): Promise<AboutContent> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockAbout;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockBlogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockBlogPosts.find((post) => post.slug === slug) || null;
}

export async function getProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockProjects;
}

export async function getProject(slug: string): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockProjects.find((project) => project.slug === slug) || null;
}

export async function getGalleries(): Promise<Gallery[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockGalleries;
}

export async function getGallery(name: string): Promise<Gallery | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockGalleries.find((gallery) => gallery.name === name) || null;
}

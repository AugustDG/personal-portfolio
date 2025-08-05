import fs from "fs";
import { BlogPost, Project, Gallery, AboutContent } from "@/types";
import { client } from "../tina/__generated__/databaseClient";

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await client.queries.blogConnection();
    if (!response.data.blogConnection.edges) return [];

    const posts = response.data.blogConnection.edges
      .filter((edge) => edge && edge.node)
      .map((edge) => ({
        slug: edge!.node!.slug,
        title: edge!.node!.title,
        content: edge!.node!.body || "",
        date: edge!.node!.date,
        excerpt: edge!.node!.excerpt || "",
        tags: (edge!.node!.tags || []).filter(
          (tag): tag is string => tag !== null
        ),
        published: edge!.node!.published,
        featured_image: edge!.node!.featured_image || undefined,
      }))
      .filter((post: any) => post.published !== false);

    return posts.sort(
      (a: BlogPost, b: BlogPost) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await client.queries.projectConnection();
    if (!response.data.projectConnection.edges) return [];

    const projects = response.data.projectConnection.edges
      .filter((edge) => edge && edge.node)
      .map((edge) => ({
        slug: edge!.node!.slug,
        title: edge!.node!.title,
        content: edge!.node!.body || "",
        description: edge!.node!.description || "",
        technologies: (edge!.node!.technologies || []).filter(
          (tech): tech is string => tech !== null
        ),
        githubUrl: edge!.node!.github_url || undefined,
        liveUrl: edge!.node!.live_url || undefined,
        date: edge!.node!.date,
        featured: edge!.node!.featured || false,
        featured_image: edge!.node!.featured_image || undefined,
      }));

    return projects.sort(
      (a: Project, b: Project) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getAllGalleries(): Promise<Gallery[]> {
  try {
    const response = await client.queries.galleryConnection();
    if (!response.data.galleryConnection.edges) return [];

    const galleries = response.data.galleryConnection.edges
      .filter((edge: any) => edge && edge.node)
      .map((edge: any) => ({
        name: edge.node.name,
        description: edge.node.description || "",
        images: (edge.node.images || [])
          .filter((image: any) => image !== null)
          .map((image: any) => ({
            filename: image.filename,
            url: image.url,
            thumbnail: image.thumbnail || undefined,
            alt: image.alt,
            caption: image.caption || undefined,
          })),
      }));

    return galleries;
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const response = await client.queries.aboutConnection();
    if (
      !response.data.aboutConnection.edges ||
      response.data.aboutConnection.edges.length === 0
    ) {
      return getDefaultAbout();
    }

    const aboutData = response.data.aboutConnection.edges[0]?.node;
    if (!aboutData) return getDefaultAbout();

    return {
      name: aboutData.name,
      title: aboutData.title,
      bio: aboutData.bio || "",
      avatar: aboutData.avatar || "/images/avatar.jpg",
      skills: (aboutData.skills || []).filter(
        (skill: any): skill is string => skill !== null
      ),
      contact: {
        email: aboutData.contact?.email || "",
        github: aboutData.contact?.github || "",
        linkedin: aboutData.contact?.linkedin || "",
        twitter: aboutData.contact?.twitter || "",
      },
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    return getDefaultAbout();
  }
}

function readJsonFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
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

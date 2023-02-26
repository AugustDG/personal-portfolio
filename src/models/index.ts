export interface ProjectSummary {
  id: string;

  title: string;
  medium: string;
  year: number;

  images: string[];
}

export interface ProjectDetail {
  id: string;

  title: string;
  medium: string;
  year: number;
}

export interface ContactInfo {
  id: string;

  github: string;
  linkedin: string;
  email: string;
}

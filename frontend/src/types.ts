export interface Profile {
  id: number;
  name: string;
  hero_heading: string;
  hero_subheading: string;
  about_paragraph_1?: string | null;
  about_paragraph_2?: string | null;
  email: string;
  phone?: string | null;
  location?: string | null;
  website_url?: string | null;
  stats_months_internship?: number | null;
  stats_technologies?: number | null;
  stats_percent_learning?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  github_username?: string | null;
}

export interface RawProject {
  id: number;
  title: string;
  subtitle?: string | null;
  description: string;
  tags?: string[];
  sort_order: number;
  is_archived: boolean;
  image_url?: string | null;
  images_dir?: string | null;
  demo_url?: string | null;
  repo_url?: string | null;
  role?: string | null;
  rating?: number | null;
  featured?: boolean;
}

export interface Project extends RawProject {
  images: string[];
}

export interface ExperienceEntry {
  id: number;
  type: 'work' | 'education' | 'note';
  title: string;
  organization?: string | null;
  period_label?: string | null;
  bullets?: string[] | null;
  description?: string | null;
  sort_order: number;
}

export interface Skill {
  id: number;
  group_name: string;
  name: string;
  sort_order: number;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface RawPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  tags?: string[];
  reading_minutes?: number | null;
  published_at: string;
}

export interface Post extends Omit<RawPost, 'cover_image_url'> {
  cover_image_url: string | null;
}

export interface Sample {
  slug: string;
  images: string[];
  title: string;
  url: string | null;
  description: string | null;
}

export interface Quote {
  text: string;
  author: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}



export interface HeroContent {
  name: string;
  role: string;
  tagline: string;
  description: string;
  profileImage?: string;
  buttons: {
    label: string;
    link: string;
    type: 'primary' | 'secondary';
  }[];
}

export interface AboutContent {
  summary: string;
  detailed?: string;
  education: string;
  currentFocus: string;
  personalStatement?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  order: number;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  problemStatement?: string;
  features: string[];
  techStack: string[];
  role?: string;
  githubLink?: string;
  liveLink?: string;
  thumbnail?: string;
  gallery?: string[];
  status: 'ongoing' | 'completed' | 'archived';
  featured: boolean;
  tags: string[];
  order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialLink?: string;
  certificateImage?: string;
  description?: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
  image?: string;
  icon?: string;
  link?: string;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
  highlights: string[];
  logo?: string;
  order: number;
}

export interface ResumeContent {
  fileName?: string;
  uploadDate?: string;
}

export interface ContactContent {
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  customLinks?: {
    label: string;
    url: string;
  }[];
}

export interface FooterContent {
  text: string;
  copyright: string;
  quickLinks: {
    label: string;
    link: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface PortfolioData {
  hero: HeroContent;
  about: AboutContent;
  skillCategories: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  experiences: Experience[];
  resume: ResumeContent;
  contact: ContactContent;
  footer: FooterContent;
}

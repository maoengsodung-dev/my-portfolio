export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  category: "Mobile App" | "UX UI" | "UI/UX" | "Dashboard" | "Web";
  tags: string[];
  role: string;
  year: string;
  client?: string;
  liveUrl?: string;
  repoUrl?: string;
  coverImage: string;
  gallery: string[];
  featured?: boolean;
};

export type SkillCategory = {
  category: string;
  description: string;
  skills: string[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  type: "Full-time" | "Freelance" | "Contract";
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
};

export type StatItem = {
  label: string;
  value: number;
  suffix?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
  content: string[];
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  previewImage?: string;
  hours?: string;
  description: string;
  skills: string[];
};

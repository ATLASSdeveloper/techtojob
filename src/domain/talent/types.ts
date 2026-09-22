export type TalentLink = {
  label: string;
  href: string;
  kind: "github" | "linkedin" | "live" | "portfolio";
};

export type TalentProject = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  featured?: boolean;
};

export type TalentProfile = {
  id: string;
  slug: string;
  name: string;
  role: string;
  location?: string;
  avatar: string;
  bio: string;
  specialties: string[];
  technologies: string[];
  availability?: "open" | "selective" | "unavailable";
  featured?: boolean;
  verified?: boolean;
  links: TalentLink[];
  projects: TalentProject[];
};

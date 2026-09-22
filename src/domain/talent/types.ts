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

export type TalentProjectBase = Omit<TalentProject, "name" | "tagline" | "description">;

export type TalentProfileBase = Omit<TalentProfile, "role" | "bio" | "specialties" | "projects"> & {
  projects: TalentProjectBase[];
};

export type TalentProjectTranslation = Pick<TalentProject, "name" | "tagline" | "description">;

export type TalentProfileTranslation = {
  role: string;
  bio: string;
  specialties: string[];
  projects: Record<string, TalentProjectTranslation>;
};

export type TalentTranslations = Record<string, TalentProfileTranslation>;

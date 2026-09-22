import type { Locale } from "@/i18n/config";
import type { TalentProfile, TalentTranslations } from "@/domain/talent/types";
import { talentProfilesBase } from "./shared";
import { talentTranslationsEs } from "./es";
import { talentTranslationsEn } from "./en";

const translations: Record<Locale, TalentTranslations> = {
  es: talentTranslationsEs,
  en: talentTranslationsEn,
};

export function getTalentProfiles(locale: Locale): TalentProfile[] {
  const localeTranslations = translations[locale];

  return talentProfilesBase.map((profile) => {
    const translatedProfile = localeTranslations[profile.id];

    if (!translatedProfile) {
      throw new Error(`Missing ${locale} translation for talent: ${profile.id}`);
    }

    const projects = profile.projects.map((project) => {
      const translatedProject = translatedProfile.projects[project.id];

      if (!translatedProject) {
        throw new Error(`Missing ${locale} translation for project: ${profile.id}/${project.id}`);
      }

      return {
        ...project,
        ...translatedProject,
      };
    });

    return {
      ...profile,
      role: translatedProfile.role,
      bio: translatedProfile.bio,
      specialties: translatedProfile.specialties,
      projects,
    };
  });
}

export function getFeaturedTalent(locale: Locale): TalentProfile {
  const profiles = getTalentProfiles(locale);
  return profiles.find((profile) => profile.featured) ?? profiles[0];
}

export function getTalentBySlug(locale: Locale, slug: string): TalentProfile | undefined {
  return getTalentProfiles(locale).find((profile) => profile.slug === slug);
}

export function getTalentSlugs() {
  return talentProfilesBase.map((profile) => profile.slug);
}

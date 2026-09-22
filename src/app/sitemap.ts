import type { MetadataRoute } from "next";
import { getTalentSlugs } from "@/data/talents";
import { supportedLocales } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

function absolute(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const talentSlugs = getTalentSlugs();

  const homeEntries = supportedLocales.map((locale) => ({
    url: absolute(localizedPath(locale)),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const directoryEntries = supportedLocales.map((locale) => ({
    url: absolute(localizedPath(locale, "/talent")),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const profileEntries = supportedLocales.flatMap((locale) =>
    talentSlugs.map((slug) => ({
      url: absolute(localizedPath(locale, `/talent/${slug}`)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...homeEntries, ...directoryEntries, ...profileEntries];
}

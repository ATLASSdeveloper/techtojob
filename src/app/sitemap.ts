import type { MetadataRoute } from "next";
import { talentProfiles } from "@/data/talents";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteConfig.siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/talent`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...talentProfiles.map((profile) => ({
      url: `${siteConfig.siteUrl}/talent/${profile.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

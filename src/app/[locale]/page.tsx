import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/features/landing/LandingPage";
import { getFeaturedTalent } from "@/data/talents";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getLanguageAlternates, getOpenGraphLocale } from "@/i18n/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: getLanguageAlternates(locale),
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      type: "website",
      url: `/${locale}`,
      locale: getOpenGraphLocale(locale),
      alternateLocale: [getOpenGraphLocale(locale === "es" ? "en" : "es")],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const featuredTalent = getFeaturedTalent(locale);

  return <LandingPage dictionary={dictionary} featuredTalent={featuredTalent} locale={locale} />;
}

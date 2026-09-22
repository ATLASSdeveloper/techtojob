import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTalentProfiles } from "@/data/talents";
import { TalentCard } from "@/features/talent/TalentCard";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localizedPath } from "@/i18n/routing";
import { getLanguageAlternates, getOpenGraphLocale } from "@/i18n/seo";
import { ArrowRightIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const title = `${dictionary.talentDirectory.eyebrow} | ${siteConfig.name}`;

  return {
    title,
    description: dictionary.talentDirectory.description,
    alternates: getLanguageAlternates(locale, "/talent"),
    openGraph: {
      title,
      description: dictionary.talentDirectory.description,
      type: "website",
      url: localizedPath(locale, "/talent"),
      locale: getOpenGraphLocale(locale),
      alternateLocale: [getOpenGraphLocale(locale === "es" ? "en" : "es")],
      siteName: siteConfig.name,
    },
  };
}

export default async function TalentDirectoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const talentProfiles = getTalentProfiles(locale);

  return (
    <main className="directory-page">
      <section className="directory-hero">
        <div className="container directory-hero__inner">
          <span className="eyebrow">{dictionary.talentDirectory.eyebrow}</span>
          <h1>{dictionary.talentDirectory.title}</h1>
          <p>{dictionary.talentDirectory.description}</p>
          <Link className="text-link" href={localizedPath(locale)}>
            {dictionary.talentDirectory.backHome}<ArrowRightIcon />
          </Link>
        </div>
      </section>
      <section className="container directory-grid-wrap">
        <div className="directory-grid">
          {talentProfiles.map((profile) => (
            <TalentCard profile={profile} dictionary={dictionary} locale={locale} key={profile.id} />
          ))}
          <article className="coming-card">
            <span>+</span>
            <h3>{dictionary.common.comingSoonTitle}</h3>
            <p>{dictionary.common.comingSoonDescription}</p>
          </article>
        </div>
      </section>
    </main>
  );
}

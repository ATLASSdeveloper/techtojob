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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
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

export default async function TalentDirectoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const talentProfiles = getTalentProfiles(locale);

  return (
    <main className="directory-page">
      <section className="directory-hero [background:linear-gradient(135deg,#eff7f6,#fff)] [padding:90px_0_70px] mobile:[padding:60px_0_50px]">
        <div className="page-container directory-hero__inner w-[min(1180px,calc(100%_-_40px))] mx-auto max-w-[850px] mobile:w-[calc(100%_-_32px)] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)]">
          <span className="eyebrow inline-flex items-center gap-[8px] uppercase tracking-[.14em] text-[.75rem] font-bold text-[#547b79] mobile:text-[.68rem] mobile:tracking-[.12em]">
            {dictionary.talentDirectory.eyebrow}
          </span>
          <h1>{dictionary.talentDirectory.title}</h1>
          <p>{dictionary.talentDirectory.description}</p>
          <Link
            className="text-link inline-flex items-center gap-[8px] font-bold text-[#456d6b]"
            href={localizedPath(locale)}
          >
            {dictionary.talentDirectory.backHome}
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
      <section className="page-container directory-grid-wrap w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:70px_0_110px] mobile:w-[calc(100%_-_32px)] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)]">
        <div className="directory-grid grid grid-cols-[repeat(2,1fr)] gap-[18px] tablet:grid-cols-[1fr_1fr] mobile:grid-cols-[1fr]">
          {talentProfiles.map((profile) => (
            <TalentCard
              profile={profile}
              dictionary={dictionary}
              locale={locale}
              key={profile.id}
            />
          ))}
          <article className="coming-card [border-width:1px] border-dashed border-[#c7d3d2] rounded-[28px] p-[30px] [background:#f8fbfa] min-h-[300px] flex flex-col justify-center">
            <span>+</span>
            <h3>{dictionary.common.comingSoonTitle}</h3>
            <p>{dictionary.common.comingSoonDescription}</p>
          </article>
        </div>
      </section>
    </main>
  );
}

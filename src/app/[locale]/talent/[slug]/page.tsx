import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTalentBySlug, getTalentSlugs } from "@/data/talents";
import { isLocale, supportedLocales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { localizedPath } from "@/i18n/routing";
import { getLanguageAlternates, getOpenGraphLocale } from "@/i18n/seo";
import { ProjectCard } from "@/features/talent/ProjectCard";
import {
  ArrowUpRightIcon,
  CheckIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/Icons";
import { siteConfig } from "@/lib/site";

function interpolate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template,
  );
}

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    getTalentSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};

  const locale: Locale = localeParam;
  const profile = getTalentBySlug(locale, slug);
  if (!profile) return {};

  const title = `${profile.name} — ${profile.role} | ${siteConfig.name}`;
  const path = `/talent/${profile.slug}`;

  return {
    title,
    description: profile.bio,
    alternates: getLanguageAlternates(locale, path),
    openGraph: {
      title,
      description: profile.bio,
      type: "profile",
      url: localizedPath(locale, path),
      locale: getOpenGraphLocale(locale),
      alternateLocale: [getOpenGraphLocale(locale === "es" ? "en" : "es")],
      siteName: siteConfig.name,
      images: [{ url: profile.avatar, alt: profile.name }],
    },
  };
}

export default async function TalentProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const profile = getTalentBySlug(locale, slug);
  if (!profile) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <main className="profile-page">
      <section className="profile-hero [background:linear-gradient(135deg,#f0f7f6,#fff)] [padding:58px_0_78px]">
        <div className="page-container w-[min(1180px,calc(100%_-_40px))] mx-auto mobile:w-[calc(100%_-_32px)] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)]">
          <Link
            href={localizedPath(locale, "/talent")}
            className="text-link text-link--muted inline-flex items-center gap-[8px] font-bold text-[#6c7574]"
          >
            ← {dictionary.talentProfile.back}
          </Link>
          <div className="profile-hero__grid grid grid-cols-[.72fr_1.28fr] gap-[70px] items-center mt-[40px] tablet:grid-cols-[1fr] mobile:gap-[34px]">
            <div className="profile-photo-wrap relative tablet:max-w-[520px]">
              <Image
                src={profile.avatar}
                width={560}
                height={560}
                alt={interpolate(dictionary.accessibility.talentPhoto, {
                  name: profile.name,
                })}
                className="profile-photo w-full [aspect-ratio:1] object-cover rounded-[34px] [filter:grayscale(1)] [box-shadow:var(--shadow)]"
                priority
              />
              {profile.verified ? (
                <span className="profile-verified absolute left-[20px] bottom-[20px] flex items-center gap-[7px] [background:rgba(255,255,255,.94)] [padding:9px_12px] rounded-[999px] text-[.72rem] font-extrabold">
                  <CheckIcon /> {dictionary.talentProfile.verified}
                </span>
              ) : null}
            </div>
            <div className="profile-intro">
              <span className="eyebrow inline-flex items-center gap-[8px] uppercase tracking-[.14em] text-[.75rem] font-bold text-[#547b79] mobile:text-[.68rem] mobile:tracking-[.12em]">
                {profile.specialties.join(" · ")}
              </span>
              <h1>{profile.name}</h1>
              <h2>{profile.role}</h2>
              {profile.location ? (
                <p className="profile-location text-[#7b8584]">
                  {profile.location}
                </p>
              ) : null}
              <p className="profile-bio max-w-[760px] text-[1.03rem] text-[#596463]">
                {profile.bio}
              </p>
              <div className="profile-links flex gap-[10px] flex-wrap mt-[24px] mobile:flex-col">
                {profile.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--secondary inline-flex items-center justify-center gap-[10px] min-h-[50px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[#b9c4c3] [transition:.2s_ease] bg-white text-brand-dark motion-reduce:[transition:none]!"
                  >
                    {link.kind === "github" ? (
                      <GithubIcon />
                    ) : link.kind === "linkedin" ? (
                      <LinkedinIcon />
                    ) : null}
                    {link.label}
                    <ArrowUpRightIcon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container profile-content w-[min(1180px,calc(100%_-_40px))] mx-auto grid grid-cols-[1fr_300px] gap-[34px] [padding:76px_0_110px] tablet:grid-cols-[1fr] mobile:w-[calc(100%_-_32px)] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)]">
        <div className="profile-main">
          <div className="profile-section-title">
            <span className="eyebrow inline-flex items-center gap-[8px] uppercase tracking-[.14em] text-[.75rem] font-bold text-[#547b79] mobile:text-[.68rem] mobile:tracking-[.12em]">
              {dictionary.talentProfile.projects}
            </span>
            <h2>{dictionary.common.visibleWorkTitle}</h2>
          </div>
          <div className="projects-grid grid gap-[14px]">
            {profile.projects.map((project) => (
              <ProjectCard
                project={project}
                dictionary={dictionary}
                key={project.id}
              />
            ))}
          </div>
        </div>
        <aside className="profile-sidebar flex flex-col gap-[14px] sticky top-[100px] self-start tablet:grid tablet:grid-cols-[1fr_1fr] mobile:grid-cols-[1fr]">
          <div className="profile-side-card [border-width:1px] [border-style:solid] border-line rounded-[20px] p-[20px] static tablet:static!">
            <h3>{dictionary.talentProfile.specialties}</h3>
            <div className="chip-list flex flex-wrap gap-[7px]">
              {profile.specialties.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="profile-side-card [border-width:1px] [border-style:solid] border-line rounded-[20px] p-[20px] static tablet:static!">
            <h3>{dictionary.talentProfile.technologies}</h3>
            <div className="chip-list flex flex-wrap gap-[7px]">
              {profile.technologies.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

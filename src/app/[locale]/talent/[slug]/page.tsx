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
import { ArrowUpRightIcon, CheckIcon, GithubIcon, LinkedinIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

function interpolate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), template);
}

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) => getTalentSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
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

export default async function TalentProfilePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const profile = getTalentBySlug(locale, slug);
  if (!profile) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="container">
          <Link href={localizedPath(locale, "/talent")} className="text-link text-link--muted">← {dictionary.talentProfile.back}</Link>
          <div className="profile-hero__grid">
            <div className="profile-photo-wrap">
              <Image
                src={profile.avatar}
                width={560}
                height={560}
                alt={interpolate(dictionary.accessibility.talentPhoto, { name: profile.name })}
                className="profile-photo"
                priority
              />
              {profile.verified ? <span className="profile-verified"><CheckIcon /> {dictionary.talentProfile.verified}</span> : null}
            </div>
            <div className="profile-intro">
              <span className="eyebrow">{profile.specialties.join(" · ")}</span>
              <h1>{profile.name}</h1>
              <h2>{profile.role}</h2>
              {profile.location ? <p className="profile-location">{profile.location}</p> : null}
              <p className="profile-bio">{profile.bio}</p>
              <div className="profile-links">
                {profile.links.map((link) => (
                  <a href={link.href} key={link.href} target="_blank" rel="noreferrer" className="button button--secondary">
                    {link.kind === "github" ? <GithubIcon /> : link.kind === "linkedin" ? <LinkedinIcon /> : null}
                    {link.label}<ArrowUpRightIcon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container profile-content">
        <div className="profile-main">
          <div className="profile-section-title">
            <span className="eyebrow">{dictionary.talentProfile.projects}</span>
            <h2>{dictionary.common.visibleWorkTitle}</h2>
          </div>
          <div className="projects-grid">
            {profile.projects.map((project) => <ProjectCard project={project} dictionary={dictionary} key={project.id} />)}
          </div>
        </div>
        <aside className="profile-sidebar">
          <div className="profile-side-card">
            <h3>{dictionary.talentProfile.specialties}</h3>
            <div className="chip-list">{profile.specialties.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="profile-side-card">
            <h3>{dictionary.talentProfile.technologies}</h3>
            <div className="chip-list">{profile.technologies.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </aside>
      </section>
    </main>
  );
}

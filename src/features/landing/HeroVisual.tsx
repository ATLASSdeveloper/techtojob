import Image from "next/image";
import Link from "next/link";
import type { TalentProfile } from "@/domain/talent/types";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { ArrowUpRightIcon, CheckIcon, GithubIcon } from "@/components/Icons";

function interpolate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), template);
}

export function HeroVisual({ profile, dictionary, locale }: { profile: TalentProfile; dictionary: Dictionary; locale: Locale }) {
  const project = profile.projects.find((item) => item.featured) ?? profile.projects[0];
  const githubLink = profile.links.find((link) => link.kind === "github");
  const githubUrl = project.repositoryUrl ?? githubLink?.href;

  return (
    <div className="hero-visual" aria-label={interpolate(dictionary.accessibility.featuredTalent, { name: profile.name })}>
      <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
      <div className="hero-orbit-accent hero-orbit-accent--one" aria-hidden="true" />
      <div className="hero-orbit-accent hero-orbit-accent--two" aria-hidden="true" />

      <article className="hero-profile-card">
        <div className="hero-profile-card__top">
          <div className="hero-avatar-wrap">
            <Image
              src={profile.avatar}
              width={160}
              height={160}
              alt={interpolate(dictionary.accessibility.talentPhoto, { name: profile.name })}
              className="hero-avatar"
              priority
            />
            {profile.verified ? (
              <span className="verified-badge" aria-label={dictionary.accessibility.verifiedProfile}>
                <CheckIcon />
              </span>
            ) : null}
          </div>

          <div className="hero-profile-card__identity">
            <span className="signal-label"><span /> {dictionary.common.realTalent.toUpperCase()}</span>
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
          </div>
        </div>

        <div className="hero-profile-card__divider" />

        <div className="hero-project-mini">
          <div className="hero-project-mini__heading">
            <span className="mini-label">{dictionary.common.featuredProject}</span>
            {project.liveUrl ? <span className="live-pill"><span /> {dictionary.common.live}</span> : null}
          </div>
          <strong>{project.name}</strong>
          <p>{project.tagline}</p>
        </div>

        <div className="hero-tags" aria-label={dictionary.accessibility.projectTechnologies}>
          {project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
        </div>

        <div className="hero-profile-card__actions">
          <Link className="hero-profile-card__action hero-profile-card__action--primary" href={localizedPath(locale, `/talent/${profile.slug}`)}>
            {dictionary.common.viewProfile} <ArrowUpRightIcon />
          </Link>
          {project.liveUrl ? (
            <a className="hero-profile-card__action" href={project.liveUrl} target="_blank" rel="noreferrer">
              {dictionary.common.project} <ArrowUpRightIcon />
            </a>
          ) : null}
          {githubUrl ? (
            <a className="hero-profile-card__action" href={githubUrl} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub <ArrowUpRightIcon />
            </a>
          ) : null}
        </div>
      </article>
    </div>
  );
}

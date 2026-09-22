import Image from "next/image";
import Link from "next/link";
import type { TalentProfile } from "@/domain/talent/types";
import type { Dictionary } from "@/i18n/getDictionary";
import { ArrowUpRightIcon, CheckIcon, CodeIcon } from "@/components/Icons";

export function HeroVisual({ profile, dictionary }: { profile: TalentProfile; dictionary: Dictionary }) {
  const project = profile.projects.find((item) => item.featured) ?? profile.projects[0];

  return (
    <div className="hero-visual" aria-label={`Perfil destacado de ${profile.name}`}>
      <div className="hero-orbit hero-orbit--one" />
      <div className="hero-orbit hero-orbit--two" />
      <div className="hero-node hero-node--one"><CodeIcon /></div>
      <div className="hero-node hero-node--two">API</div>
      <div className="hero-node hero-node--three">DB</div>

      <article className="hero-profile-card">
        <div className="hero-profile-card__top">
          <div className="hero-avatar-wrap">
            <Image src={profile.avatar} width={160} height={160} alt={`Foto de ${profile.name}`} className="hero-avatar" priority />
            <span className="verified-badge"><CheckIcon /></span>
          </div>
          <div>
            <span className="signal-label"><span /> {dictionary.common.realTalent.toUpperCase()}</span>
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
          </div>
        </div>

        <div className="hero-profile-card__divider" />

        <div className="hero-project-mini">
          <div>
            <span className="mini-label">{dictionary.common.publishedProject}</span>
            <strong>{project.name}</strong>
            <p>{project.tagline}</p>
          </div>
          {project.liveUrl ? <span className="live-pill"><span /> LIVE</span> : null}
        </div>

        <div className="hero-tags">
          {project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
        </div>

        <div className="hero-profile-card__actions">
          <Link href={`/talent/${profile.slug}`}>{dictionary.common.viewProfile} <ArrowUpRightIcon /></Link>
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">{dictionary.common.project} <ArrowUpRightIcon /></a> : null}
        </div>
      </article>

      <div className="signal-card signal-card--github">
        <span className="signal-card__icon">&lt;/&gt;</span>
        <div><small>{dictionary.common.signal}</small><strong>GitHub</strong></div>
      </div>
      <div className="signal-card signal-card--proof">
        <span className="signal-card__dot" />
        <div><small>{dictionary.common.evidence}</small><strong>{dictionary.common.publishedProject}</strong></div>
      </div>
    </div>
  );
}

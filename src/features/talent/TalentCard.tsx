import Image from "next/image";
import Link from "next/link";
import type { TalentProfile } from "@/domain/talent/types";
import type { Dictionary } from "@/i18n/getDictionary";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";

export function TalentCard({ profile, dictionary, compact = false }: { profile: TalentProfile; dictionary: Dictionary; compact?: boolean }) {
  const featuredProject = profile.projects.find((project) => project.featured) ?? profile.projects[0];

  return (
    <article className={`talent-card ${compact ? "talent-card--compact" : ""}`}>
      <div className="talent-card__top">
        <div className="talent-card__avatar-wrap">
          <Image src={profile.avatar} alt={`Foto de ${profile.name}`} width={116} height={116} className="talent-card__avatar" />
          {profile.verified ? <span className="talent-card__verified" title="Perfil verificado"><CheckIcon /></span> : null}
        </div>
        <div>
          <span className="talent-card__status"><span /> {dictionary.common.realProfile}</span>
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
          {profile.location ? <small>{profile.location}</small> : null}
        </div>
      </div>

      <div className="talent-card__skills">
        {profile.technologies.slice(0, compact ? 4 : 6).map((technology) => <span key={technology}>{technology}</span>)}
      </div>

      {featuredProject ? (
        <div className="talent-card__project">
          <div>
            <span className="mini-label">{dictionary.common.featuredProject}</span>
            <strong>{featuredProject.name}</strong>
            <p>{featuredProject.tagline}</p>
          </div>
          {featuredProject.liveUrl ? <span className="live-pill"><span /> LIVE</span> : null}
        </div>
      ) : null}

      <Link href={`/talent/${profile.slug}`} className="talent-card__link">
        {dictionary.common.viewProfile}
        <ArrowRightIcon />
      </Link>
    </article>
  );
}

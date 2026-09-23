import Image from "next/image";
import Link from "next/link";
import type { TalentProfile } from "@/domain/talent/types";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";

function interpolate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template,
  );
}

export function TalentCard({
  profile,
  dictionary,
  locale,
  compact = false,
}: {
  profile: TalentProfile;
  dictionary: Dictionary;
  locale: Locale;
  compact?: boolean;
}) {
  const featuredProject =
    profile.projects.find((project) => project.featured) ?? profile.projects[0];

  return (
    <article
      className={`talent-card [border-width:1px] [border-style:solid] border-line rounded-[28px] p-[24px] bg-white ${compact ? "talent-card--compact" : ""}`}
    >
      <div className="talent-card__top flex gap-[16px] items-center">
        <div className="talent-card__avatar-wrap relative">
          <Image
            src={profile.avatar}
            alt={interpolate(dictionary.accessibility.talentPhoto, {
              name: profile.name,
            })}
            width={116}
            height={116}
            className="talent-card__avatar w-[84px] h-[84px] rounded-[22px] object-cover [filter:grayscale(1)]"
          />
          {profile.verified ? (
            <span
              className="talent-card__verified absolute right-[-4px] bottom-[2px] w-[26px] h-[26px] bg-brand-mint [border-width:3px] [border-style:solid] border-white rounded-[50%] grid place-items-center"
              role="img"
              aria-label={dictionary.accessibility.verifiedProfile}
              title={dictionary.accessibility.verifiedProfile}
            >
              <CheckIcon />
            </span>
          ) : null}
        </div>
        <div>
          <span className="talent-card__status text-[.62rem] font-extrabold text-[#608986] flex items-center gap-[6px]">
            <span /> {dictionary.common.realProfile}
          </span>
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
          {profile.location ? <small>{profile.location}</small> : null}
        </div>
      </div>

      <div className="talent-card__skills flex gap-[6px] flex-wrap [margin:18px_0]">
        {profile.technologies.slice(0, compact ? 4 : 6).map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      {featuredProject ? (
        <div className="talent-card__project flex justify-between gap-[12px] [border-width:1px] [border-style:solid] border-[#e3e9e8] rounded-[16px] p-[14px]">
          <div>
            <span className="mini-label text-[.64rem] tracking-[.11em] uppercase text-[#66706f] font-extrabold block">
              {dictionary.common.featuredProject}
            </span>
            <strong>{featuredProject.name}</strong>
            <p>{featuredProject.tagline}</p>
          </div>
          {featuredProject.liveUrl ? (
            <span className="live-pill inline-flex! items-center gap-[6px] h-[27px] [padding:0_10px] rounded-[999px] [background:#edf7f6] text-[#426d6a] text-[.64rem]! font-extrabold! whitespace-nowrap">
              <span /> {dictionary.common.live}
            </span>
          ) : null}
        </div>
      ) : null}

      <Link
        href={localizedPath(locale, `/talent/${profile.slug}`)}
        className="talent-card__link flex justify-between items-center mt-[18px] text-[.8rem] font-extrabold"
      >
        {dictionary.common.viewProfile}
        <ArrowRightIcon />
      </Link>
    </article>
  );
}

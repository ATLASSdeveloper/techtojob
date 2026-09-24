import Image from "next/image";
import Link from "next/link";
import type { TalentProfile } from "@/domain/talent/types";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import type { getLatestTournamentWinner } from "@/data/tournaments";
import { localizedPath } from "@/i18n/routing";
import { ArrowUpRightIcon, CheckIcon, TrophyIcon } from "@/components/Icons";

function interpolate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template,
  );
}

export function HeroVisual({
  profile,
  winner,
  dictionary,
  locale,
}: {
  profile: TalentProfile;
  winner: ReturnType<typeof getLatestTournamentWinner>;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const project =
    profile.projects.find((item) => item.featured) ?? profile.projects[0];
  const winningProject = winner?.project;
  const displayedProject = winningProject ?? project;

  return (
    <div
      className="hero-visual relative min-h-[550px] flex items-center justify-center isolate tablet:min-h-[520px] tablet:w-full tablet:max-w-[680px] tablet:mx-auto mobile:min-h-0 mobile:[transform:none] mobile:w-full mobile:[margin:2px_0_0] mobile:[padding:34px_0]"
      role="group"
      aria-label={interpolate(winner ? (winner.confirmed ? dictionary.accessibility.tournamentWinner : dictionary.accessibility.tournamentWinnerExample) : dictionary.accessibility.featuredTalent, {
        name: profile.name,
      })}
    >
      <div
        className="hero-orbit hero-orbit--one absolute [border-width:1px] [border-style:solid] border-[rgba(132,192,191,.28)] rounded-[50%] z-[-2] w-[430px] h-[430px] mobile:w-[min(88vw,350px)] mobile:h-[min(88vw,350px)] motion-reduce:[animation:none]!"
        aria-hidden="true"
      />
      <div
        className="hero-orbit hero-orbit--two absolute [border-width:1px] border-dashed border-[rgba(132,192,191,.28)] rounded-[50%] z-[-2] w-[515px] h-[515px] opacity-[.58] mobile:w-[min(104vw,410px)] mobile:h-[min(104vw,410px)] motion-reduce:[animation:none]!"
        aria-hidden="true"
      />
      <div
        className="hero-orbit-accent hero-orbit-accent--one absolute w-[9px] h-[9px] rounded-[50%] bg-brand-mint [box-shadow:0_0_0_7px_rgba(132,192,191,.12)] z-[-1] top-[72px] right-[94px] mobile:top-[28px] mobile:right-[9vw]"
        aria-hidden="true"
      />
      <div
        className="hero-orbit-accent hero-orbit-accent--two absolute w-[6px] h-[6px] rounded-[50%] bg-brand-mint [box-shadow:0_0_0_6px_rgba(132,192,191,.1)] z-[-1] left-[52px] bottom-[104px] mobile:left-[7vw] mobile:bottom-[42px]"
        aria-hidden="true"
      />

      <article className="hero-profile-card relative w-[min(100%,460px)] p-[28px] [background:rgba(255,255,255,.96)] [border-width:1px] [border-style:solid] border-[rgba(198,214,212,.9)] rounded-[30px] [box-shadow:0_34px_90px_rgba(42,55,54,.16),0_2px_8px_rgba(42,55,54,.05)] z-[1] [backdrop-filter:blur(12px)] max-w-full mobile:p-[22px] mobile:rounded-[24px] mobile:w-full mobile:[backdrop-filter:none] compact:p-[18px]">
        {winner ? (
          <div className="mb-[18px] flex flex-wrap items-center justify-between gap-[6px_12px] text-[.66rem] font-extrabold tracking-[.06em] text-[#426d6a]">
            <span className="inline-flex items-center gap-[7px] uppercase">
              <TrophyIcon className="h-[18px] w-[18px]" /> {dictionary.hero.winnerTitle}
            </span>
            {!winner.confirmed ? (
              <span className="rounded-[999px] bg-[#edf4f3] px-[9px] py-[4px] text-[.61rem] tracking-normal text-[#526967]">
                {dictionary.hero.winnerExample}
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="hero-profile-card__top flex items-center gap-[18px] mobile:gap-[14px] mobile:items-center compact:items-start">
          <div className="hero-avatar-wrap relative flex-[0_0_88px] mobile:basis-[72px] compact:basis-[64px]">
            <Image
              src={profile.avatar}
              width={160}
              height={160}
              alt={interpolate(dictionary.accessibility.talentPhoto, {
                name: profile.name,
              })}
              className="hero-avatar w-[88px] h-[88px] object-cover rounded-[24px] [filter:grayscale(1)] [border-width:3px] [border-style:solid] border-white [box-shadow:0_0_0_1px_#c8d6d5,0_9px_24px_rgba(47,52,54,.09)] mobile:w-[72px] mobile:h-[72px] mobile:rounded-[19px] compact:w-[64px] compact:h-[64px]"
              priority
            />
            {profile.verified ? (
              <span
                className="verified-badge absolute right-[-5px] bottom-[3px] w-[27px] h-[27px] rounded-[50%] grid place-items-center bg-brand-mint text-brand-dark [border-width:3px] [border-style:solid] border-white compact:w-[24px] compact:h-[24px]"
                role="img"
                aria-label={dictionary.accessibility.verifiedProfile}
              >
                <CheckIcon />
              </span>
            ) : null}
          </div>

          <div className="hero-profile-card__identity min-w-0">
            <span className="signal-label flex items-center gap-[7px] text-[.65rem] font-extrabold tracking-[.12em] text-[#547b79]">
              <span /> {dictionary.common.realTalent.toUpperCase()}
            </span>
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
            <Link
              className="mt-[7px] inline-flex items-center gap-[5px] text-[.72rem] font-extrabold text-[#426d6a] hover:underline"
              href={localizedPath(locale, `/talent/${profile.slug}`)}
            >
              {dictionary.common.viewProfile} <ArrowUpRightIcon className="h-[15px] w-[15px]" />
            </Link>
          </div>
        </div>

        <div className="hero-profile-card__divider h-[1px] [background:linear-gradient(90deg,#dce5e4,rgba(220,229,228,.34))] [margin:20px_0_18px]" />

        <div className="hero-project-mini block">
          <div className="hero-project-mini__heading flex items-center justify-between gap-[16px] mb-[5px]">
            <span className="mini-label text-[.64rem] tracking-[.11em] uppercase text-[#66706f] font-extrabold block">
              {winningProject ? dictionary.hero.winningProject : dictionary.common.featuredProject}
            </span>
            {displayedProject.liveUrl ? (
              <span className="live-pill inline-flex! items-center gap-[6px] h-[27px] [padding:0_10px] rounded-[999px] [background:#edf7f6] text-[#426d6a] text-[.64rem]! font-extrabold! whitespace-nowrap">
                <span /> {dictionary.common.live}
              </span>
            ) : null}
          </div>
          {displayedProject.liveUrl ? (
            <a
              className="group inline-flex max-w-full items-center gap-[8px] text-brand-dark hover:text-[#426d6a]"
              href={displayedProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${winningProject ? dictionary.hero.viewWinningProject : dictionary.hero.viewFeaturedProject}: ${displayedProject.name}`}
            >
              <strong>{displayedProject.name}</strong>
              <ArrowUpRightIcon className="h-[17px] w-[17px] shrink-0 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px] motion-reduce:transition-none" />
            </a>
          ) : (
            <strong>{displayedProject.name}</strong>
          )}
          <p>{displayedProject.tagline}</p>
        </div>

        {winningProject && winningProject.id !== project.id ? (
          <div className="mt-[18px] border-t border-[#edf0ef] pt-[15px]">
            <span className="block text-[.64rem] font-extrabold uppercase tracking-[.11em] text-[#66706f]">
              {dictionary.common.featuredProject}
            </span>
            {project.liveUrl ? (
              <a
                className="group mt-[4px] inline-flex max-w-full items-center gap-[7px] text-brand-dark hover:text-[#426d6a]"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${dictionary.hero.viewFeaturedProject}: ${project.name}`}
              >
                <strong className="text-[.9rem] leading-[1.3]">{project.name}</strong>
                <ArrowUpRightIcon className="h-[15px] w-[15px] shrink-0 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px] motion-reduce:transition-none" />
              </a>
            ) : (
              <strong className="mt-[4px] block text-[.9rem] leading-[1.3]">{project.name}</strong>
            )}
            <p className="mt-[2px]!">{project.tagline}</p>
          </div>
        ) : null}
      </article>
    </div>
  );
}

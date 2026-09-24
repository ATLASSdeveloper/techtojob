import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import type { TalentProfile } from "@/domain/talent/types";
import type { getLatestTournamentWinner } from "@/data/tournaments";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { TechieCharacter } from "@/components/TechieCharacter";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CodeIcon,
  ProofIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/Icons";
import { siteConfig } from "@/lib/site";
import { HeroVisual } from "./HeroVisual";

export function LandingPage({
  dictionary,
  featuredTalent,
  latestWinner,
  locale,
}: {
  dictionary: Dictionary;
  featuredTalent: TalentProfile;
  latestWinner: ReturnType<typeof getLatestTournamentWinner>;
  locale: Locale;
}) {
  const featuredProject =
    featuredTalent.projects.find((project) => project.featured) ??
    featuredTalent.projects[0];

  return (
    <main className="landing-page">
      <section className="hero section-shell overflow-hidden [background:radial-gradient(circle_at_82%_18%,rgba(132,192,191,.19),transparent_30%),linear-gradient(#fff,#fbfdfd)]">
        <div className="page-container hero-grid w-[min(1180px,calc(100%_-_40px))] mx-auto min-h-[720px] grid grid-cols-[1.02fr_.98fr] items-center gap-[50px] [padding:74px_0_88px] tablet:grid-cols-[1fr] tablet:min-h-auto tablet:gap-[42px] tablet:[padding:64px_0_82px] mobile:w-[calc(100%_-_32px)] mobile:min-h-auto mobile:gap-[28px] mobile:[padding:48px_0_66px] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)]">
          <div className="hero-copy min-w-0 tablet:max-w-[760px]">
            <span className="eyebrow inline-flex items-center gap-[8px] uppercase tracking-[.14em] text-[.75rem] font-bold text-[#547b79] mobile:text-[.68rem] mobile:tracking-[.12em]">
              {dictionary.hero.eyebrow}
            </span>
            <h1>
              {dictionary.hero.titleStart}
              <br />
              <span>{dictionary.hero.titleAccent}</span>
            </h1>
            <p className="hero-description max-w-[650px] text-[1.1rem] text-[#66706f] [overflow-wrap:anywhere] mobile:text-[.98rem] mobile:leading-[1.65]">
              {dictionary.hero.description}
            </p>
            <div className="hero-actions flex gap-[12px] flex-wrap mt-[28px] mobile:flex-col mobile:gap-[10px] mobile:mt-[24px]">
              <ButtonLink href={siteConfig.discordUrl} external>
                {dictionary.hero.primaryAction}
                <ArrowUpRightIcon />
              </ButtonLink>
              <ButtonLink
                href={localizedPath(locale, "#companies")}
                variant="secondary"
              >
                {dictionary.hero.secondaryAction}
                <ArrowRightIcon />
              </ButtonLink>
            </div>
            <div className="hero-specialties flex flex-wrap gap-[8px] mt-[28px] mobile:gap-[7px] mobile:mt-[22px]">
              {dictionary.hero.specialties.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <HeroVisual
            profile={latestWinner?.profile ?? featuredTalent}
            winner={latestWinner}
            dictionary={dictionary}
            locale={locale}
          />
        </div>
      </section>

      <section
        className="problem section-dark bg-brand-dark text-white"
        id="problem"
      >
        <div className="page-container section-pad w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:112px_0] tablet:[padding:92px_0] mobile:w-[calc(100%_-_32px)] mobile:[padding:72px_0] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)] compact:[padding:64px_0]">
          <SectionHeading
            eyebrow={dictionary.problem.eyebrow}
            title={dictionary.problem.title}
            description={dictionary.problem.lead}
            inverse
          />
          <div className="problem-grid grid grid-cols-[repeat(3,1fr)] gap-[16px] tablet:grid-cols-[repeat(2,1fr)] mobile:grid-cols-[1fr] mobile:gap-[12px]">
            {dictionary.problem.cards.map((card) => (
              <article
                className="problem-card p-[28px] [border-width:1px] [border-style:solid] border-[rgba(255,255,255,.12)] rounded-[24px] [background:rgba(255,255,255,.035)] max-w-full mobile:p-[22px] mobile:rounded-[20px]"
                key={card.label}
              >
                <strong>{card.stat}</strong>
                <span>{card.label}</span>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
          <p className="problem-closing text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold max-w-[760px] [margin:48px_0_0] tracking-[-.035em] [overflow-wrap:anywhere] [text-wrap:balance] mobile:text-[1.45rem] mobile:leading-[1.2] mobile:mt-[34px]">
            {dictionary.problem.closing}
          </p>
        </div>
      </section>

      <section className="section-light bg-white" id="how-it-works">
        <div className="page-container section-pad w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:112px_0] tablet:[padding:92px_0] mobile:w-[calc(100%_-_32px)] mobile:[padding:72px_0] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)] compact:[padding:64px_0]">
          <SectionHeading
            eyebrow={dictionary.howItWorks.eyebrow}
            title={dictionary.howItWorks.title}
            description={dictionary.howItWorks.description}
          />
          <div className="steps-journey relative mt-[12px] mobile:mt-0">
            <div
              className="steps-track absolute left-[7%] right-[7%] top-[45px] h-[2px] [background:linear-gradient(90deg,rgba(132,192,191,.18),var(--mint)_18%,var(--mint)_82%,rgba(132,192,191,.18))] z-0 tablet:hidden"
              aria-hidden="true"
            />
            <div className="steps-grid grid grid-cols-[repeat(4,1fr)] gap-[18px] relative z-[1] tablet:grid-cols-[repeat(2,1fr)] mobile:grid-cols-[1fr] mobile:gap-0">
              {dictionary.howItWorks.steps.map((step, index) => {
                const icons = [
                  <CodeIcon key="build" />,
                  <TrophyIcon key="challenge" />,
                  <ProofIcon key="proof" />,
                  <UsersIcon key="connect" />,
                ];

                return (
                  <article
                    className="step-item min-w-0 mobile:grid mobile:grid-cols-[58px_minmax(0,1fr)] mobile:gap-[10px] mobile:relative mobile:pb-[18px] compact:grid-cols-[52px_minmax(0,1fr)] compact:gap-[8px]"
                    key={step.number}
                  >
                    <div
                      className="step-marker h-[90px] flex items-center justify-between [padding:0_18px] relative tablet:h-[74px] tablet:px-[12px] mobile:h-auto mobile:min-h-[64px] mobile:p-0 mobile:flex mobile:flex-col mobile:justify-start mobile:gap-[8px] mobile:z-[1]"
                      aria-hidden="true"
                    >
                      <span className="step-number grid place-items-center min-w-[42px] h-[28px] [padding:0_10px] rounded-[999px] bg-white [border-width:1px] [border-style:solid] border-[#d8e5e3] text-[#547b79] text-[.68rem] font-extrabold tracking-[.08em] [box-shadow:0_8px_22px_rgba(47,52,54,.06)] mobile:min-w-[38px] mobile:h-[24px] mobile:text-[.62rem]">
                        {step.number}
                      </span>
                      <span className="step-icon w-[58px] h-[58px] rounded-[18px] bg-brand-dark text-white grid place-items-center [box-shadow:0_12px_30px_rgba(47,52,54,.16),0_0_0_7px_#fff] [transition:transform_.24s_ease,background_.24s_ease] mobile:w-[44px] mobile:h-[44px] mobile:rounded-[14px] mobile:[box-shadow:0_8px_22px_rgba(47,52,54,.14),0_0_0_5px_#fff] compact:w-[40px] compact:h-[40px] motion-reduce:[transition:none]!">
                        {icons[index]}
                      </span>
                    </div>
                    <div className="step-card min-h-[220px] [padding:28px_24px_26px] [border-width:1px] [border-style:solid] border-[#dce5e4] rounded-[26px] [background:linear-gradient(180deg,#fff_0%,#fbfdfd_100%)] relative overflow-hidden [box-shadow:0_18px_48px_rgba(47,52,54,.055)] [transition:transform_.24s_ease,border-color_.24s_ease,box-shadow_.24s_ease] max-w-full tablet:min-h-[220px] mobile:min-h-0 mobile:[padding:20px_18px_22px] mobile:rounded-[22px] compact:[padding:18px_16px_20px] motion-reduce:[transition:none]!">
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="dual-section [background:linear-gradient(135deg,#f3f8f7,#fff)]"
        id="talent"
      >
        <div className="page-container section-pad dual-grid w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:112px_0] grid grid-cols-[1fr_1fr] gap-[80px] items-center tablet:grid-cols-[1fr] tablet:gap-[54px] tablet:[padding:92px_0] mobile:w-[calc(100%_-_32px)] mobile:[padding:72px_0] mobile:max-w-full mobile:mx-auto mobile:gap-[38px] compact:w-[calc(100%_-_28px)] compact:[padding:64px_0]">
          <div>
            <SectionHeading
              eyebrow={dictionary.talent.eyebrow}
              title={dictionary.talent.title}
              description={dictionary.talent.description}
            />
            <ul className="feature-list list-none p-0 [margin:26px_0_30px] grid grid-cols-[1fr_1fr] gap-[10px] mobile:grid-cols-[1fr] mobile:[margin:22px_0_26px] mobile:gap-[10px]">
              {dictionary.talent.bullets.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={siteConfig.discordUrl} external>
              {dictionary.talent.action}
              <ArrowUpRightIcon />
            </ButtonLink>
          </div>
          <div className="community-visual min-h-[430px] relative flex items-center justify-center mobile:min-h-[330px] mobile:overflow-hidden">
            <TechieCharacter label="ship()" />
            <div className="floating-code floating-code--a absolute [padding:11px_14px] rounded-[12px] bg-white [border-width:1px] [border-style:solid] border-[#dce5e4] [box-shadow:0_14px_40px_rgba(42,55,54,.12)] [font:700_12px_monospace] top-[45px] left-[20px] mobile:left-[4px] mobile:text-[10px] mobile:[padding:9px_10px] mobile:max-w-[72%] mobile:whitespace-normal mobile:top-[34px]">
              git push origin main
            </div>
            <div className="floating-code floating-code--b absolute [padding:11px_14px] rounded-[12px] bg-white [border-width:1px] [border-style:solid] border-[#dce5e4] [box-shadow:0_14px_40px_rgba(42,55,54,.12)] [font:700_12px_monospace] right-[14px] top-[120px] text-[#4b7d79] mobile:right-[4px] mobile:text-[10px] mobile:[padding:9px_10px] mobile:max-w-[72%] mobile:whitespace-normal mobile:top-[105px]">
              {dictionary.visuals.deployed}
            </div>
            <div className="floating-code floating-code--c absolute [padding:11px_14px] rounded-[12px] bg-white [border-width:1px] [border-style:solid] border-[#dce5e4] [box-shadow:0_14px_40px_rgba(42,55,54,.12)] [font:700_12px_monospace] left-[60px] bottom-[30px] mobile:text-[10px] mobile:[padding:9px_10px] mobile:max-w-[72%] mobile:whitespace-normal mobile:left-[24px] mobile:bottom-[22px]">
              {dictionary.visuals.project}
            </div>
          </div>
        </div>
      </section>

      <section
        className="companies section-dark bg-brand-dark text-white"
        id="companies"
      >
        <div className="page-container section-pad dual-grid dual-grid--reverse w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:112px_0] grid grid-cols-[1.05fr_.95fr] gap-[80px] items-center tablet:grid-cols-[1fr] tablet:gap-[54px] tablet:[padding:92px_0] mobile:w-[calc(100%_-_32px)] mobile:[padding:72px_0] mobile:max-w-full mobile:mx-auto mobile:gap-[38px] compact:w-[calc(100%_-_28px)] compact:[padding:64px_0]">
          <div
            className="hiring-shift relative min-h-[520px] p-[28px] [border-width:1px] [border-style:solid] border-[rgba(255,255,255,.12)] rounded-[32px] [background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.025))] [box-shadow:0_30px_80px_rgba(0,0,0,.18)] overflow-hidden isolate max-w-full tablet:order-[2] tablet:max-w-[760px] tablet:w-full tablet:mx-auto mobile:min-h-auto mobile:p-[18px] mobile:rounded-[24px]"
            role="group"
            tabIndex={0}
            aria-label={dictionary.companies.comparison.ariaLabel}
          >
            <div
              className="hiring-shift__glow absolute right-[-90px] top-[-100px] w-[280px] h-[280px] rounded-[50%] [background:radial-gradient(circle,rgba(132,192,191,.18),transparent_68%)] [filter:blur(2px)] z-[-1]"
              aria-hidden="true"
            />
            <div className="hiring-shift__header flex items-end justify-between gap-[18px] pb-[22px] [border-bottom:1px_solid_rgba(255,255,255,.1)] mobile:items-start mobile:flex-col mobile:gap-[7px]">
              <span>{dictionary.companies.comparison.kicker}</span>
              <strong>{dictionary.companies.comparison.title}</strong>
            </div>

            <div className="hiring-shift__grid grid grid-cols-[1fr_58px_1fr] gap-[14px] items-stretch mt-[22px] mobile:grid-cols-[1fr] mobile:gap-[12px] mobile:mt-[18px]">
              <article className="hiring-lens hiring-lens--cv relative flex flex-col min-h-[345px] p-[20px] rounded-[24px] [border-width:1px] [border-style:solid] border-[rgba(255,255,255,.1)] [transition:transform_.28s_ease,border-color_.28s_ease,background_.28s_ease,box-shadow_.28s_ease] [background:rgba(255,255,255,.035)] text-[#d7dddc] mobile:min-h-auto mobile:p-[16px] mobile:rounded-[20px] motion-reduce:[transition:none]!">
                <div className="hiring-lens__label flex items-center gap-[9px] text-[.75rem] font-extrabold tracking-[.06em] uppercase text-[#aab4b3]">
                  <span
                    className="hiring-lens__dot w-[8px] h-[8px] rounded-[50%] [background:#76807f] [box-shadow:0_0_0_5px_rgba(255,255,255,.035)]"
                    aria-hidden="true"
                  />
                  {dictionary.companies.comparison.cvTitle}
                </div>
                <div className="hiring-lens__stack grid gap-[9px] mt-[20px] mobile:gap-[8px] mobile:mt-[16px]">
                  {dictionary.companies.comparison.cvSignals.map(
                    (item, index) => (
                      <div
                        className="hiring-signal hiring-signal--muted grid grid-cols-[28px_1fr_auto] items-center gap-[10px] min-h-[47px] [padding:0_12px] rounded-[14px] [border-width:1px] [border-style:solid] border-[rgba(255,255,255,.07)] [transition:transform_.24s_ease,background_.24s_ease,border-color_.24s_ease,opacity_.24s_ease] [background:rgba(255,255,255,.025)] text-[#bdc5c4] mobile:grid-cols-[24px_minmax(0,1fr)_auto] mobile:gap-[8px] mobile:min-h-[44px] mobile:[padding:0_10px] compact:grid-cols-[22px_minmax(0,1fr)] motion-reduce:[transition:none]!"
                        key={item}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{item}</strong>
                      </div>
                    ),
                  )}
                </div>
                <p>{dictionary.companies.comparison.cvCaption}</p>
              </article>

              <div
                className="hiring-shift__bridge relative flex items-center justify-center mobile:h-[50px]"
                aria-hidden="true"
              >
                <span className="hiring-shift__bridge-line absolute left-0 right-0 h-[1px] [background:linear-gradient(90deg,rgba(255,255,255,.04),rgba(132,192,191,.55),rgba(255,255,255,.04))] mobile:left-[50%] mobile:right-auto mobile:top-0 mobile:bottom-0 mobile:w-[1px] mobile:h-auto mobile:[background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(132,192,191,.55),rgba(255,255,255,.04))]" />
                <span className="hiring-shift__bridge-arrow relative z-[1] w-[40px] h-[40px] rounded-[50%] grid place-items-center [background:#394143] [border-width:1px] [border-style:solid] border-[rgba(132,192,191,.3)] text-brand-mint [box-shadow:0_0_0_7px_rgba(47,52,54,.92)] [transition:transform_.28s_ease,background_.28s_ease,color_.28s_ease] mobile:[transform:rotate(90deg)] mobile:[box-shadow:0_0_0_6px_rgba(47,52,54,.92)] motion-reduce:[transition:none]!">
                  <ArrowRightIcon />
                </span>
              </div>

              <article className="hiring-lens hiring-lens--evidence relative flex flex-col min-h-[345px] p-[20px] rounded-[24px] [border-width:1px] [border-style:solid] border-[rgba(132,192,191,.3)] [transition:transform_.28s_ease,border-color_.28s_ease,background_.28s_ease,box-shadow_.28s_ease] [background:linear-gradient(180deg,rgba(132,192,191,.12),rgba(255,255,255,.045))] [box-shadow:inset_0_1px_0_rgba(255,255,255,.04)] mobile:min-h-auto mobile:p-[16px] mobile:rounded-[20px] motion-reduce:[transition:none]!">
                <div className="hiring-lens__label hiring-lens__label--accent flex items-center gap-[9px] text-[.75rem] font-extrabold tracking-[.06em] uppercase text-[#dff5f3]">
                  <span
                    className="hiring-lens__dot w-[8px] h-[8px] rounded-[50%] [background:#76807f] [box-shadow:0_0_0_5px_rgba(255,255,255,.035)]"
                    aria-hidden="true"
                  />
                  {dictionary.companies.comparison.evidenceTitle}
                </div>
                <div className="hiring-lens__stack grid gap-[9px] mt-[20px] mobile:gap-[8px] mobile:mt-[16px]">
                  {dictionary.companies.comparison.evidenceSignals.map(
                    (item, index) => (
                      <div
                        className="hiring-signal hiring-signal--active grid grid-cols-[28px_1fr_auto] items-center gap-[10px] min-h-[47px] [padding:0_12px] rounded-[14px] [border-width:1px] [border-style:solid] border-[rgba(132,192,191,.2)] [transition:transform_.24s_ease,background_.24s_ease,border-color_.24s_ease,opacity_.24s_ease] [background:rgba(255,255,255,.075)] text-[#f3f7f6] mobile:grid-cols-[24px_minmax(0,1fr)_auto] mobile:gap-[8px] mobile:min-h-[44px] mobile:[padding:0_10px] compact:grid-cols-[22px_minmax(0,1fr)] motion-reduce:[transition:none]!"
                        key={item}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{item}</strong>
                        <CheckIcon />
                      </div>
                    ),
                  )}
                </div>
                <p>{dictionary.companies.comparison.evidenceCaption}</p>
              </article>
            </div>

            <div className="hiring-shift__footer flex items-center justify-center gap-[7px] mt-[20px] pt-[18px] [border-top:1px_solid_rgba(255,255,255,.08)] text-[.78rem] text-[#b8c2c1] mobile:flex-wrap mobile:text-center mobile:text-[.72rem]">
              <span>{dictionary.companies.comparison.footerLead}</span>
              <strong>{dictionary.companies.comparison.footerAccent}</strong>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow={dictionary.companies.eyebrow}
              title={dictionary.companies.title}
              description={dictionary.companies.description}
              inverse
            />
            <ul className="feature-list feature-list--inverse list-none p-0 [margin:26px_0_30px] grid grid-cols-[1fr_1fr] gap-[10px] text-[#e2e7e6] mobile:grid-cols-[1fr] mobile:[margin:22px_0_26px] mobile:gap-[10px]">
              {dictionary.companies.bullets.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={localizedPath(locale, "/talent")} variant="light">
              {dictionary.companies.action}
              <ArrowRightIcon />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        className="section-light specialties-section bg-white relative overflow-hidden"
        id="specialties"
      >
        <div className="page-container section-pad w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:112px_0] tablet:[padding:92px_0] mobile:w-[calc(100%_-_32px)] mobile:[padding:72px_0] mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)] compact:[padding:64px_0]">
          <SectionHeading
            eyebrow={dictionary.specialties.eyebrow}
            title={dictionary.specialties.title}
            description={dictionary.specialties.description}
            align="center"
          />
          <div className="specialty-grid grid grid-cols-[repeat(4,1fr)] gap-[14px] relative z-[1] tablet:grid-cols-[repeat(2,1fr)] mobile:grid-cols-[1fr] mobile:gap-[14px]">
            {dictionary.specialties.items.map((item, index) => (
              <article
                className={`specialty-card [--specialty-accent:var(--mint)] relative isolate overflow-hidden flex flex-col min-h-[360px] [border-width:1px] [border-style:solid] border-line rounded-[28px] p-[20px] [background:linear-gradient(180deg,#fff_0%,#fbfdfd_100%)] [transition:transform_.35s_cubic-bezier(.2,.75,.25,1),box-shadow_.35s,border-color_.35s] [outline:none] max-w-full mobile:min-h-0 mobile:p-[22px] mobile:rounded-[22px] motion-reduce:[transition:none]! specialty-card--${index + 1}`}
                key={item.title}
                tabIndex={0}
              >
                <div className="specialty-card__top flex justify-between items-center gap-[12px] relative z-[2]">
                  <span className="specialty-card__index text-[.65rem] font-extrabold tracking-[.12em] text-[#8a9695]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="specialty-card__code grid place-items-center min-w-[54px] h-[36px] [padding:0_11px] rounded-[999px] bg-brand-dark text-brand-mint [font:800_11px/1_monospace] tracking-[.03em] [transition:transform_.35s,background_.35s,color_.35s] motion-reduce:[transition:none]!">
                    {item.code}
                  </span>
                </div>

                <div
                  className="specialty-card__visual relative grid place-items-center h-[150px] [margin:12px_0_6px] mobile:min-h-[150px]"
                  aria-hidden="true"
                >
                  <span className="specialty-orbit specialty-orbit--outer absolute [border-width:1px] [border-style:solid] border-[rgba(47,52,54,.12)] rounded-[50%] [transition:transform_.65s_cubic-bezier(.2,.75,.25,1),border-color_.35s] w-[124px] h-[124px] motion-reduce:[transition:none]!" />
                  <span className="specialty-orbit specialty-orbit--inner absolute [border-width:1px] border-dashed border-[rgba(47,52,54,.12)] rounded-[50%] [transition:transform_.65s_cubic-bezier(.2,.75,.25,1),border-color_.35s] w-[82px] h-[82px] motion-reduce:[transition:none]!" />
                  <span className="specialty-core relative z-[2] grid place-items-center w-[58px] h-[58px] rounded-[18px] bg-brand-dark text-brand-mint [font:800_12px/1_monospace] [box-shadow:0_12px_28px_rgba(47,52,54,.14)] [transition:transform_.5s_cubic-bezier(.2,.75,.25,1),box-shadow_.35s] motion-reduce:[transition:none]!">
                    {item.code}
                  </span>
                  <span className="specialty-particle specialty-particle--one absolute w-[8px] h-[8px] rounded-[50%] bg-brand-mint [box-shadow:0_0_0_5px_rgba(132,192,191,.12)] [transition:transform_.55s_cubic-bezier(.2,.75,.25,1),opacity_.35s] top-[24px] right-[33%] motion-reduce:[transition:none]!" />
                  <span className="specialty-particle specialty-particle--two absolute w-[6px] h-[6px] rounded-[50%] bg-brand-mint [box-shadow:0_0_0_5px_rgba(132,192,191,.12)] [transition:transform_.55s_cubic-bezier(.2,.75,.25,1),opacity_.35s] left-[30%] bottom-[29px] motion-reduce:[transition:none]!" />
                  <span className="specialty-particle specialty-particle--three absolute w-[5px] h-[5px] rounded-[50%] bg-brand-mint [box-shadow:0_0_0_5px_rgba(132,192,191,.12)] [transition:transform_.55s_cubic-bezier(.2,.75,.25,1),opacity_.35s] right-[26%] bottom-[41px] opacity-[.55] motion-reduce:[transition:none]!" />
                </div>

                <div className="specialty-card__body mt-auto relative z-[2]">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

                <div
                  className="specialty-card__footer flex items-center gap-[12px] mt-[20px] relative z-[2] text-[#6c7a79] mobile:mt-[20px]"
                  aria-hidden="true"
                >
                  <span className="specialty-card__line h-[1px] flex-[1] [background:linear-gradient(90deg,rgba(47,52,54,.16),rgba(47,52,54,.05))] relative overflow-hidden" />
                  <ArrowRightIcon />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-section relative overflow-hidden [background:linear-gradient(110deg,#e8f4f3_0%,#f7fbfa_52%,#fff_100%)]">
        <div className="page-container section-pad showcase-grid w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:112px_0] grid grid-cols-[.88fr_1.12fr] gap-[82px] items-center relative tablet:grid-cols-[1fr] tablet:gap-[54px] tablet:[padding:92px_0] mobile:w-[calc(100%_-_32px)] mobile:[padding:72px_0] mobile:max-w-full mobile:mx-auto mobile:gap-[38px] compact:w-[calc(100%_-_28px)] compact:[padding:64px_0]">
          <div className="showcase-copy">
            <SectionHeading
              eyebrow={dictionary.profileShowcase.eyebrow}
              title={dictionary.profileShowcase.title}
              description={dictionary.profileShowcase.description}
            />
            <div
              className="showcase-signals flex items-stretch gap-0 [margin:28px_0_30px] [border-top:1px_solid_rgba(47,52,54,.12)] [border-bottom:1px_solid_rgba(47,52,54,.12)] max-w-[570px] tablet:max-w-[680px] mobile:[margin:20px_0_24px] mobile:grid mobile:grid-cols-[repeat(3,minmax(0,1fr))] mobile:w-full mobile:max-w-none"
              role="group"
              aria-label={dictionary.profileShowcase.signalsLabel}
            >
              <span>
                <strong>{featuredTalent.projects.length}</strong>
                {dictionary.profileShowcase.projectsSignal}
              </span>
              <span>
                <strong>{featuredTalent.technologies.length}</strong>
                {dictionary.profileShowcase.technologiesSignal}
              </span>
              <span>
                <strong>{featuredTalent.specialties.length}</strong>
                {dictionary.profileShowcase.specialtiesSignal}
              </span>
            </div>
            <Link
              className="text-link inline-flex items-center gap-[8px] font-bold text-[#456d6b]"
              href={localizedPath(locale, `/talent/${featuredTalent.slug}`)}
            >
              {dictionary.profileShowcase.viewProfile}
              <ArrowRightIcon />
            </Link>
          </div>

          <div className="evidence-panel relative bg-brand-dark text-white rounded-[34px] p-[30px] [box-shadow:0_34px_90px_rgba(41,52,52,.2)] overflow-hidden max-w-full mobile:[padding:20px_16px] mobile:rounded-[24px]">
            <div className="evidence-panel__header flex justify-between items-start gap-[28px] pb-[25px] [border-bottom:1px_solid_rgba(255,255,255,.12)] relative z-[1] mobile:gap-[18px] mobile:pb-[20px] mobile:items-start">
              <div>
                <span className="evidence-panel__eyebrow flex items-center gap-[8px] uppercase tracking-[.13em] text-brand-mint text-[.62rem] font-extrabold">
                  <span />
                  {dictionary.profileShowcase.activityEyebrow}
                </span>
                <h3>{dictionary.profileShowcase.activityTitle}</h3>
              </div>
              <span className="evidence-panel__count text-[2.35rem] leading-[1] font-extrabold text-[rgba(132,192,191,.82)] tracking-[-.06em] mobile:text-[1.65rem]">
                {featuredTalent.projects.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="evidence-timeline [padding:6px_0]">
              {featuredTalent.projects.map((project, index) => {
                const isFeatured = project.id === featuredProject.id;
                const evidenceLabel = isFeatured
                  ? dictionary.profileShowcase.featuredEvidence
                  : dictionary.profileShowcase.projectEvidence;

                return (
                  <article
                    className="evidence-item grid grid-cols-[48px_1fr] gap-[14px] relative mobile:grid-cols-[34px_minmax(0,1fr)] mobile:gap-[9px]"
                    key={project.id}
                  >
                    <div
                      className="evidence-item__rail relative flex justify-center pt-[24px] mobile:pt-[22px]"
                      aria-hidden="true"
                    >
                      <span className="evidence-item__node w-[34px] h-[34px] grid place-items-center [border-width:1px] [border-style:solid] border-[rgba(132,192,191,.42)] rounded-[11px] [background:#353c3e] text-brand-mint relative z-[1] mobile:w-[30px] mobile:h-[30px] mobile:rounded-[10px]">
                        <ProofIcon />
                      </span>
                    </div>
                    <div className="evidence-item__content [padding:21px_0_23px] [border-bottom:1px_solid_rgba(255,255,255,.09)] mobile:[padding:19px_0_21px] mobile:min-w-0">
                      <div className="evidence-item__meta flex items-center justify-between gap-[14px] mb-[6px] mobile:gap-[8px]">
                        <span>{evidenceLabel}</span>
                        <small>{String(index + 1).padStart(2, "0")}</small>
                      </div>
                      <h4>{project.name}</h4>
                      <p>{project.tagline}</p>
                      <div className="evidence-item__footer flex items-center justify-between gap-[12px] mt-[12px] mobile:items-start mobile:flex-col">
                        <div className="evidence-techs flex flex-wrap gap-[6px] mobile:gap-[6px]">
                          {project.technologies
                            .slice(0, 3)
                            .map((technology) => (
                              <span key={technology}>{technology}</span>
                            ))}
                        </div>
                        {project.liveUrl ? (
                          <span className="evidence-live inline-flex items-center gap-[6px] text-[#bcdedd] text-[.59rem] font-extrabold uppercase tracking-[.08em] whitespace-nowrap mobile:whitespace-normal">
                            <span />
                            {dictionary.profileShowcase.liveEvidence}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="evidence-panel__footer flex justify-between items-center gap-[18px] pt-[19px] [border-top:1px_solid_rgba(255,255,255,.12)] text-[.65rem] text-[#9eaaaa] mobile:items-start mobile:flex-col mobile:gap-[8px] compact:text-[.68rem]">
              <span>
                <CheckIcon />
                {dictionary.profileShowcase.verifiedWork}
              </span>
              <span>{dictionary.profileShowcase.evidenceFooter}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="community section-dark bg-brand-dark text-white"
        id="community"
      >
        <div className="page-container section-pad community-grid w-[min(1180px,calc(100%_-_40px))] mx-auto [padding:112px_0] grid grid-cols-[1.2fr_.8fr] gap-[70px] items-center tablet:grid-cols-[1fr] tablet:[padding:92px_0] tablet:gap-[54px] mobile:w-[calc(100%_-_32px)] mobile:[padding:72px_0] mobile:max-w-full mobile:mx-auto mobile:gap-[38px] compact:w-[calc(100%_-_28px)] compact:[padding:64px_0]">
          <div>
            <SectionHeading
              eyebrow={dictionary.community.eyebrow}
              title={dictionary.community.title}
              description={dictionary.community.description}
              inverse
            />
            <div className="community-chips flex flex-wrap gap-[8px] [margin:24px_0] mobile:gap-[7px] mobile:[margin:20px_0_24px]">
              {dictionary.community.chips.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="hero-actions flex gap-[12px] flex-wrap mt-[28px] mobile:flex-col mobile:gap-[10px] mobile:mt-[24px]">
              <ButtonLink href={siteConfig.discordUrl} external>
                {dictionary.community.primaryAction}
                <ArrowUpRightIcon />
              </ButtonLink>
              <ButtonLink
                href={localizedPath(locale, "#how-it-works")}
                variant="light"
              >
                {dictionary.community.secondaryAction}
                <ArrowRightIcon />
              </ButtonLink>
            </div>
          </div>
          <div className="community-cluster flex items-center justify-center min-h-[320px] tablet:w-full tablet:max-w-[680px] tablet:mx-auto tablet:[transform:none] tablet:overflow-hidden mobile:[transform:none] mobile:min-h-[190px] mobile:w-full mobile:max-w-full mobile:m-0 mobile:overflow-hidden mobile:justify-center mobile:gap-0">
            <TechieCharacter label="team()" compact />
            <TechieCharacter label="build()" compact />
            <TechieCharacter label="learn()" compact />
          </div>
        </div>
      </section>

      <section className="final-cta bg-brand-mint [padding:94px_0] mobile:[padding:68px_0]">
        <div className="page-container final-cta__inner w-[min(1180px,calc(100%_-_40px))] mx-auto max-w-[920px] mobile:w-full mobile:max-w-full mobile:mx-auto compact:w-[calc(100%_-_28px)]">
          <span className="eyebrow inline-flex items-center gap-[8px] uppercase tracking-[.14em] text-[.75rem] font-bold text-[#547b79] mobile:text-[.68rem] mobile:tracking-[.12em]">
            {dictionary.finalCta.eyebrow}
          </span>
          <h2>{dictionary.finalCta.title}</h2>
          <p>{dictionary.finalCta.description}</p>
          <div className="hero-actions flex gap-[12px] flex-wrap mt-[28px] mobile:flex-col mobile:gap-[10px] mobile:mt-[24px]">
            <ButtonLink
              href={siteConfig.discordUrl}
              external
              variant="secondary"
            >
              {dictionary.finalCta.primaryAction}
              <ArrowUpRightIcon />
            </ButtonLink>
            <ButtonLink href={localizedPath(locale, "/talent")} variant="ghost">
              {dictionary.finalCta.secondaryAction}
              <ArrowRightIcon />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

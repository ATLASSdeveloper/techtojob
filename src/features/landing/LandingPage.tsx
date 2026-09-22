import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import type { TalentProfile } from "@/domain/talent/types";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { TechieCharacter } from "@/components/TechieCharacter";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CodeIcon,
  ProofIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/Icons";
import { siteConfig } from "@/lib/site";
import { HeroVisual } from "./HeroVisual";

export function LandingPage({ dictionary, featuredTalent, locale }: { dictionary: Dictionary; featuredTalent: TalentProfile; locale: Locale }) {
  const featuredProject = featuredTalent.projects.find((project) => project.featured) ?? featuredTalent.projects[0];
  const profileHref = localizedPath(locale, `/talent/${featuredTalent.slug}`);
  const browserFilters = [featuredTalent.specialties[0], featuredTalent.specialties[1], featuredProject.technologies[0]].filter((item): item is string => Boolean(item)).slice(0, 3);
  const candidateInitials = featuredTalent.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const availabilityLabel = featuredTalent.availability === "open"
    ? dictionary.companies.discovery.availableNow
    : featuredTalent.availability === "unavailable"
      ? dictionary.companies.discovery.unavailableNow
      : dictionary.companies.discovery.selectiveAvailability;

  return (
    <main>
      <section className="hero section-shell">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{dictionary.hero.eyebrow}</span>
            <h1>{dictionary.hero.titleStart}<br /><span>{dictionary.hero.titleAccent}</span></h1>
            <p className="hero-description">{dictionary.hero.description}</p>
            <div className="hero-actions">
              <ButtonLink href={siteConfig.discordUrl} external>{dictionary.hero.primaryAction}<ArrowUpRightIcon /></ButtonLink>
              <ButtonLink href={localizedPath(locale, "#companies")} variant="secondary">{dictionary.hero.secondaryAction}<ArrowRightIcon /></ButtonLink>
            </div>
            <div className="hero-specialties">
              {dictionary.hero.specialties.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <HeroVisual profile={featuredTalent} dictionary={dictionary} locale={locale} />
        </div>
      </section>

      <section className="problem section-dark" id="problem">
        <div className="container section-pad">
          <SectionHeading eyebrow={dictionary.problem.eyebrow} title={dictionary.problem.title} description={dictionary.problem.lead} inverse />
          <div className="problem-grid">
            {dictionary.problem.cards.map((card) => (
              <article className="problem-card" key={card.label}>
                <strong>{card.stat}</strong><span>{card.label}</span><p>{card.text}</p>
              </article>
            ))}
          </div>
          <p className="problem-closing">{dictionary.problem.closing}</p>
        </div>
      </section>

      <section className="section-light" id="how-it-works">
        <div className="container section-pad">
          <SectionHeading eyebrow={dictionary.howItWorks.eyebrow} title={dictionary.howItWorks.title} description={dictionary.howItWorks.description} />
          <div className="steps-journey">
            <div className="steps-track" aria-hidden="true" />
            <div className="steps-grid">
              {dictionary.howItWorks.steps.map((step, index) => {
                const icons = [<CodeIcon key="build" />, <TrophyIcon key="challenge" />, <ProofIcon key="proof" />, <UsersIcon key="connect" />];

                return (
                  <article className="step-item" key={step.number}>
                    <div className="step-marker" aria-hidden="true">
                      <span className="step-number">{step.number}</span>
                      <span className="step-icon">{icons[index]}</span>
                    </div>
                    <div className="step-card">
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

      <section className="dual-section" id="talent">
        <div className="container section-pad dual-grid">
          <div>
            <SectionHeading eyebrow={dictionary.talent.eyebrow} title={dictionary.talent.title} description={dictionary.talent.description} />
            <ul className="feature-list">{dictionary.talent.bullets.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>
            <ButtonLink href={siteConfig.discordUrl} external>{dictionary.talent.action}<ArrowUpRightIcon /></ButtonLink>
          </div>
          <div className="community-visual">
            <TechieCharacter label="ship()" />
            <div className="floating-code floating-code--a">git push origin main</div>
            <div className="floating-code floating-code--b">{dictionary.visuals.deployed}</div>
            <div className="floating-code floating-code--c">{dictionary.visuals.project}</div>
          </div>
        </div>
      </section>

      <section className="companies section-dark" id="companies">
        <div className="container section-pad dual-grid dual-grid--reverse">
          <div className="talent-discovery-mock" tabIndex={0} aria-label={dictionary.companies.discovery.mockLabel}>
            <div className="talent-discovery__frame">
              <div className="talent-discovery__bar">
                <div className="talent-discovery__dots" aria-hidden="true"><span /><span /><span /></div>
                <small>talent.techtojob</small>
                <span className="talent-discovery__results-pill">{dictionary.companies.discovery.resultsCount}</span>
              </div>

              <div className="talent-discovery__toolbar">
                <div className="discovery-search" aria-label={dictionary.companies.discovery.searchLabel}>
                  <SearchIcon />
                  <span>{dictionary.companies.discovery.searchPlaceholder}</span>
                  <kbd>/</kbd>
                </div>
                <div className="discovery-toolbar-action">
                  <SlidersHorizontalIcon />
                  <span>{dictionary.companies.discovery.filterAction}</span>
                </div>
              </div>

              <div className="discovery-filter-group">
                <span className="discovery-filter-group__label">{dictionary.companies.discovery.filtersLabel}</span>
                <div className="discovery-filter-chips">
                  {browserFilters.map((item) => <span className="discovery-filter-chip" key={item}>{item}</span>)}
                </div>
              </div>

              <div className="discovery-layout">
                <div className="discovery-panel">
                  <div className="discovery-section-heading">
                    <span>{dictionary.companies.discovery.resultsLabel}</span>
                    <strong>{dictionary.companies.discovery.highlightLabel}</strong>
                  </div>

                  <article className="discovery-result-card">
                    <div className="discovery-result-card__top">
                      <div className="discovery-result-card__avatar">{candidateInitials}</div>
                      <div>
                        <strong>{featuredTalent.name}</strong>
                        <small>{featuredTalent.role}</small>
                      </div>
                      <span className="discovery-status-pill"><span />{availabilityLabel}</span>
                    </div>

                    <div className="discovery-result-card__signals">
                      <span>{dictionary.common.realWork}</span>
                      <span>{featuredTalent.projects.length} {dictionary.companies.discovery.projectsLabel}</span>
                      <span>{featuredTalent.technologies.length} {dictionary.companies.discovery.technologiesLabel}</span>
                    </div>

                    <div className="discovery-meter-block">
                      <div className="discovery-meter-block__label">
                        <span>{dictionary.companies.discovery.evidenceLabel}</span>
                        <strong>{dictionary.companies.discovery.evidenceValue}</strong>
                      </div>
                      <div className="discovery-meter" aria-hidden="true"><span /></div>
                    </div>
                  </article>

                  <div className="discovery-mini-cards">
                    <article className="discovery-mini-card discovery-mini-card--accent">
                      <small>{dictionary.companies.discovery.featuredProjectLabel}</small>
                      <strong>{featuredProject.name}</strong>
                      <p>{featuredProject.tagline}</p>
                    </article>
                    <article className="discovery-mini-card">
                      <small>{dictionary.companies.discovery.evidenceFooterLabel}</small>
                      <strong>{featuredTalent.links.length} {dictionary.companies.discovery.linksLabel}</strong>
                      <p>{dictionary.companies.discovery.evidenceFooterText}</p>
                    </article>
                  </div>
                </div>

                <div className="discovery-panel discovery-panel--evidence">
                  <div className="discovery-section-heading">
                    <span>{dictionary.companies.discovery.evidencePanelLabel}</span>
                    <strong>{dictionary.companies.discovery.evidencePanelValue}</strong>
                  </div>

                  <div className="discovery-evidence-list">
                    <article className="discovery-evidence-card discovery-evidence-card--project">
                      <small>{dictionary.companies.discovery.featuredProjectLabel}</small>
                      <strong>{featuredProject.name}</strong>
                      <p>{featuredProject.tagline}</p>
                      <div className="discovery-evidence-tags">
                        {featuredProject.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}
                      </div>
                    </article>

                    <article className="discovery-evidence-card">
                      <small>{dictionary.companies.discovery.specialtiesLabel}</small>
                      <strong>{featuredTalent.specialties.slice(0, 2).join(" · ")}</strong>
                      <p>{dictionary.companies.discovery.specialtiesText}</p>
                    </article>

                    <article className="discovery-evidence-card">
                      <small>{dictionary.companies.discovery.linksLabel}</small>
                      <strong>{featuredTalent.links.map((link) => link.label).join(" · ")}</strong>
                      <p>{dictionary.companies.discovery.linksText}</p>
                    </article>
                  </div>

                  <Link className="discovery-evidence__link" href={profileHref}>
                    {dictionary.common.viewProfile}
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow={dictionary.companies.eyebrow} title={dictionary.companies.title} description={dictionary.companies.description} inverse />
            <ul className="feature-list feature-list--inverse">{dictionary.companies.bullets.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>
            <ButtonLink href={localizedPath(locale, "/talent")} variant="light">{dictionary.companies.action}<ArrowRightIcon /></ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-light specialties-section" id="specialties">
        <div className="container section-pad">
          <SectionHeading eyebrow={dictionary.specialties.eyebrow} title={dictionary.specialties.title} description={dictionary.specialties.description} align="center" />
          <div className="specialty-grid">
            {dictionary.specialties.items.map((item, index) => (
              <article className={`specialty-card specialty-card--${index + 1}`} key={item.title} tabIndex={0}>
                <div className="specialty-card__top">
                  <span className="specialty-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="specialty-card__code">{item.code}</span>
                </div>

                <div className="specialty-card__visual" aria-hidden="true">
                  <span className="specialty-orbit specialty-orbit--outer" />
                  <span className="specialty-orbit specialty-orbit--inner" />
                  <span className="specialty-core">{item.code}</span>
                  <span className="specialty-particle specialty-particle--one" />
                  <span className="specialty-particle specialty-particle--two" />
                  <span className="specialty-particle specialty-particle--three" />
                </div>

                <div className="specialty-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

                <div className="specialty-card__footer" aria-hidden="true">
                  <span className="specialty-card__line" />
                  <ArrowRightIcon />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="container section-pad showcase-grid">
          <div className="showcase-copy">
            <SectionHeading eyebrow={dictionary.profileShowcase.eyebrow} title={dictionary.profileShowcase.title} description={dictionary.profileShowcase.description} />
            <div className="showcase-signals" aria-label={dictionary.profileShowcase.signalsLabel}>
              <span><strong>{featuredTalent.projects.length}</strong>{dictionary.profileShowcase.projectsSignal}</span>
              <span><strong>{featuredTalent.technologies.length}</strong>{dictionary.profileShowcase.technologiesSignal}</span>
              <span><strong>{featuredTalent.specialties.length}</strong>{dictionary.profileShowcase.specialtiesSignal}</span>
            </div>
            <Link className="text-link" href={profileHref}>{dictionary.profileShowcase.viewProfile}<ArrowRightIcon /></Link>
          </div>

          <div className="evidence-panel">
            <div className="evidence-panel__header">
              <div>
                <span className="evidence-panel__eyebrow"><span />{dictionary.profileShowcase.activityEyebrow}</span>
                <h3>{dictionary.profileShowcase.activityTitle}</h3>
              </div>
              <span className="evidence-panel__count">{featuredTalent.projects.length.toString().padStart(2, "0")}</span>
            </div>

            <div className="evidence-timeline">
              {featuredTalent.projects.map((project, index) => {
                const isFeatured = project.id === featuredProject.id;
                const evidenceLabel = isFeatured
                  ? dictionary.profileShowcase.featuredEvidence
                  : dictionary.profileShowcase.projectEvidence;

                return (
                  <article className="evidence-item" key={project.id}>
                    <div className="evidence-item__rail" aria-hidden="true">
                      <span className="evidence-item__node"><ProofIcon /></span>
                    </div>
                    <div className="evidence-item__content">
                      <div className="evidence-item__meta">
                        <span>{evidenceLabel}</span>
                        <small>{String(index + 1).padStart(2, "0")}</small>
                      </div>
                      <h4>{project.name}</h4>
                      <p>{project.tagline}</p>
                      <div className="evidence-item__footer">
                        <div className="evidence-techs">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div>
                        {project.liveUrl ? <span className="evidence-live"><span />{dictionary.profileShowcase.liveEvidence}</span> : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="evidence-panel__footer">
              <span><CheckIcon />{dictionary.profileShowcase.verifiedWork}</span>
              <span>{dictionary.profileShowcase.evidenceFooter}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="community section-dark" id="community">
        <div className="container section-pad community-grid">
          <div>
            <SectionHeading eyebrow={dictionary.community.eyebrow} title={dictionary.community.title} description={dictionary.community.description} inverse />
            <div className="community-chips">{dictionary.community.chips.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="hero-actions"><ButtonLink href={siteConfig.discordUrl} external>{dictionary.community.primaryAction}<ArrowUpRightIcon /></ButtonLink><ButtonLink href={localizedPath(locale, "#how-it-works")} variant="light">{dictionary.community.secondaryAction}<ArrowRightIcon /></ButtonLink></div>
          </div>
          <div className="community-cluster"><TechieCharacter label="team()" compact /><TechieCharacter label="build()" compact /><TechieCharacter label="learn()" compact /></div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta__inner">
          <span className="eyebrow">{dictionary.finalCta.eyebrow}</span><h2>{dictionary.finalCta.title}</h2><p>{dictionary.finalCta.description}</p>
          <div className="hero-actions"><ButtonLink href={siteConfig.discordUrl} external variant="secondary">{dictionary.finalCta.primaryAction}<ArrowUpRightIcon /></ButtonLink><ButtonLink href={localizedPath(locale, "/talent")} variant="ghost">{dictionary.finalCta.secondaryAction}<ArrowRightIcon /></ButtonLink></div>
        </div>
      </section>
    </main>
  );
}

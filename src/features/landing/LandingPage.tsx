import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/routing";
import type { TalentProfile } from "@/domain/talent/types";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { TechieCharacter } from "@/components/TechieCharacter";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, CodeIcon, UsersIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";
import { HeroVisual } from "./HeroVisual";

export function LandingPage({ dictionary, featuredTalent, locale }: { dictionary: Dictionary; featuredTalent: TalentProfile; locale: Locale }) {
  const featuredProject = featuredTalent.projects.find((project) => project.featured) ?? featuredTalent.projects[0];

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
          <div className="steps-grid">
            {dictionary.howItWorks.steps.map((step, index) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div className="step-icon">{index === 0 ? <CodeIcon /> : index === 3 ? <UsersIcon /> : <span>{index + 1}</span>}</div>
                <h3>{step.title}</h3><p>{step.text}</p>
              </article>
            ))}
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
          <div className="talent-browser-mock">
            <div className="browser-bar"><span/><span/><span/><small>talent.techtojob</small></div>
            <div className="browser-filters"><span>Full-Stack</span><span>Backend</span><span>Next.js</span></div>
            <div className="browser-profile">
              <div className="browser-avatar">SI</div><div><strong>{featuredTalent.name}</strong><small>{featuredTalent.role}</small></div><span className="match-pill">{dictionary.common.realWork}</span>
            </div>
            <div className="browser-project"><small>{dictionary.common.publishedProject}</small><strong>{featuredProject.name}</strong><span>{featuredProject.technologies.slice(0,3).join(" · ")}</span></div>
          </div>
          <div>
            <SectionHeading eyebrow={dictionary.companies.eyebrow} title={dictionary.companies.title} description={dictionary.companies.description} inverse />
            <ul className="feature-list feature-list--inverse">{dictionary.companies.bullets.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>
            <ButtonLink href={localizedPath(locale, "/talent")} variant="light">{dictionary.companies.action}<ArrowRightIcon /></ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-light" id="specialties">
        <div className="container section-pad">
          <SectionHeading eyebrow={dictionary.specialties.eyebrow} title={dictionary.specialties.title} description={dictionary.specialties.description} align="center" />
          <div className="specialty-grid">
            {dictionary.specialties.items.map((item) => <article className="specialty-card" key={item.title}><span>{item.code}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="container section-pad showcase-grid">
          <div>
            <SectionHeading eyebrow={dictionary.profileShowcase.eyebrow} title={dictionary.profileShowcase.title} description={dictionary.profileShowcase.description} />
            <div className="proof-row"><span><CheckIcon />{dictionary.profileShowcase.verifiedWork}</span><span className="live-pill"><span/> {dictionary.profileShowcase.liveProject}</span></div>
            <Link className="text-link" href={localizedPath(locale, `/talent/${featuredTalent.slug}`)}>{dictionary.profileShowcase.viewProfile}<ArrowRightIcon /></Link>
          </div>
          <div className="profile-proof-card">
            <div className="profile-proof-card__header"><strong>{featuredTalent.name}</strong><small>{featuredTalent.role}</small></div>
            <div className="profile-proof-card__meter"><span>{dictionary.talentProfile.projects}</span><strong>{featuredTalent.projects.length}</strong></div>
            <div className="profile-proof-card__project"><small>{dictionary.common.featuredProject.toUpperCase()}</small><strong>{featuredProject.name}</strong><p>{featuredProject.tagline}</p></div>
            <div className="chip-list">{featuredTalent.technologies.slice(0,5).map((item) => <span key={item}>{item}</span>)}</div>
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

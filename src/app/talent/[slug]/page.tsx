import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTalentBySlug, talentProfiles } from "@/data/talents";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ProjectCard } from "@/features/talent/ProjectCard";
import { ArrowUpRightIcon, CheckIcon, GithubIcon, LinkedinIcon } from "@/components/Icons";

export function generateStaticParams() {
  return talentProfiles.map((profile) => ({ slug: profile.slug }));
}

export default async function TalentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = getTalentBySlug(slug);
  if (!profile) notFound();
  const dictionary = await getDictionary(defaultLocale);

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="container">
          <Link href="/talent" className="text-link text-link--muted">← {dictionary.talentProfile.back}</Link>
          <div className="profile-hero__grid">
            <div className="profile-photo-wrap">
              <Image src={profile.avatar} width={560} height={560} alt={`Foto de ${profile.name}`} className="profile-photo" priority />
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
          <div className="profile-section-title"><span className="eyebrow">{dictionary.talentProfile.projects}</span><h2>{dictionary.common.visibleWorkTitle}</h2></div>
          <div className="projects-grid">{profile.projects.map((project) => <ProjectCard project={project} dictionary={dictionary} key={project.id} />)}</div>
        </div>
        <aside className="profile-sidebar">
          <div className="profile-side-card"><h3>{dictionary.talentProfile.specialties}</h3><div className="chip-list">{profile.specialties.map((item) => <span key={item}>{item}</span>)}</div></div>
          <div className="profile-side-card"><h3>{dictionary.talentProfile.technologies}</h3><div className="chip-list">{profile.technologies.map((item) => <span key={item}>{item}</span>)}</div></div>
        </aside>
      </section>
    </main>
  );
}

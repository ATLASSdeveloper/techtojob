import type { TalentProject } from "@/domain/talent/types";
import type { Dictionary } from "@/i18n/getDictionary";
import { ArrowUpRightIcon } from "@/components/Icons";

export function ProjectCard({ project, dictionary }: { project: TalentProject; dictionary: Dictionary }) {
  return (
    <article className="project-card">
      <div className="project-card__head">
        <div>
          <span className="mini-label">{project.featured ? dictionary.common.featuredProject : dictionary.common.project}</span>
          <h3>{project.name}</h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>
        {project.liveUrl ? <span className="live-pill"><span /> LIVE</span> : null}
      </div>
      <p>{project.description}</p>
      <div className="chip-list">
        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
      {project.liveUrl ? (
        <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
          {dictionary.talentProfile.visitProject} <ArrowUpRightIcon />
        </a>
      ) : null}
    </article>
  );
}

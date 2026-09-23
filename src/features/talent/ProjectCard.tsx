import type { TalentProject } from "@/domain/talent/types";
import type { Dictionary } from "@/i18n/getDictionary";
import { ArrowUpRightIcon } from "@/components/Icons";

export function ProjectCard({
  project,
  dictionary,
}: {
  project: TalentProject;
  dictionary: Dictionary;
}) {
  return (
    <article className="project-card [border-width:1px] [border-style:solid] border-line rounded-[24px] p-[24px]">
      <div className="project-card__head flex justify-between gap-[18px] mobile:flex-col">
        <div>
          <span className="mini-label text-[.64rem] tracking-[.11em] uppercase text-[#66706f] font-extrabold block">
            {project.featured
              ? dictionary.common.featuredProject
              : dictionary.common.project}
          </span>
          <h3>{project.name}</h3>
          <p className="project-card__tagline [margin:2px_0_0]! text-[#73807f]">
            {project.tagline}
          </p>
        </div>
        {project.liveUrl ? (
          <span className="live-pill inline-flex! items-center gap-[6px] h-[27px] [padding:0_10px] rounded-[999px] [background:#edf7f6] text-[#426d6a] text-[.64rem]! font-extrabold! whitespace-nowrap">
            <span /> {dictionary.common.live}
          </span>
        ) : null}
      </div>
      <p>{project.description}</p>
      <div className="chip-list flex flex-wrap gap-[7px]">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      {project.liveUrl ? (
        <a
          className="text-link inline-flex items-center gap-[8px] font-bold text-[#456d6b]"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
        >
          {dictionary.talentProfile.visitProject} <ArrowUpRightIcon />
        </a>
      ) : null}
    </article>
  );
}

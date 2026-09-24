import type { TalentProfileBase } from "@/domain/talent/types";

export const talentProfilesBase: TalentProfileBase[] = [
  {
    id: "sebastian-ilbay",
    slug: "sebastian-ilbay",
    name: "Sebastián Ilbay",
    location: "Ambato, Ecuador",
    avatar: "/talent/sebastian-ilbay.webp",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Spring Boot",
      ".NET Core",
    ],
    availability: "selective",
    featured: true,
    verified: true,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ATLASSdeveloper",
        kind: "github",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sebasti%C3%A1n-ilbay-rodr%C3%ADguez-4a27bb311/",
        kind: "linkedin",
      },
    ],
    projects: [
      {
        id: "techtojob-landing",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        liveUrl: "https://techtojob-rho.vercel.app/",
      },
      {
        id: "athena-lms",
        technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
        liveUrl: "https://lms.gaiaecsa.com/",
        featured: true,
      },
      {
        id: "local-rag-assistant",
        technologies: ["React", "FastAPI", "Ollama", "Python"],
      },
      {
        id: "computer-vision",
        technologies: ["Python", "CNN", "Computer Vision"],
      },
    ],
  },
];

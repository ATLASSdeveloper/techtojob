import type { TalentProfile } from "@/domain/talent/types";

export const talentProfiles: TalentProfile[] = [
  {
    id: "sebastian-ilbay",
    slug: "sebastian-ilbay",
    name: "Sebastián Ilbay",
    role: "Full-Stack Developer",
    location: "Ambato, Ecuador",
    avatar: "/talent/sebastian-ilbay.webp",
    bio: "Desarrollador Full-Stack enfocado en aplicaciones web, APIs, arquitectura de software y sistemas escalables. Ha trabajado con plataformas educativas, integraciones de pago, infraestructura Linux y modernización de sistemas.",
    specialties: ["Full-Stack", "Backend", "Web Development"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Spring Boot",
      ".NET Core"
    ],
    availability: "selective",
    featured: true,
    verified: true,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ATLASSdeveloper",
        kind: "github"
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sebasti%C3%A1n-ilbay-rodr%C3%ADguez-4a27bb311/",
        kind: "linkedin"
      }
    ],
    projects: [
      {
        id: "athena-lms",
        name: "ATHENA",
        tagline: "Learning Management System",
        description: "Plataforma LMS multi-tenant para gestión educativa con usuarios, cursos, matrículas, evaluaciones, certificados e integraciones académicas.",
        technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
        liveUrl: "https://lms.gaiaecsa.com/",
        featured: true
      },
      {
        id: "local-rag-assistant",
        name: "Asistente Q&A con LLM",
        tagline: "RAG sobre documentos locales",
        description: "Aplicación Full-Stack para consultar documentos locales mediante recuperación aumentada por generación.",
        technologies: ["React", "FastAPI", "Ollama", "Python"]
      },
      {
        id: "computer-vision",
        name: "Visión por Computadora",
        tagline: "Segmentación y extracción de color",
        description: "Modelo de visión por computadora para segmentación de prendas y extracción de color utilizando redes convolucionales.",
        technologies: ["Python", "CNN", "Computer Vision"]
      }
    ]
  }
];

export const featuredTalent = talentProfiles.find((profile) => profile.featured) ?? talentProfiles[0];

export function getTalentBySlug(slug: string): TalentProfile | undefined {
  return talentProfiles.find((profile) => profile.slug === slug);
}

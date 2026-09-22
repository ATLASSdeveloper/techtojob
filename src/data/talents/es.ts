import type { TalentTranslations } from "@/domain/talent/types";

export const talentTranslationsEs = {
  "sebastian-ilbay": {
    role: "Desarrollador Full-Stack",
    bio: "Desarrollador Full-Stack enfocado en aplicaciones web, APIs, arquitectura de software y sistemas escalables. Ha trabajado con plataformas educativas, integraciones de pago, infraestructura Linux y modernización de sistemas.",
    specialties: ["Full-Stack", "Backend", "Desarrollo web"],
    projects: {
      "athena-lms": {
        name: "ATHENA",
        tagline: "Sistema de gestión del aprendizaje",
        description: "Plataforma LMS multi-tenant para gestión educativa con usuarios, cursos, matrículas, evaluaciones, certificados e integraciones académicas.",
      },
      "local-rag-assistant": {
        name: "Asistente de preguntas y respuestas con LLM",
        tagline: "RAG sobre documentos locales",
        description: "Aplicación Full-Stack para consultar documentos locales mediante recuperación aumentada por generación.",
      },
      "computer-vision": {
        name: "Visión por computadora",
        tagline: "Segmentación y extracción de color",
        description: "Modelo de visión por computadora para segmentación de prendas y extracción de color utilizando redes convolucionales.",
      },
    },
  },
} satisfies TalentTranslations;

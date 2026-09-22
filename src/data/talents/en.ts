import type { TalentTranslations } from "@/domain/talent/types";

export const talentTranslationsEn = {
  "sebastian-ilbay": {
    role: "Full-Stack Developer",
    bio: "Full-Stack Developer focused on web applications, APIs, software architecture, and scalable systems. He has worked with educational platforms, payment integrations, Linux infrastructure, and system modernization.",
    specialties: ["Full-Stack", "Backend", "Web Development"],
    projects: {
      "athena-lms": {
        name: "ATHENA",
        tagline: "Learning Management System",
        description: "Multi-tenant LMS platform for educational management, including users, courses, enrollments, assessments, certificates, and academic integrations.",
      },
      "local-rag-assistant": {
        name: "LLM Q&A Assistant",
        tagline: "RAG over local documents",
        description: "Full-Stack application for querying local documents through retrieval-augmented generation.",
      },
      "computer-vision": {
        name: "Computer Vision",
        tagline: "Segmentation and color extraction",
        description: "Computer vision model for garment segmentation and color extraction using convolutional neural networks.",
      },
    },
  },
} satisfies TalentTranslations;

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bethania Saraiva Psicóloga Clínica",
    short_name: "Bethania Saraiva",
    description:
      "Psicoterapia clínica presencial em Carlos Barbosa e atendimento online.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f0ea",
    theme_color: "#422719",
    lang: "pt-BR",
    categories: ["health", "medical", "lifestyle"],
    icons: [
      {
        src: "/assets/bethania-retrato.png",
        sizes: "796x871",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

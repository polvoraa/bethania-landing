import type { Metadata } from "next";
import "./site.css";
import "./legacy-editor.css";
import "./responsive.css";
import "./animations.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://psibethaniasaraiva.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bethania Saraiva | Psicóloga Clínica em Carlos Barbosa",
    template: "%s | Bethania Saraiva",
  },
  description:
    "Psicóloga clínica em Carlos Barbosa, RS. Psicoterapia presencial e online com escuta acolhedora para emoções, relações, comunicação e autoconhecimento.",
  applicationName: "Bethania Saraiva Psicóloga Clínica",
  authors: [{ name: "Bethania Saraiva" }],
  creator: "Bethania Saraiva",
  publisher: "Bethania Saraiva",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Bethania Saraiva",
    "psicóloga clínica",
    "psicóloga em Carlos Barbosa",
    "psicoterapia em Carlos Barbosa",
    "psicoterapia online",
    "atendimento psicológico online",
    "terapia em Carlos Barbosa RS",
    "relações e comunicação",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Bethania Saraiva Psicóloga Clínica",
    title: "Bethania Saraiva | Psicóloga Clínica em Carlos Barbosa",
    description:
      "Psicoterapia clínica presencial em Carlos Barbosa e atendimento online com escuta ética, acolhedora e individualizada.",
    images: [
      {
        url: "/assets/bethania-retrato.png",
        width: 796,
        height: 871,
        alt: "Retrato da psicóloga Bethania Saraiva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bethania Saraiva | Psicóloga Clínica em Carlos Barbosa",
    description:
      "Psicoterapia presencial em Carlos Barbosa e atendimento online com escuta acolhedora.",
    images: ["/assets/bethania-retrato.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "healthcare",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#422719" />
        <link rel="stylesheet" href="/editor-overrides.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

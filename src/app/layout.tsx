import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["opsz", "SOFT", "WONK"],
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://medoune-business-analyst.vercel.app'),
  title: "MEDOUNE CAMARA | Economist & Revenue Growth Strategist",
  description: "Economist & Revenue Growth Strategist à Yamoussoukro — j'aide les PME à structurer leur croissance par la donnée. Analyses, recherches et projets à l'appui.",

  verification: {
    google: "IJOBHxSR0g4Ukl-rrMNoH6mxRwiykmkTpu0NBUnxtmY",
  },

  openGraph: {
    title: 'Medoune Camara | Economist & Revenue Growth Strategist',
    description: 'J\'aide les PME à structurer leur croissance grâce à la donnée — analyses, stratégie de revenus, écosystèmes numériques.',
    url: 'https://medoune-business-analyst.vercel.app',
    siteName: 'Medoune Camara Portfolio',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Espace de travail stratégique de Medoune Camara',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-paper text-ink antialiased font-sans">
        <Navbar />
        {children}

{/* SCRIPT JSON-LD POUR LE BRANDING GOOGLE & IA */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Medoune Camara",
      "jobTitle": "Economist & Revenue Growth Strategist",
      "url": "https://medoune-business-analyst.vercel.app",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Yamoussoukro",
        "addressCountry": "CI"
      },
      "sameAs": [
        "https://www.linkedin.com/in/medoune-camara",
        "https://web.facebook.com/MedouneCamara225",
        "https://youtube.com/@medounecamara-s8n",
        "https://x.com/Medoune_ecodata"
      ],
      "knowsAbout": [
        "Business Intelligence",
        "Revenue Strategy",
        "SME Growth Strategy",
        "SaaS Development",
        "Economic Modeling",
        "Data Analysis"
      ],
      "brand": [
        {
          "@type": "Brand",
          "name": "Evalis Corp",
          "description": "Solution SaaS de gestion commerciale avec IA pour les PME ivoiriennes."
        },
        {
          "@type": "Brand",
          "name": "ADN (African Data Network)",
          "description": "Écosystème de communauté et d'académie data destiné à former la prochaine génération d'analystes africains."
        }
      ]
    })
  }}
/>

 </body>
    </html>
  );
}

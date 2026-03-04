import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL('https://medoune-business-analyst.vercel.app'),
  title: "MEDOUNE CAMARA | Economist & Business Analyst",
  description: "Expert en Revenue Strategy, Segmentation RFM et solutions SaaS à Yamoussoukro. Transformer la donnée en levier de croissance.",
  
  // --- VÉRIFICATION GOOGLE (C'est cette ligne qu'il manquait) ---
  verification: {
    google: "IJOBHxSR0g4Ukl-rrMNoH6mxRwiykmkTpu0NBUnxtmY",
  },

  // --- CONFIGURATION OPEN GRAPH ---
  openGraph: {
    title: 'Medoune Camara | Stratégie & Data',
    description: 'Expertise en analyse de revenus et déploiement de solutions technologiques.',
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

  // --- CONFIGURATION FAVICON ---
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
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-midnight antialiased font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

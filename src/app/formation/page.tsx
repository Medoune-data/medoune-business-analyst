import RegistrationForm from '@/components/RegistrationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formation Excel : De Zéro à Business Analyst | Medoune Camara',
  description: 'Rejoins la promo Excel 2026 à Yamoussoukro. Apprends le nettoyage de données, les TCD et la création de dashboards pro.',
  openGraph: {
    title: 'Formation Excel : De Zéro à Business Analyst',
    description: 'Une formation pratique pour maîtriser la data. Inscription gratuite.',
    url: 'https://medoune-business-analyst.vercel.app/formation',
    siteName: 'Medoune Camara - Business Analyst',
    images: [
      {
        url: 'https://medoune-business-analyst.vercel.app/og-formation.png', // On va créer cette image
        width: 1200,
        height: 630,
        alt: 'Aperçu de la formation Excel',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function FormationPage() {
  return (
    // pt-40 pour laisser de la place à la Navbar, pb-20 pour le bas
    <main className="min-h-screen bg-black text-white pt-40 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Formation Excel : De Zéro à Data Analyst
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Apprends à manipuler les données, créer des tableaux de bord et maîtriser les outils 
          utilisés par les pros. Spécialement conçu pour les étudiants ambitieux.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-semibold">Ce que tu vas apprendre :</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">✅ <span className="text-gray-300">Nettoyage de données massives</span></li>
              <li className="flex items-center gap-2">✅ <span className="text-gray-300">Maîtrise de RECHERCHEV et TCD</span></li>
              <li className="flex items-center gap-2">✅ <span className="text-gray-300">Création de Dashboards interactifs</span></li>
              {/* Clin d'œil à ton sujet de thèse */}
              <li className="flex items-center gap-2">✅ <span className="text-gray-300">Cas pratiques : Analyse Du Dataset TradeCo</span></li> 
            </ul>
          </div>
          
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}

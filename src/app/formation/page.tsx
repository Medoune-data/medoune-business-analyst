import RegistrationForm from '@/components/RegistrationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "L'Arsenal du Data Analyst | Formations Excel, SQL & R | Medoune Camara",
  description: "Rejoignez l'élite de la donnée. Un cursus complet (Excel Pro, SQL Master, R Strategy) conçu pour transformer votre carrière et dominer la stratégie de revenus, où que vous soyez.",
  openGraph: {
    title: "L'Arsenal du Data Analyst | Medoune Camara",
    description: "Formations intensives en Data Analysis et Revenue Strategy. Réservez votre place pour la prochaine session.",
    url: 'https://medoune-business-analyst.vercel.app/formation',
    siteName: 'Medoune Camara - Stratégie & Data',
    images: [
      {
        url: 'https://medoune-business-analyst.vercel.app/og-formation.png', 
        width: 1200,
        height: 630,
        alt: 'Cursus Data Analyst : Excel, SQL et R',
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
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-accent-primary to-purple-500 bg-clip-text text-transparent">
          L'Arsenal du Data Analyst
        </h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
          De la gestion de flux sur Excel à la modélisation économétrique sur R. <br/>
          Trois piliers stratégiques pour dominer la donnée et les revenus.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-24 text-left">
          <div className="p-8 border border-green-500/20 bg-green-500/5 rounded-2xl">
            <div className="text-green-500 font-mono text-[10px] uppercase tracking-widest mb-4">01. Office</div>
            <h3 className="text-xl font-bold mb-2 text-white">EXCEL PRO</h3>
            <p className="text-sm text-gray-500 font-light">Dashboards interactifs et nettoyage de données pour PME.</p>
          </div>
          <div className="p-8 border border-blue-500/20 bg-blue-500/5 rounded-2xl">
            <div className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-4">02. Database</div>
            <h3 className="text-xl font-bold mb-2 text-white">SQL MASTER</h3>
            <p className="text-sm text-gray-500 font-light">Extraction et manipulation de bases de données relationnelles.</p>
          </div>
          <div className="p-8 border border-purple-500/20 bg-purple-500/5 rounded-2xl">
            <div className="text-purple-500 font-mono text-[10px] uppercase tracking-widest mb-4">03. Science</div>
            <h3 className="text-xl font-bold mb-2 text-white">R STRATEGY</h3>
            <p className="text-sm text-gray-500 font-light">Analyse économétrique et prédiction pour la stratégie de revenus.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left">
  <h3 className="text-3xl font-serif italic text-white">Prêt à changer de dimension ?</h3>
  <p className="text-gray-400 font-light leading-relaxed">
  Que vous soyez débutant sur Excel ou que vous vouliez maîtriser l'analyse de données sur R, ce cursus est conçu pour la performance réelle. 
  <br /><br />
  Rejoignez la nouvelle promotion internationale et apprenez à transformer des données brutes en leviers de croissance indiscutables, sans aucune limite géographique.
</p>
  <div className="p-6 border border-accent-primary/20 bg-accent-primary/5 rounded-xl">
    <p className="text-xs text-accent-primary font-mono uppercase tracking-widest mb-2 font-bold">Le Choix des Leaders</p>
    <p className="text-sm text-gray-300">Le <strong>Pack Complet (Elite)</strong> inclut l'accès aux 3 outils + mon guide exclusif de 20 pages pour les débutants.</p>
  </div>
</div>
          
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}

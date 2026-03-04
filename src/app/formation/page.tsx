import RegistrationForm from '@/components/RegistrationForm';

export default function FormationPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Formation Excel : De Zéro à Business Analyst
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
              <li className="flex items-center gap-2">✅ <span className="text-gray-300">Cas pratiques : Analyse Mobile Money</span></li>
            </ul>
          </div>
          
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}

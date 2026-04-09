"use client";
import Navbar from '@/components/Navbar';

const services = [
  {
    title: "Data Visualization & Dashboards",
    description: "Transformation de vos données brutes en tableaux de bord dynamiques et automatisés. Visualisez vos performances en temps réel.",
    target: "PME & Managers",
    price: "Sur devis",
    icon: "📊"
  },
  {
    title: "Audit & Data Cleaning",
    description: "Nettoyage en profondeur de vos bases de données sales. Correction des erreurs de saisie et structuration pour l'analyse.",
    target: "Entreprises",
    price: "Sur devis",
    icon: "🧹"
  },
  {
    title: "Coaching Privé 1-on-1",
    description: "Session intensive de 45 min pour résoudre un blocage technique ou apprendre une fonction spécifique sur Excel/Power BI.",
    target: "Professionnels & Étudiants",
    price: "À partir de 10.000 FCFA",
    icon: "🎯"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-midnight text-white">
      <Navbar />
      
      <header className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-white/[0.05] to-transparent">
        <h1 className="text-5xl font-serif mb-6">Expertise <span className="italic text-accent-primary">Sur Mesure</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Solutions data stratégiques pour optimiser vos processus et accélérer votre prise de décision.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="group border border-white/10 p-10 hover:border-accent-primary transition-all bg-white/[0.01]">
              <div className="text-4xl mb-6">{service.icon}</div>
              <span className="text-[10px] uppercase tracking-widest text-accent-primary font-bold mb-4 block">{service.target}</span>
              <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed font-light">{service.description}</p>
              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400">{service.price}</span>
                <a 
                  href={`https://wa.me/225XXXXXXXX?text=Bonjour Medoune, je suis intéressé par votre service : ${service.title}`}
                  className="text-[10px] uppercase tracking-widest font-bold hover:text-accent-primary transition-colors"
                >
                  Me contacter →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

"use client";
import Navbar from '@/components/Navbar';

const services = [
  {
    title: "Audit & Stratégie de Croissance",
    description: "Analyse de vos indicateurs pour identifier des leviers de revenus. Je transforme vos chiffres en décisions stratégiques.",
    target: "Dirigeants & CEOs",
    price: "Sur devis",
    icon: "📈",
    link: "https://wa.me/2250564094530?text=Bonjour, je souhaite un Audit Stratégique." 
  },
  {
    title: "Nettoyage & Structuration",
    description: "Fichiers inexploitables ? Je normalise et sécurise vos bases de données pour une fiabilité totale.",
    target: "Équipes Opérationnelles",
    price: "À partir de 50.000 FCFA",
    icon: "🧹",
    link: "https://wa.me/2250564094530?text=Bonjour, j'ai besoin d'un nettoyage de données."
  },
  {
    title: "Tableaux de Bord (Dashboards)",
    description: "Création de rapports automatisés sur Power BI ou Excel. Suivez votre performance en un clic.",
    target: "Managers & PME",
    price: "Sur devis",
    icon: "📊",
    link: "https://wa.me/2250564094530?text=Bonjour, je souhaite créer un Dashboard."
  },
  {
    title: "Coaching Privé 1-on-1",
    description: "Session intensive pour débloquer vos fichiers ou monter en compétence. Résolution de problèmes garantie.",
    target: "Pro & Étudiants",
    price: "15.000 FCFA / session",
    icon: "🎯",
    link: "https://calendly.com/medoune-camara" // LIEN VERS CALENDLY
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
  href={service.link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-[10px] uppercase tracking-widest font-bold hover:text-accent-primary transition-colors"
>
  {service.title === "Coaching Privé 1-on-1" ? "Réserver mon créneau →" : "Me contacter →"}
</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

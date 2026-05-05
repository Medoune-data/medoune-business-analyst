"use client";
import Link from 'next/link';
import WordRotatorAbout from '@/components/WordRotatorAbout';

// ─── TÉMOIGNAGES ─────────────────────────────────────────────────────────────
// Remplace par de vrais témoignages dès que tu les as
const TESTIMONIALS = [
  {
    name: "Kouamé Brice A.",
    role: "Contrôleur de Gestion, Abidjan",
    formation: "Excel pour l'Analyse de Données",
    color: "border-emerald-500/30 text-emerald-400",
    text: "Avant la formation, je passais 3h sur mes rapports mensuels. Maintenant c'est automatisé en 20 minutes. La clarté de l'enseignement est remarquable.",
  },
  {
    name: "Fatou D.",
    role: "Étudiante en Finance, Yamoussoukro",
    formation: "Maîtrise de SQL pour le Business",
    color: "border-blue-500/30 text-blue-400",
    text: "J'ai décroché mon stage grâce aux compétences SQL acquises ici. Le projet final sur données réelles m'a directement préparée au monde professionnel.",
  },
  {
    name: "Jean-Marc K.",
    role: "Étudiant en Finance, Yamoussoukro",
    formation: "Pack Complet Elite",
    color: "border-purple-500/30 text-purple-400",
    text: "L'approche est différente des cours classiques. On apprend à penser en stratège de la donnée, pas juste à utiliser des outils. Retour sur investissement immédiat.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-midnight text-white">

      {/* ─── SECTION 1 : HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col lg:flex-row justify-start pt-24 md:pt-28 px-6 lg:px-24 gap-12 border-b border-white/5 relative">
        <div className="flex-1 z-10">
          <div className="flex items-center gap-6 mb-12 animate-fade-in">
            <span className="h-px w-10 bg-accent-primary"></span>
            <p className="text-accent-primary font-mono uppercase tracking-[0.4em] text-[10px] font-bold">
              — Économie • Stratégie • Entrepreneuriat • Finance
            </p>
          </div>

          <h1 className="text-6xl md:text-[8vw] font-serif font-medium leading-[0.9] tracking-tighter mb-12">
            L'Analyste <br />
            <WordRotatorAbout />
          </h1>

          <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed max-w-xl italic border-l border-white/10 pl-8">
            "Je ne me contente pas de lire les chiffres. Je les fais parler pour bâtir des systèmes qui structurent l'économie réelle."
          </p>
        </div>

        <div className="flex-1 w-full max-w-md aspect-[4/5] bg-brand-midnight border border-white/10 relative overflow-hidden group lg:mt-12">
          <img
            src="/medoune.jpg"
            alt="Medoune Camara"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out grayscale contrast-[1.1] scale-100 group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-6 left-6 z-20">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-accent-primary bg-brand-midnight/50 backdrop-blur-sm px-2 py-1">
              // Yamoussoukro, CI
            </span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 : CHIFFRES ────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="text-center md:text-left">
            <span className="text-5xl font-serif italic text-white block mb-2">02</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Écosystèmes SaaS Déployés</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-12">
            <span className="text-5xl font-serif italic text-white block mb-2">100+</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Professionnels & Étudiants Formés</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-12">
            <span className="text-5xl font-serif italic text-white block mb-2">RFM</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Modélisation de Segmentation</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-12">
            <span className="text-5xl font-serif italic text-white block mb-2">YAKRO</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Impact Économique Local</p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 : RÉCIT ───────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-4">
          <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-4">01. Parcours</h2>
          <h3 className="text-4xl font-serif italic leading-tight text-white">
            Naviguer entre <br /> donnée et réalité.
          </h3>
        </div>
        <div className="lg:col-span-8 space-y-12 text-gray-400 text-xl font-light leading-relaxed">
          <p>
            Basé à Yamoussoukro, je ne me contente pas d'analyser des chiffres : je bâtis les infrastructures qui structurent l'économie réelle. Mon approche fusionne la rigueur de l'économie et la puissance technologique pour transformer l'informel en succès mesurables.
          </p>
          <p className="text-white font-medium border-l-2 border-accent-primary pl-8 py-2">
            En tant que fondateur, j'ai conçu <strong>Evalis Corp</strong> pour injecter l'IA au cœur des PME ivoiriennes, et <strong>StudBay</strong> pour professionnaliser l'économie des campus.
          </p>
          <p>
            Ma spécialisation en <strong>Customer & Revenue Strategy</strong> me permet de modéliser le churn, d'optimiser la rentabilité (CLV) et de sécuriser chaque flux financier pour rendre la croissance de mes partenaires indiscutable.
          </p>
        </div>
      </section>

      {/* ─── SECTION TÉMOIGNAGES ─────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-4">
              02. Témoignages
            </h2>
            <h3 className="text-4xl font-serif italic text-white">
              Ce qu'ils disent après la formation.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`border ${t.color.split(' ')[0]} bg-white/[0.02] rounded-2xl p-8 flex flex-col`}>
                {/* Quote */}
                <p className="text-gray-400 text-sm font-light leading-relaxed flex-1 mb-8 italic">
                  "{t.text}"
                </p>
                {/* Formation badge */}
                <div className="mb-6">
                  <span className={`text-[9px] font-mono uppercase tracking-widest font-bold ${t.color.split(' ')[1]}`}>
                    {t.formation}
                  </span>
                </div>
                {/* Auteur */}
                <div className="border-t border-white/5 pt-6">
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs font-light mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA sous les témoignages */}
          <div className="text-center mt-12">
            <Link
              href="/formation"
              className="inline-block text-[10px] font-mono uppercase tracking-widest border border-white/10 px-8 py-3 text-gray-400 hover:text-white hover:border-white/30 transition-all rounded-lg"
            >
              Rejoindre la prochaine session →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 : PRINCIPES ───────────────────────────────────────── */}
      <section className="py-32 bg-white/[0.02] px-6 lg:px-24 border-b border-white/5">
        <div className="max-w-4xl">
          <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-16">03. Mes Principes Directeurs</h2>
          <div className="space-y-20">
            {[
              { title: "Discipline > Motivation", desc: "La constance d'un système bien conçu battra toujours l'intensité d'un instant. Je bâtis pour la résilience." },
              { title: "Donnée > Intuition", desc: "Dans un marché en croissance, l'intuition est un risque. L'analyse empirique est une protection." },
              { title: "Souveraineté des Flux", desc: "Chaque PME doit posséder et comprendre ses données pour rester maître de sa propre croissance." }
            ].map((p, i) => (
              <div key={i} className="group">
                <h4 className="text-3xl font-serif italic mb-4 group-hover:text-accent-primary transition-colors">0{i+1}. {p.title}</h4>
                <p className="text-gray-500 max-w-2xl text-lg font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 : EXPERTISE ───────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-8">04. Expertise</h2>
            <h3 className="text-4xl font-serif mb-8">Un arsenal au service de la <span className="italic text-gray-500 font-light">croissance.</span></h3>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Revenue Strategy", desc: "Segmentation RFM, analyse du taux d'attrition (churn) et optimisation de la rentabilité client (CLV)." },
              { title: "Business Intelligence", desc: "Transformation de données brutes (SQL) en tableaux de bord décisionnels interactifs sur Looker Studio." },
              { title: "Analyse Économique", desc: "Modélisation économétrique et expertise sur l'impact financier du Mobile Money dans les marchés émergents." },
              { title: "Data Analysis (R & SQL)", desc: "Extraction, nettoyage et analyse statistique de jeux de données complexes pour orienter les décisions business." },
            ].map((card, i) => (
              <div key={i} className="p-8 border border-white/10 hover:bg-white/[0.02] transition-all">
                <h4 className="text-white font-bold mb-4 uppercase tracking-tighter text-sm">{card.title}</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6 : ÉCOSYSTÈMES ─────────────────────────────────────── */}
      <section className="py-32 bg-accent-primary/5 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-12">05. Écosystèmes Bâtis</h2>
          <div className="space-y-12">
            <div className="pb-12 border-b border-white/10">
              <h3 className="text-4xl font-serif italic text-white mb-4">EVALIS Corp</h3>
              <p className="text-gray-400 font-light italic leading-relaxed">
                "Digitaliser la gestion des PME via l'IA et une architecture PWA offline-first, adaptée au terrain ivoirien."
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-serif italic text-white mb-4">STUDBAY</h3>
              <p className="text-gray-400 font-light italic leading-relaxed">
                "L'infrastructure numérique qui centralise et sécurise l'économie informelle des campus universitaires."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STACK ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-12 opacity-30">
          {["SQL Analysis", "Revenue Modeling", "POWER BI", "Looker Studio", "RSTUDIO", "Econometrics"].map((tool) => (
            <span key={tool} className="text-2xl md:text-5xl font-serif italic text-white hover:opacity-100 transition-all cursor-default uppercase tracking-tighter">
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* ─── CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-tight">
          Bâtissons une <br />
          <span className="italic font-light text-gray-500 underline decoration-accent-primary underline-offset-8">
            croissance durable.
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <Link
            href="https://calendly.com/medoune-camara/consultation-strategique-data-coaching"
            target="_blank"
            className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-2xl"
          >
            Réserver une Session Stratégique
          </Link>
          <Link
            href="/projets"
            className="px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Voir les analyses
          </Link>
        </div>
        <div className="mt-32 text-[10px] text-gray-600 uppercase tracking-[0.5em]">
          Medoune Camara — Yamoussoukro — 2026
        </div>
      </section>

    </main>
  );
}

"use client";
import Link from 'next/link';
import WordRotatorAbout from '@/components/WordRotatorAbout';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-midnight text-white">
      
      {/* SECTION 1 : HERO - ALIGNÉE SUR L'ACCUEIL */}
      <section className="min-h-screen flex flex-col lg:flex-row justify-start pt-24 md:pt-28 px-6 lg:px-24 gap-12 border-b border-white/5 relative">
        <div className="flex-1 z-10">
          
          {/* L'en-tête de page (Même espacement que l'accueil) */}
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
        
        {/* LA PHOTO (Remontée aussi pour l'équilibre) */}
        <div className="flex-1 w-full max-w-md aspect-[4/5] bg-brand-midnight border border-white/10 relative overflow-hidden group lg:mt-12">
          <img 
            src="/medoune.jpg" 
            alt="Medoune Camara" 
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out 
                       grayscale contrast-[1.1] scale-100
                       group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-6 left-6 z-20">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-accent-primary bg-brand-midnight/50 backdrop-blur-sm px-2 py-1">
              // Yamoussoukro, CI
            </span>
          </div>
        </div>
      </section>

      {/* --- LE RESTE DES SECTIONS RESTE IDENTIQUE --- */}
      {/* SECTION 2 : LES CHIFFRES... */}
      <section className="py-32 px-6 lg:px-24 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="text-center md:text-left">
            <span className="text-5xl font-serif italic text-white block mb-2">02</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Plateformes SaaS Déployées</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-12">
            <span className="text-5xl font-serif italic text-white block mb-2">15+</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">PME en Étude de Flux</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-12">
            <span className="text-5xl font-serif italic text-white block mb-2">RFM</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Modélisation de Segmentation</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-12">
            <span className="text-5xl font-serif italic text-white block mb-2">100%</span>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Focus Croissance & Revenu</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 : LE RÉCIT - VERSION NETTE ET LISIBLE */}
<section className="py-32 px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
  
  {/* ON ENLÈVE 'sticky' ET 'top-32' ICI */}
  <div className="lg:col-span-4">
    <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-4">01. Parcours</h2>
    <h3 className="text-4xl font-serif italic leading-tight text-white">
      Naviguer entre <br/> donnée et réalité.
    </h3>
  </div>

  <div className="lg:col-span-8 space-y-12 text-gray-400 text-xl font-light leading-relaxed">
    <p>
      Tout commence à Yamoussoukro. J'ai vu des bâtisseurs, des commerçants et des entrepreneurs avec un potentiel immense, mais souvent freinés par l'opacité de leurs propres flux financiers.
    </p>
    <p className="text-white font-medium border-l-2 border-accent-primary pl-8 py-2">
      Ma conviction est simple : la technologie n'a de valeur que si elle structure et amplifie l'économie réelle.
    </p>
    <p>
      En tant que Business Analyst, j'ai choisi de me spécialiser dans la <strong>Customer & Revenue Strategy</strong>. Mon travail ne s'arrête pas à la création d'une application ; il consiste à modéliser le churn, à optimiser la CLV (Customer Lifetime Value) et à sécuriser chaque point de contact financier.
    </p>
  </div>
</section>

      {/* SECTION 4 : LES PRINCIPES (L'AUTORITÉ MORALE) */}
      <section className="py-32 bg-white/[0.02] px-6 lg:px-24 border-y border-white/5">
        <div className="max-w-4xl">
          <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-16">02. Mes Principes Directeurs</h2>
          <div className="space-y-20">
            {[
              { title: "Discipline > Motivation", desc: "La constance d'un système bien conçu battra toujours l'intensité d'un instant. Je bâtis pour la résilience." },
              { title: "Donnée > Intuition", desc: "Dans un marché en croissance, l'intuition est un risque. L'analyse empirique est une protection." },
              { title: "Souveraineté des Flux", desc: "Chaque PME doit posséder et comprendre ses données pour rester maître de sa propre croissance." }
            ].map((principle, i) => (
              <div key={i} className="group">
                <h4 className="text-3xl font-serif italic mb-4 group-hover:text-accent-primary transition-colors">0{i+1}. {principle.title}</h4>
                <p className="text-gray-500 max-w-2xl text-lg font-light leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 : EXPERTISE TECHNIQUE DÉTAILLÉE (CŒUR MÉTIER) */}
      <section className="py-32 px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-8">03. Expertise</h2>
            <h3 className="text-4xl font-serif mb-8">Un arsenal au service de la <span className="italic text-gray-500 font-light">performance.</span></h3>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/10 hover:bg-white/[0.02] transition-all">
              <h4 className="text-white font-bold mb-4 uppercase tracking-tighter text-sm">Revenue Strategy</h4>
              <p className="text-gray-500 text-sm font-light">Segmentation RFM, analyse du taux d'attrition et optimisation de la rentabilité client sur le long terme.</p>
            </div>
            <div className="p-8 border border-white/10 hover:bg-white/[0.02] transition-all">
              <h4 className="text-white font-bold mb-4 uppercase tracking-tighter text-sm">Architecture Cloud</h4>
              <p className="text-gray-500 text-sm font-light">Déploiement de solutions robustes sur Firebase pour la gestion de stocks et de CRM en temps réel.</p>
            </div>
            <div className="p-8 border border-white/10 hover:bg-white/[0.02] transition-all">
              <h4 className="text-white font-bold mb-4 uppercase tracking-tighter text-sm">Analyse Économétrique</h4>
              <p className="text-gray-500 text-sm font-light">Modélisation de l'adoption du Mobile Money par les PME (Impact sur l'inclusion financière).</p>
            </div>
            <div className="p-8 border border-white/10 hover:bg-white/[0.02] transition-all">
              <h4 className="text-white font-bold mb-4 uppercase tracking-tighter text-sm">Systèmes SaaS</h4>
              <p className="text-gray-500 text-sm font-light">Conception de Progressive Web Apps (PWA) optimisées pour les environnements à faible connectivité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 : FOCUS ACTUEL (MOUVEMENT) */}
      <section className="py-32 bg-accent-primary/5 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-12">04. En Construction</h2>
          <div className="space-y-12">
            <div className="pb-12 border-b border-white/10">
              <h3 className="text-3xl font-serif italic text-white mb-4">EVALIS Corp</h3>
              <p className="text-gray-400 font-light italic">"Accompagner les commerçants ivoiriens vers une gestion financière transparente et automatisée."</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif italic text-white mb-4">Recherche Mobile Money</h3>
              <p className="text-gray-400 font-light italic">"Quantifier l'impact réel de la digitalisation des paiements sur la pérennité des petites entreprises locales."</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 : STACK TECHNIQUE (L'OUTILLAGE) */}
      <section className="py-32 px-6 lg:px-24 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-12 opacity-30">
          {["SQL Analysis", "Revenue Modeling","POWER BI", "Looker Studio", "RSTUDIO", "Econometrics"].map((tool) => (
            <span key={tool} className="text-2xl md:text-5xl font-serif italic text-white hover:opacity-100 transition-all cursor-default uppercase tracking-tighter">
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 8 : L'ENGAGEMENT FINAL */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-tight">
          Bâtissons une <br /> <span className="italic font-light text-gray-500 underline decoration-accent-primary underline-offset-8">croissance durable.</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <Link 
            href="mailto:medoune.c.k.camara.pro@gmail.com"
            className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-2xl"
          >
            Discuter Stratégie
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

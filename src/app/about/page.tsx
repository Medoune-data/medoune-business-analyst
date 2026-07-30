import Link from 'next/link';
import WordRotatorAbout from '@/components/WordRotatorAbout';
import BrandSeal from '@/components/BrandSeal';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">

      {/* ─── SECTION 1 : HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col lg:flex-row justify-start pt-24 md:pt-28 px-6 lg:px-24 gap-12 border-b border-line relative">
        <div className="flex-1 z-10">
          <div className="flex items-center gap-6 mb-12 animate-fade-in">
            <span className="h-px w-10 bg-gold"></span>
            <p className="text-gold font-mono uppercase tracking-[0.4em] text-[10px] font-bold">
              — Économiste · Stratégie de Croissance PME · Data
            </p>
          </div>

          <h1 className="text-6xl md:text-[8vw] font-serif font-medium leading-[0.9] tracking-tighter mb-12 text-ink">
            L'Analyste <br />
            <WordRotatorAbout />
          </h1>

          <p className="text-xl md:text-2xl font-light text-ink-soft leading-relaxed max-w-xl italic border-l border-line pl-8 mb-6">
            "Je ne me contente pas de lire les chiffres. Je les fais parler pour bâtir des systèmes qui structurent l'économie réelle."
          </p>

          <p className="text-sm uppercase tracking-[0.25em] font-mono font-bold text-gold pl-8">
            Expert en croissance d'entreprise pour PME — par la donnée
          </p>
        </div>

        <div className="flex-1 w-full max-w-md aspect-[4/5] bg-paper-deep border border-line relative overflow-hidden group lg:mt-12">
          <img
            src="/medoune.jpg"
            alt="Medoune Camara"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out grayscale-[0.3] contrast-[1.05] scale-100 group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 z-20">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-gold bg-paper/80 backdrop-blur-sm px-2 py-1">
              // Yamoussoukro, CI
            </span>
          </div>
          <div className="absolute top-6 right-6 z-20 text-gold/80">
            <BrandSeal className="w-16 h-16" />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 : CHIFFRES ────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 border-b border-line">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="text-center md:text-left">
            <span className="text-5xl font-serif italic text-ink block mb-2">02</span>
            <p className="text-[10px] uppercase tracking-widest text-ink-soft font-bold">Écosystèmes SaaS Conçus</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-line md:pl-12">
            <span className="text-5xl font-serif italic text-ink block mb-2">100+</span>
            <p className="text-[10px] uppercase tracking-widest text-ink-soft font-bold">Professionnels & Étudiants Formés</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-line md:pl-12">
            <span className="text-5xl font-serif italic text-ink block mb-2">RFM</span>
            <p className="text-[10px] uppercase tracking-widest text-ink-soft font-bold">Modélisation de Segmentation</p>
          </div>
          <div className="text-center md:text-left border-l-0 md:border-l border-line md:pl-12">
            <span className="text-5xl font-serif italic text-ink block mb-2">YAKRO</span>
            <p className="text-[10px] uppercase tracking-widest text-ink-soft font-bold">Impact Économique Local</p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 : RÉCIT ───────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-4">
          <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] mb-4">01. Parcours</h2>
          <h3 className="text-4xl font-serif italic leading-tight text-ink">
            Naviguer entre <br /> donnée et réalité.
          </h3>
        </div>
        <div className="lg:col-span-8 space-y-12 text-ink-soft text-xl font-light leading-relaxed">
          <p>
            Basé à Yamoussoukro, j'accompagne les PME et entrepreneurs ivoiriens dans leur croissance en transformant leurs données en décisions concrètes. Mon approche fusionne la rigueur de l'économie et la puissance technologique pour transformer l'informel en succès mesurables.
          </p>
          <p className="text-ink font-medium border-l-2 border-gold pl-8 py-2">
            En tant que fondateur, j'ai conçu <strong>Evalis Corp</strong> pour injecter l'IA au cœur des PME ivoiriennes, et <strong>ADN (African Data Network)</strong> pour former la prochaine génération d'analystes africains.
          </p>
          <p>
            Ma spécialisation en <strong>Customer & Revenue Strategy</strong> me permet de modéliser le churn, d'optimiser la rentabilité (CLV) et de sécuriser chaque flux financier pour rendre la croissance de mes partenaires indiscutable.
          </p>
        </div>
      </section>

      {/* ─── SECTION 4 : PRINCIPES ───────────────────────────────────────── */}
      <section className="py-32 bg-paper-deep px-6 lg:px-24 border-b border-line">
        <div className="max-w-4xl">
          <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] mb-16">02. Mes Principes Directeurs</h2>
          <div className="space-y-20">
            {[
              { title: "Discipline > Motivation", desc: "La constance d'un système bien conçu battra toujours l'intensité d'un instant. Je bâtis pour la résilience." },
              { title: "Donnée > Intuition", desc: "Dans un marché en croissance, l'intuition est un risque. L'analyse empirique est une protection." },
              { title: "Souveraineté des Flux", desc: "Chaque PME doit posséder et comprendre ses données pour rester maître de sa propre croissance." }
            ].map((p, i) => (
              <div key={i} className="group">
                <h4 className="text-3xl font-serif italic mb-4 text-ink group-hover:text-gold transition-colors">0{i + 1}. {p.title}</h4>
                <p className="text-ink-soft max-w-2xl text-lg font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 : EXPERTISE ───────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] mb-8">03. Expertise</h2>
            <h3 className="text-4xl font-serif mb-8 text-ink">Un arsenal au service de la <span className="italic text-ink-soft font-light">croissance.</span></h3>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Revenue Strategy", desc: "Segmentation RFM, analyse du taux d'attrition (churn) et optimisation de la rentabilité client (CLV)." },
              { title: "Business Intelligence", desc: "Transformation de données brutes (SQL) en tableaux de bord décisionnels interactifs sur Looker Studio." },
              { title: "Analyse Économique", desc: "Modélisation économétrique et expertise sur l'impact financier du Mobile Money dans les marchés émergents." },
              { title: "Data Analysis (R & SQL)", desc: "Extraction, nettoyage et analyse statistique de jeux de données complexes pour orienter les décisions business." },
            ].map((card, i) => (
              <div key={i} className="p-8 border border-line hover:bg-paper-deep transition-all">
                <h4 className="text-ink font-bold mb-4 uppercase tracking-tighter text-sm">{card.title}</h4>
                <p className="text-ink-soft text-sm font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6 : ÉCOSYSTÈMES ─────────────────────────────────────── */}
      <section className="py-32 bg-forest/5 px-6 lg:px-24 border-y border-line">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] mb-12">04. Écosystèmes Bâtis</h2>
          <div className="space-y-12">
            <div className="pb-12 border-b border-line">
              <a href="https://evalis-corp.web.app/" target="_blank" rel="noopener noreferrer" className="group">
                <h3 className="text-4xl font-serif italic text-ink mb-4 group-hover:text-gold transition-colors">EVALIS Corp ↗</h3>
              </a>
              <p className="text-ink-soft font-light italic leading-relaxed">
                "Digitaliser la gestion des PME via l'IA et une architecture PWA offline-first, adaptée au terrain ivoirien."
              </p>
            </div>
            <div>
              <a href="https://adn-community.vercel.app/" target="_blank" rel="noopener noreferrer" className="group">
                <h3 className="text-4xl font-serif italic text-ink mb-4 group-hover:text-gold transition-colors">ADN ↗</h3>
              </a>
              <p className="text-ink-soft font-light italic leading-relaxed">
                "African Data Network — une communauté et une académie pour former la prochaine génération d'analystes data en Afrique."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STACK ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24">
        <div className="flex flex-wrap justify-center gap-12 opacity-40">
          {["SQL Analysis", "Revenue Modeling", "POWER BI", "Looker Studio", "RSTUDIO", "Econometrics"].map((tool) => (
            <span key={tool} className="text-2xl md:text-5xl font-serif italic text-ink hover:opacity-100 hover:text-gold transition-all cursor-default uppercase tracking-tighter">
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* ─── CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 border-t border-line">
        <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-tight text-ink">
          Bâtissons une <br />
          <span className="italic font-light text-ink-soft underline decoration-gold underline-offset-8">
            croissance durable.
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <Link
            href="https://calendly.com/medoune-camara/consultation-strategique-data-coaching"
            target="_blank"
            className="px-12 py-5 bg-ink text-paper font-bold uppercase tracking-widest hover:bg-gold transition-all shadow-xl"
          >
            Réserver une Session Stratégique
          </Link>
          <Link
            href="/blog"
            className="px-12 py-5 border border-ink/15 text-ink font-bold uppercase tracking-widest hover:bg-ink hover:text-paper transition-all"
          >
            Voir mes analyses
          </Link>
        </div>
        <div className="mt-32 text-[10px] text-ink-soft uppercase tracking-[0.5em]">
          Medoune Camara — Yamoussoukro — 2026
        </div>
      </section>

    </main>
  );
}

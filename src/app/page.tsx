import Link from 'next/link';
import WordRotator from '@/components/WordRotator';

// ─── STATS RAPIDES ────────────────────────────────────────────────────────────
const STATS = [
  { value: "100+", label: "Professionnels formés" },
  { value: "02",   label: "Écosystèmes SaaS déployés" },
  { value: "3",    label: "Formations certifiantes" },
  { value: "CI",   label: "Yamoussoukro, Côte d'Ivoire" },
];

// ─── SERVICES RAPIDES ─────────────────────────────────────────────────────────
const PILLARS = [
  { num: "01.", title: "Revenue Strategy",   desc: "Segmentation RFM, analyse du Churn et optimisation de la Customer Lifetime Value (CLV)." },
  { num: "02.", title: "SaaS & Fintech",     desc: "Conception d'écosystèmes robustes (Firebase/Next.js) pour automatiser la gestion commerciale." },
  { num: "03.", title: "Data Intelligence",  desc: "Tableaux de bord Looker Studio pour un pilotage en temps réel de votre activité économique." },
  { num: "04.", title: "Inclusion Mobile",   desc: "Expertise sur l'adoption du Mobile Money et l'impact de la digitalisation sur les PME." },
];

// ─── PREUVES SOCIALES ─────────────────────────────────────────────────────────
const PROOF = [
  {
    quote: "Avant la formation, je passais 3h sur mes rapports. Maintenant c'est automatisé en 20 minutes.",
    name: "Kouamé Brice A.",
    role: "Contrôleur de Gestion, Abidjan",
    color: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  {
    quote: "J'ai décroché mon stage grâce aux compétences SQL acquises ici. Le projet final m'a directement préparé au monde professionnel.",
    name: "Fatou D.",
    role: "Étudiante en Finance, Yamoussoukro",
    color: "border-blue-500/30",
    dot: "bg-blue-400",
  },
  {
    quote: "On apprend à penser en stratège de la donnée, pas juste à utiliser des outils. Retour sur investissement immédiat.",
    name: "Jean-Marc K.",
    role: "Étudiant en Finance, Yamoussoukro",
    color: "border-purple-500/30",
    dot: "bg-purple-400",
  },
];

export default function Home() {
  return (
    <main className="bg-brand-midnight text-white overflow-x-hidden">

      {/* ─── SECTION 1 : HERO ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-start pt-24 md:pt-28 px-6 lg:px-24 relative border-b border-white/5">
        <div className="z-10 max-w-5xl">

          <div className="flex items-center gap-6 mb-12 animate-fade-in">
            <span className="h-px w-10 bg-accent-primary"></span>
            <p className="font-mono uppercase tracking-[0.4em] text-[11px] font-bold">
              <span className="text-accent-primary">Medoune Camara</span>
              <span className="text-gray-600 mx-3">—</span>
              <span className="text-gray-400">Economist & Business Analyst</span>
            </p>
          </div>

          <div className="mb-12">
            <h1 className="text-5xl md:text-[7vw] font-serif font-medium tracking-tight leading-[1.1] mb-16 md:mb-8 text-white">
              L'expertise pour <br />
              <WordRotator />
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed font-light max-w-3xl mt-10 md:mt-0">
              J'accompagne les entreprises dans la maîtrise de leur{' '}
              <span className="text-white border-b border-accent-primary/30">stratégie de revenus</span>{' '}
              et le déploiement de solutions technologiques à fort impact.
            </p>
          </div>

          {/* CTAs — Formation en premier, pas Projets */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/formation"
              className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-accent-primary hover:text-white transition-all shadow-2xl"
            >
              Rejoindre une formation →
            </Link>
            <Link
              href="/services"
              className="px-10 py-5 border border-white/10 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:border-white/40 transition-all"
            >
              Voir les services
            </Link>
            <div className="hidden md:block animate-bounce text-gray-600 ml-4">
              <span className="text-[10px] uppercase tracking-widest font-mono">Scroll ↓</span>
            </div>
          </div>

          {/* Micro-stats sous le hero */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            {STATS.map((s, i) => (
              <div key={i}>
                <span className="text-2xl font-serif italic text-white block mb-1">{s.value}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute right-[-5%] bottom-20 rotate-[-90deg] opacity-[0.02] select-none pointer-events-none hidden lg:block">
          <h2 className="text-[15vw] font-serif font-bold whitespace-nowrap uppercase tracking-tighter">
            Medoune Camara
          </h2>
        </div>
      </section>

      {/* ─── SECTION 2 : PILIERS ──────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-8">// Services Stratégiques</h2>
              <h3 className="text-4xl font-serif italic mb-6 leading-tight">Transformer la donnée en levier de croissance.</h3>
              <p className="text-gray-500 font-light mb-8">
                Basé à Yamoussoukro, j'interviens sur les structures de revenus complexes pour sécuriser et optimiser chaque flux.
              </p>
              <Link
                href="/services"
                className="text-[10px] uppercase tracking-widest font-bold text-accent-primary border-b border-accent-primary/30 pb-1 hover:border-accent-primary transition-all"
              >
                Tous les services →
              </Link>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {PILLARS.map((p, i) => (
                <div key={i} className="bg-brand-midnight p-10 hover:bg-white/[0.02] transition-colors">
                  <span className="text-accent-primary font-mono text-xl mb-6 block">{p.num}</span>
                  <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">{p.title}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 : FORMATION CTA ────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Gauche : texte */}
          <div>
            <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-6">// L'Arsenal du Data Analyst</h2>
            <h3 className="text-4xl md:text-5xl font-serif italic leading-tight text-white mb-8">
              Excel. SQL. R.<br />
              <span className="text-gray-500 font-light">Trois formations certifiantes.</span>
            </h3>
            <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-lg">
              Du nettoyage de données sur Excel à la modélisation économétrique sur R.
              Un cursus conçu pour la performance réelle, sans limite géographique.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: "Excel Pro", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
                { label: "SQL Master", color: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
                { label: "R Strategy", color: "border-purple-500/40 text-purple-400 bg-purple-500/10" },
              ].map((badge) => (
                <span key={badge.label} className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border ${badge.color}`}>
                  {badge.label}
                </span>
              ))}
            </div>

            <Link
              href="/formation"
              className="inline-block px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-accent-primary hover:text-white transition-all shadow-xl"
            >
              Voir le programme complet →
            </Link>
          </div>

          {/* Droite : stats formation */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { val: "37h", sub: "de contenu total", border: "border-emerald-500/20" },
              { val: "100+", sub: "apprenants formés", border: "border-blue-500/20" },
              { val: "3", sub: "certifications délivrées", border: "border-purple-500/20" },
              { val: "100%", sub: "sur projets réels", border: "border-accent-primary/20" },
            ].map((s, i) => (
              <div key={i} className={`border ${s.border} bg-white/[0.02] rounded-2xl p-8 text-center`}>
                <span className="text-4xl font-serif italic text-white block mb-2">{s.val}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 : TÉMOIGNAGES ──────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-4">// Témoignages</h2>
              <h3 className="text-4xl font-serif italic text-white">Ce qu'ils disent.</h3>
            </div>
            <Link
              href="/about"
              className="text-[10px] uppercase tracking-widest font-bold text-gray-500 border-b border-white/10 pb-1 hover:text-white hover:border-white/40 transition-all"
            >
              En savoir plus sur moi →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROOF.map((t, i) => (
              <div key={i} className={`border ${t.color} bg-white/[0.02] rounded-2xl p-8 flex flex-col`}>
                <div className="flex items-center gap-2 mb-6">
                  <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-600">Témoignage vérifié</span>
                </div>
                <p className="text-gray-300 text-sm font-light leading-relaxed italic flex-1 mb-8">
                  "{t.quote}"
                </p>
                <div className="border-t border-white/5 pt-6">
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs font-light mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 : CTA FINAL ────────────────────────────────────────── */}
      <section className="py-40 px-6 lg:px-24 border-t border-white/5 text-center bg-white/[0.02]">
        <h2 className="text-5xl md:text-7xl font-serif mb-6">
          Prêt à passer à <br />
          <span className="italic font-light text-gray-500">l'échelle supérieure ?</span>
        </h2>
        <p className="text-gray-500 font-light mb-12 max-w-xl mx-auto text-sm leading-relaxed">
          Formation, conseil stratégique ou audit de données — choisissez le niveau d'accompagnement qui vous correspond.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            href="/formation"
            className="px-12 py-5 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-primary hover:text-white transition-all shadow-2xl"
          >
            Rejoindre une formation
          </Link>
          <Link
            href="https://calendly.com/medoune-camara"
            target="_blank"
            className="px-12 py-5 border border-white/10 text-white text-xs uppercase tracking-[0.2em] font-bold hover:border-white/40 transition-all"
          >
            Démarrer une consultation
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 lg:px-24 border-t border-white/5 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em]">
          © 2026 Medoune Camara — Yamoussoukro — Côte d'Ivoire
        </p>
      </footer>

    </main>
  );
}

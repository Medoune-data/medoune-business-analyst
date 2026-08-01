import Link from 'next/link';
import WordRotator from '@/components/WordRotator';
import BrandSeal from '@/components/BrandSeal';

// ─── CHIFFRES CLÉS ─────────────────────────────────────────────────────────
const STATS = [
  { value: "02",  label: "Écosystèmes SaaS conçus" },
  { value: "100+", label: "Professionnels accompagnés" },
  { value: "RFM", label: "Modélisation & segmentation" },
  { value: "CI",  label: "Yamoussoukro, Côte d'Ivoire" },
];

// ─── DOMAINES D'EXPERTISE ──────────────────────────────────────────────────
const PILLARS = [
  { num: "01.", title: "Revenue Strategy",  desc: "Segmentation RFM, analyse du Churn et optimisation de la Customer Lifetime Value (CLV)." },
  { num: "02.", title: "SaaS & Fintech",    desc: "Conception d'écosystèmes robustes (Firebase/Next.js) pour automatiser la gestion commerciale." },
  { num: "03.", title: "Data Intelligence", desc: "Tableaux de bord Looker Studio pour un pilotage en temps réel de l'activité économique." },
  { num: "04.", title: "Inclusion Mobile",  desc: "Expertise sur l'adoption du Mobile Money et l'impact de la digitalisation sur les PME." },
];

export default function Home() {
  return (
    <main className="bg-paper text-ink overflow-x-hidden">

      {/* ─── SECTION 1 : HERO ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-start pt-24 md:pt-28 px-6 lg:px-24 relative border-b border-line">
        <div className="z-10 max-w-5xl">

          <div className="flex items-center gap-6 mb-12 animate-fade-in">
            <span className="h-px w-10 bg-gold"></span>
            <p className="font-mono uppercase tracking-[0.4em] text-[11px] font-bold">
              <span className="text-gold">Medoune Camara</span>
              <span className="text-ink-soft mx-3">—</span>
              <span className="text-ink-soft">Economist & Revenue Growth Strategist</span>
            </p>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-[7vw] font-serif font-medium tracking-tight leading-[1.15] mb-6 md:mb-8 text-ink">
              L'expertise pour <br />
              <WordRotator />
            </h1>
            <p className="text-ink-soft text-lg md:text-2xl leading-relaxed font-light max-w-3xl">
              J'aide les PME et entrepreneurs à transformer leurs données en{' '}
              <span className="text-ink border-b border-gold/40">croissance mesurable</span> —
              segmentation client, stratégie de revenus, écosystèmes numériques. Mes{' '}
              <span className="text-ink border-b border-gold/40">analyses</span> et{' '}
              <span className="text-ink border-b border-gold/40">recherches</span>, publiées ici, montrent comment j'y arrive.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="https://calendly.com/medoune-camara"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-ink text-paper text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all shadow-xl"
            >
              Discuter de votre croissance →
            </Link>
            <Link
              href="/blog"
              className="px-10 py-5 border border-ink/15 text-ink text-[10px] uppercase tracking-[0.2em] font-bold hover:border-gold hover:text-gold transition-all"
            >
              Voir mes analyses
            </Link>
            <div className="hidden md:block text-ink-soft/60 ml-4">
              <span className="text-[10px] uppercase tracking-widest font-mono">Scroll ↓</span>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-line pt-12">
            {STATS.map((s, i) => (
              <div key={i}>
                <span className="text-2xl font-serif italic text-ink block mb-1">{s.value}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-ink-soft">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sceau signature */}
        <div className="absolute right-6 lg:right-24 top-28 text-gold/70 hidden lg:block">
          <BrandSeal className="w-24 h-24" />
        </div>

        {/* Watermark */}
        <div className="absolute right-[-5%] bottom-20 rotate-[-90deg] opacity-[0.03] select-none pointer-events-none hidden lg:block">
          <h2 className="text-[15vw] font-serif font-bold whitespace-nowrap uppercase tracking-tighter text-ink">
            Medoune Camara
          </h2>
        </div>
      </section>

      {/* ─── SECTION 2 : PILIERS D'EXPERTISE ─────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 bg-paper-deep">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] mb-8">// Domaines d'expertise</h2>
              <h3 className="text-4xl font-serif italic mb-6 leading-tight">Transformer la donnée en levier de croissance.</h3>
              <p className="text-ink-soft font-light mb-8">
                Basé à Yamoussoukro, j'interviens sur les structures de revenus complexes pour sécuriser et optimiser chaque flux.
              </p>
              <Link
                href="/about"
                className="text-[10px] uppercase tracking-widest font-bold text-gold border-b border-gold/30 pb-1 hover:border-gold transition-all"
              >
                En savoir plus sur moi →
              </Link>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
              {PILLARS.map((p, i) => (
                <div key={i} className="bg-paper p-10 hover:bg-paper-deep transition-colors">
                  <span className="text-gold font-mono text-xl mb-6 block">{p.num}</span>
                  <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter text-ink">{p.title}</h4>
                  <p className="text-sm text-ink-soft font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 : ÉCOSYSTÈMES BÂTIS ────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-24 border-y border-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] mb-6">// Écosystèmes bâtis</h2>
            <h3 className="text-4xl md:text-5xl font-serif italic leading-tight text-ink mb-8">
              Des idées, <br />
              <span className="text-ink-soft font-light">devenues des systèmes.</span>
            </h3>
            <p className="text-ink-soft font-light leading-relaxed mb-10 max-w-lg">
              Je conçois des infrastructures numériques pensées pour le terrain ivoirien —
              de la gestion des PME à l'économie des campus universitaires.
            </p>
            <Link
              href="/projets"
              className="inline-block px-10 py-5 bg-ink text-paper text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all shadow-lg"
            >
              Voir tous les projets →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <a
              href="https://evalis-corp.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-line bg-paper-deep p-8 hover:border-gold transition-colors group"
            >
              <h4 className="text-2xl font-serif italic text-ink mb-3 group-hover:text-gold transition-colors">EVALIS Corp ↗</h4>
              <p className="text-ink-soft font-light leading-relaxed text-sm">
                Digitaliser la gestion des PME via l'IA et une architecture pensée pour le terrain ivoirien.
              </p>
            </a>
            <a
              href="https://adn-community.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-line bg-paper-deep p-8 hover:border-gold transition-colors group"
            >
              <h4 className="text-2xl font-serif italic text-ink mb-3 group-hover:text-gold transition-colors">ADN ↗</h4>
              <p className="text-ink-soft font-light leading-relaxed text-sm">
                African Data Network — communauté et académie data qui forment la prochaine génération d'analystes africains.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 : CTA FINAL ────────────────────────────────────────── */}
      <section className="py-40 px-6 lg:px-24 border-t border-line text-center bg-paper-deep">
        <h2 className="text-5xl md:text-7xl font-serif mb-6 text-ink">
          Envie d'échanger <br />
          <span className="italic font-light text-ink-soft">sur un projet de données ?</span>
        </h2>
        <p className="text-ink-soft font-light mb-12 max-w-xl mx-auto text-sm leading-relaxed">
          Analyses, conseil stratégique ou audit de données — parlons de ce qui vous ferait avancer.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            href="/blog"
            className="px-12 py-5 bg-ink text-paper text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all shadow-xl"
          >
            Lire mes analyses
          </Link>
          <Link
            href="https://calendly.com/medoune-camara"
            target="_blank"
            className="px-12 py-5 border border-ink/15 text-ink text-xs uppercase tracking-[0.2em] font-bold hover:border-gold hover:text-gold transition-all"
          >
            Démarrer une consultation
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 lg:px-24 border-t border-line text-center">
        <p className="text-[10px] text-ink-soft uppercase tracking-[0.5em]">
          © 2026 Medoune Camara — Yamoussoukro — Côte d'Ivoire
        </p>
      </footer>

    </main>
  );
}

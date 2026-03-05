import Link from 'next/link';
import WordRotator from '@/components/WordRotator';

export default function Home() {
  return (
    <main className="bg-brand-midnight text-white overflow-x-hidden">
      
      {/* SECTION 1 : HERO */}
      <section className="min-h-screen flex flex-col justify-start pt-24 md:pt-28 px-6 lg:px-24 relative border-b border-white/5">
        <div className="z-10 max-w-5xl">
          
          {/* --- POSITION REMONTÉE & BLEU AJUSTÉ --- */}
          <div className="flex items-center gap-6 mb-12 animate-fade-in">
            <span className="h-px w-10 bg-accent-primary"></span> 
            <p className="font-mono uppercase tracking-[0.4em] text-[11px] font-bold">
              <span className="text-accent-primary">Medoune Camara</span> 
              <span className="text-gray-600 mx-3">—</span> 
              <span className="text-gray-400">Economist & Business Analyst </span>
            </p>
          </div>
          
          <div className="mb-12">
            {/* Correction : mb-16 sur mobile pour laisser respirer le WordRotator */}
            <h1 className="text-5xl md:text-[7vw] font-serif font-medium tracking-tight leading-[1.1] mb-16 md:mb-8 text-white">
              L'expertise pour <br />
              <WordRotator />
            </h1>
            
            {/* Correction : mt-10 sur mobile pour éloigner le texte du titre */}
            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed font-light max-w-3xl mt-10 md:mt-0">
              J'accompagne les entreprises dans la maîtrise de leur <span className="text-white border-b border-accent-primary/30">stratégie de revenus</span> et le déploiement de solutions technologiques à fort impact.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 items-center">
            <Link 
              href="/projets" 
              className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-accent-primary hover:text-white transition-all shadow-2xl"
            >
              Explorer les solutions
            </Link>
            <div className="hidden md:block animate-bounce text-gray-600">
                <span className="text-[10px] uppercase tracking-widest font-mono">Scroll pour en voir plus ↓</span>
            </div>
          </div>
        </div>

        {/* Signature en arrière-plan */}
        <div className="absolute right-[-5%] bottom-20 rotate-[-90deg] opacity-[0.02] select-none pointer-events-none hidden lg:block">
          <h2 className="text-[15vw] font-serif font-bold whitespace-nowrap uppercase tracking-tighter">
            Medoune Camara
          </h2>
        </div>
      </section>

      {/* SECTION 2 : LES PILIERS */}
      <section className="py-32 px-6 lg:px-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-8">// Services Stratégiques</h2>
              <h3 className="text-4xl font-serif italic mb-6 leading-tight">Transformer la donnée en levier de croissance.</h3>
              <p className="text-gray-500 font-light">Basé à Yamoussoukro, j'interviens sur les structures de revenus complexes pour sécuriser et optimiser chaque flux.</p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
              <div className="bg-brand-midnight p-10 hover:bg-white/[0.02] transition-colors">
                <span className="text-accent-primary font-mono text-xl mb-6 block">01.</span>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">Revenue Strategy</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Segmentation RFM, analyse du Churn et optimisation de la Customer Lifetime Value (CLV).</p>
              </div>
              <div className="bg-brand-midnight p-10 hover:bg-white/[0.02] transition-colors">
                <span className="text-accent-primary font-mono text-xl mb-6 block">02.</span>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">SaaS & Fintech</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Conception d'écosystèmes robustes (Firebase/Next.js) pour automatiser la gestion commerciale.</p>
              </div>
              <div className="bg-brand-midnight p-10 hover:bg-white/[0.02] transition-colors">
                <span className="text-accent-primary font-mono text-xl mb-6 block">03.</span>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">Data Intelligence</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Tableaux de bord Looker Studio pour un pilotage en temps réel de votre activité économique.</p>
              </div>
              <div className="bg-brand-midnight p-10 hover:bg-white/[0.02] transition-colors">
                <span className="text-accent-primary font-mono text-xl mb-6 block">04.</span>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tighter">Inclusion Mobile</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Expertise sur l'adoption du Mobile Money et l'impact de la digitalisation sur les PME.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : CALL TO ACTION */}
      <section className="py-40 px-6 lg:px-24 border-t border-white/5 text-center bg-white/[0.02]">
        <h2 className="text-5xl md:text-7xl font-serif mb-12">Prêt à passer à <br /> <span className="italic font-light text-gray-500">l'échelle supérieure ?</span></h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
            <Link href="/about" className="text-xs uppercase tracking-[0.3em] font-bold border-b-2 border-accent-primary pb-2 hover:text-accent-primary transition-all">
                En savoir plus sur moi
            </Link>
            <Link href="mailto:medoune.c.k.camara.pro@gmail.com" className="text-xs uppercase tracking-[0.3em] font-bold border-b-2 border-white/10 pb-2 hover:border-white transition-all">
                Démarrer une consultation
            </Link>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="py-12 px-6 lg:px-24 border-t border-white/5 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em]">
          © 2026 Medoune Camara — Yamoussoukro — Côte d'Ivoire
        </p>
      </footer>

    </main>
  );
}

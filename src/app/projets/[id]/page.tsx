"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, "projects", id as string);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProject(docSnap.data());
      } else {
        router.push('/projets');
      }
      setLoading(false);
    };
    fetchProject();
  }, [id, router]);

  if (loading) return <div className="min-h-screen bg-brand-midnight flex items-center justify-center text-white font-mono uppercase text-xs tracking-widest animate-pulse">Analyse du dossier en cours...</div>;

  return (
    <main className="min-h-screen bg-brand-midnight pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/projets" className="text-accent-primary text-[10px] uppercase tracking-[0.2em] mb-12 inline-block hover:translate-x-[-4px] transition-transform">
          ← Retour au portfolio
        </Link>

        {/* --- ÉTAPE B : PHOTO DE COUVERTURE --- */}
        {project.coverUrl && (
          <div className="w-full h-[40vh] md:h-[60vh] mb-12 overflow-hidden border border-white/10 bg-white/5 relative group">
            <img 
              src={project.coverUrl} 
              alt={project.title}
              className="w-full h-full object-cover grayscale contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-transparent to-transparent opacity-60"></div>
          </div>
        )}

        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] uppercase tracking-widest text-accent-primary border border-accent-primary/30 px-3 py-1 font-bold">
              {project.category}
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest italic font-mono">
              Status: {project.status}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">{project.title}</h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed italic max-w-2xl">
            "{project.description}"
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            <h2 className="text-white font-serif text-2xl italic border-l-2 border-accent-primary pl-6 font-medium">
              Approche Stratégique & Analyse
            </h2>
            
            <div className="prose prose-invert max-w-none text-gray-400 font-light leading-relaxed">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
  // 1. On apprend au Markdown à ne pas mettre de <p> si c'est une image
  p: ({node, children, ...props}) => {
    const hasImage = node?.children?.some((n: any) => n.tagName === 'img');
    if (hasImage) {
      return <div className="my-12">{children}</div>; // On utilise une div au lieu d'un p
    }
    return <p className="mb-8 text-lg" {...props}>{children}</p>;
  },

  // 2. Le style des Tableaux (inchangé, mais je te le remets pour être sûr)
  table: ({node, ...props}) => (
    <div className="overflow-x-auto my-12 bg-white/[0.02] p-4 border border-white/5">
      <table className="border-collapse border border-white/10 w-full text-sm font-light" {...props} />
    </div>
  ),
  thead: ({node, ...props}) => <thead className="bg-white/5 text-white" {...props} />,
  th: ({node, ...props}) => <th className="border border-white/10 p-3 text-[10px] uppercase tracking-widest text-left font-bold" {...props} />,
  td: ({node, ...props}) => <td className="border border-white/10 p-3 text-gray-400" {...props} />,

  // 3. Le style des Titres
 h1: ({node, ...props}) => (
    <h1 className="text-white font-serif text-4xl md:text-5xl mt-20 mb-10 font-bold border-b border-white/10 pb-6" {...props} />
  ),  

h2: ({node, ...props}) => (
    <h2 className="text-white font-serif text-3xl mt-16 mb-8 italic border-l-4 border-accent-primary pl-6" {...props} />
  ),

h3: ({node, ...props}) => (
    <h3 className="text-white font-serif text-2xl mt-16 mb-6 italic border-l-2 border-accent-primary pl-4 font-semibold" {...props} />
  ),

h4: ({node, ...props}) => (
    <h4 className="text-accent-primary font-mono text-sm uppercase tracking-[0.3em] mt-10 mb-4 font-bold" {...props} />
  ),
  
  // 4. Le style des Images (On a juste enlevé la marge ici)
  img: ({node, ...props}) => (
    <div className="w-full">
      <img className="w-full border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" {...props} />
      {props.alt && <p className="text-[10px] uppercase tracking-widest text-gray-600 mt-4 text-center font-mono italic">Fig. — {props.alt}</p>}
    </div>
  ),

  // 5. Le style des Listes
  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4 my-8 pl-4" {...props} />,
  li: ({node, ...props}) => <li className="marker:text-accent-primary" {...props} />,
}}
              >
                {project.content || "L'analyse détaillée est en cours de rédaction."}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className="space-y-10">
            <div className="border-t border-white/5 pt-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mb-4 font-mono font-bold">Stack & Outils</h4>
              <p className="text-sm text-white font-mono leading-relaxed">{project.tech}</p>
            </div>
            <div className="border-t border-white/5 pt-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mb-4 font-mono font-bold">Localisation</h4>
              <p className="text-sm text-white italic">Yamoussoukro, Côte d'Ivoire</p>
            </div>
            <div className="border-t border-white/5 pt-6 p-6 bg-white/[0.02]">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent-primary mb-4 font-mono font-bold">Note de l'analyste</h4>
              <p className="text-[11px] text-gray-500 italic leading-relaxed">
  {project.analysisNote || "Cette analyse est basée sur des données réelles."}
</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

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

  if (loading) return <div className="min-h-screen bg-paper flex items-center justify-center text-ink font-mono uppercase text-xs tracking-widest animate-pulse">Analyse du dossier en cours...</div>;

  return (
    <main className="min-h-screen bg-paper pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/projets" className="text-gold text-[10px] uppercase tracking-[0.2em] mb-12 inline-block hover:translate-x-[-4px] transition-transform">
          ← Retour au portfolio
        </Link>

        {project.coverUrl && (
          <div className="w-full h-[40vh] md:h-[60vh] mb-12 overflow-hidden border border-line bg-paper-deep relative group">
            <img
              src={project.coverUrl}
              alt={project.title}
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-60"></div>
          </div>
        )}

        <header className="mb-16 border-b border-line pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] uppercase tracking-widest text-gold border border-gold/30 px-3 py-1 font-bold">
              {project.category}
            </span>
            <span className="text-[10px] text-ink-soft uppercase tracking-widest italic font-mono">
              Status: {project.status}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-ink mb-8 leading-tight">{project.title}</h1>
          <p className="text-xl text-ink-soft font-light leading-relaxed italic max-w-2xl">
            "{project.description}"
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            <h2 className="text-ink font-serif text-2xl italic border-l-2 border-gold pl-6 font-medium">
              Approche Stratégique & Analyse
            </h2>

            <div className="prose max-w-none text-ink-soft font-light leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, children, ...props}) => {
                    const hasImage = node?.children?.some((n: any) => n.tagName === 'img');
                    if (hasImage) {
                      return <div className="my-12">{children}</div>;
                    }
                    return <p className="mb-8 text-lg" {...props}>{children}</p>;
                  },

                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-12 bg-paper-deep p-4 border border-line">
                      <table className="border-collapse border border-line w-full text-sm font-light" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-paper-deep text-ink" {...props} />,
                  th: ({node, ...props}) => <th className="border border-line p-3 text-[10px] uppercase tracking-widest text-left font-bold" {...props} />,
                  td: ({node, ...props}) => <td className="border border-line p-3 text-ink-soft" {...props} />,

                  h1: ({node, ...props}) => (
                    <h1 className="text-ink font-serif text-4xl md:text-5xl mt-20 mb-10 font-bold border-b border-line pb-6" {...props} />
                  ),
                  h2: ({node, ...props}) => (
                    <h2 className="text-ink font-serif text-3xl mt-16 mb-8 italic border-l-4 border-gold pl-6" {...props} />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 className="text-ink font-serif text-2xl mt-16 mb-6 italic border-l-2 border-gold pl-4 font-semibold" {...props} />
                  ),
                  h4: ({node, ...props}) => (
                    <h4 className="text-gold font-mono text-sm uppercase tracking-[0.3em] mt-10 mb-4 font-bold" {...props} />
                  ),

                  img: ({node, ...props}) => (
                    <div className="w-full">
                      <img className="w-full border border-line shadow-xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700" {...props} />
                      {props.alt && <p className="text-[10px] uppercase tracking-widest text-ink-soft mt-4 text-center font-mono italic">Fig. — {props.alt}</p>}
                    </div>
                  ),

                  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4 my-8 pl-4" {...props} />,
                  li: ({node, ...props}) => <li className="marker:text-gold" {...props} />,
                }}
              >
                {project.content || "L'analyse détaillée est en cours de rédaction."}
              </ReactMarkdown>
            </div>
          </div>

          <div className="space-y-10">
            <div className="border-t border-line pt-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-4 font-mono font-bold">Stack & Outils</h4>
              <p className="text-sm text-ink font-mono leading-relaxed">{project.tech}</p>
            </div>
            <div className="border-t border-line pt-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-4 font-mono font-bold">Localisation</h4>
              <p className="text-sm text-ink italic">Yamoussoukro, Côte d'Ivoire</p>
            </div>
            <div className="border-t border-line pt-6 p-6 bg-paper-deep">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4 font-mono font-bold">Note de l'analyste</h4>
              <p className="text-[11px] text-ink-soft italic leading-relaxed">
                {project.analysisNote || "Cette analyse est basée sur des données réelles."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

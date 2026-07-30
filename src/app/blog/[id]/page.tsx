"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "projects", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().type === 'analyse') {
        setPost(docSnap.data());
      } else {
        router.push('/blog');
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, router]);

  if (loading) return <div className="min-h-screen bg-paper flex items-center justify-center text-ink font-mono uppercase text-xs tracking-widest animate-pulse">Chargement de l'analyse...</div>;

  return (
    <main className="min-h-screen bg-paper pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-gold text-[10px] uppercase tracking-[0.2em] mb-12 inline-block hover:translate-x-[-4px] transition-transform font-bold">
          ← Retour aux analyses
        </Link>

        {/* IMAGE DE COUVERTURE (COVER) */}
        {post.coverUrl && (
          <div className="w-full h-64 md:h-[50vh] mb-12 overflow-hidden border border-line bg-paper-deep relative group">
            <img
              src={post.coverUrl}
              alt={post.title}
              className="w-full h-full object-cover grayscale contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent opacity-60"></div>
          </div>
        )}

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
              // {post.category}
            </span>
            {post.createdAt && (
              <span className="text-[10px] text-ink-soft font-mono uppercase tracking-widest italic">
                {post.createdAt.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-ink mb-8 leading-tight">{post.title}</h1>
          <p className="text-xl text-ink-soft font-light leading-relaxed italic border-l border-line pl-8">
            "{post.description}"
          </p>

          {/* TÉLÉCHARGEMENT PDF — visible uniquement si un fileUrl est renseigné */}
          {post.fileUrl && (
            <a
              href={post.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold border border-gold/30 px-5 py-3 mt-8 hover:bg-gold hover:text-paper transition-all"
            >
              ↓ Télécharger l'analyse complète (PDF)
            </a>
          )}
        </header>

        {/* CONTENU DE L'ANALYSE (MARKDOWN) */}
        <section className="prose max-w-none text-ink-soft font-light leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 1. On apprend au Markdown à ne pas mettre de <p> si c'est une image
              p: ({node, children, ...props}) => {
                const hasImage = node?.children?.some((n: any) => n.tagName === 'img');
                if (hasImage) {
                  return <div className="my-12">{children}</div>;
                }
                return <p className="mb-8 text-lg" {...props}>{children}</p>;
              },

              // 2. Le style des Tableaux
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-12 bg-paper-deep p-4 border border-line">
                  <table className="border-collapse border border-line w-full text-sm font-light" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="bg-paper-deep text-ink" {...props} />,
              th: ({node, ...props}) => <th className="border border-line p-3 text-[10px] uppercase tracking-widest text-left font-bold" {...props} />,
              td: ({node, ...props}) => <td className="border border-line p-3 text-ink-soft" {...props} />,

              // 3. Le style des Titres
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

              // 4. Le style des Images
              img: ({node, ...props}) => (
                <div className="w-full">
                  <img className="w-full border border-line shadow-xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700" {...props} />
                  {props.alt && <p className="text-[10px] uppercase tracking-widest text-ink-soft mt-4 text-center font-mono italic">Fig. — {props.alt}</p>}
                </div>
              ),

              // 5. Le style des Listes
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4 my-8 pl-4" {...props} />,
              li: ({node, ...props}) => <li className="marker:text-gold" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </section>

        {post.analysisNote && (
          <div className="mt-16 p-8 bg-paper-deep border-l-2 border-gold">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4 font-mono font-bold">Note de l'analyste</h4>
            <p className="text-sm text-ink-soft italic leading-relaxed">
              {post.analysisNote}
            </p>
          </div>
        )}

        <footer className="mt-24 pt-12 border-t border-line text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-8 font-mono italic">
            Analyse publiée par Medoune Camara — Yamoussoukro, CI
          </p>
          <Link
            href="mailto:medoune.c.k.camara.pro@gmail.com"
            className="px-12 py-5 bg-ink text-paper font-bold text-xs uppercase tracking-widest hover:bg-gold transition-all shadow-lg"
          >
            Réagir à cette analyse
          </Link>
        </footer>
      </div>
    </main>
  );
}

"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), where("type", "==", "analyse"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-paper pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-[10px] mb-4">// Intelligence & Stratégie</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-ink">Analyses <br /><span className="italic text-ink-soft font-light">Économiques.</span></h1>
        </div>

        {loading ? (
          <div className="text-ink-soft font-mono text-xs animate-pulse">Synchronisation des flux de données...</div>
        ) : posts.length === 0 ? (
          <div className="text-ink-soft font-mono text-xs">Aucune analyse publiée pour l'instant.</div>
        ) : (
          <div className="space-y-20">
            {posts.map((post) => (
              <article key={post.id} className="group cursor-pointer border-b border-line pb-16 flex flex-col md:flex-row gap-8 items-start">
                {post.coverUrl && (
                  <div className="w-full md:w-48 aspect-video md:aspect-square overflow-hidden bg-paper-deep border border-line flex-shrink-0">
                    <img
                      src={post.coverUrl}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      alt=""
                    />
                  </div>
                )}

                <Link href={`/blog/${post.id}`} className="flex-1">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className="text-[10px] text-gold font-mono">// {post.category}</span>
                    <span className="h-px w-8 bg-line"></span>
                    <span className="text-[10px] text-ink-soft uppercase tracking-widest italic font-mono">Analyse Stratégique</span>
                    {post.createdAt && (
                      <>
                        <span className="h-px w-8 bg-line"></span>
                        <span className="text-[10px] text-ink-soft font-mono">
                          {post.createdAt.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-ink mb-4 group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-ink-soft font-light leading-relaxed max-w-2xl mb-6">
                    {post.description}
                  </p>
                  <span className="text-xs text-ink border-b border-ink/20 pb-1 group-hover:border-gold group-hover:text-gold transition-all uppercase tracking-tighter">
                    Ouvrir le dossier complet →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

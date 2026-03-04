"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On récupère uniquement les documents dont le type est 'analyse'
    const q = query(collection(db, "projects"), where("type", "==", "analyse"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-brand-midnight pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-4">// Intelligence & Stratégie</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-white">Analyses <br /><span className="italic text-gray-500 font-light">Économiques.</span></h1>
        </div>

        {loading ? (
          <div className="text-gray-600 font-mono text-xs animate-pulse">Synchronisation des flux de données...</div>
        ) : (
          <div className="space-y-20">
            {posts.map((post) => (
  <article key={post.id} className="group cursor-pointer border-b border-white/5 pb-16 flex flex-col md:flex-row gap-8 items-start">
    {/* MINIATURE (THUMBNAIL) */}
    {post.coverUrl && (
      <div className="w-full md:w-48 aspect-video md:aspect-square overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
        <img 
          src={post.coverUrl} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
          alt=""
        />
      </div>
    )}
    
    <Link href={`/blog/${post.id}`} className="flex-1">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[10px] text-accent-primary font-mono">// {post.category}</span>
        <span className="h-px w-8 bg-white/10"></span>
        <span className="text-[10px] text-gray-600 uppercase tracking-widest italic font-mono">Analyse Stratégique</span>
      </div>
      <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:text-accent-primary transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-400 font-light leading-relaxed max-w-2xl mb-6">
        {post.description}
      </p>
      <span className="text-xs text-white border-b border-white/20 pb-1 group-hover:border-accent-primary transition-all uppercase tracking-tighter">
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

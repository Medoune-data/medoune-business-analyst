"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string;
  status: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];

      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-paper pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-gold font-mono uppercase tracking-[0.3em] text-xs mb-4">// Portfolio</h2>
          <h1 className="text-4xl md:text-6xl font-serif text-ink">Projets & <span className="italic text-ink-soft font-light">Initiatives.</span></h1>
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            <div className="h-4 w-48 bg-paper-deep animate-pulse"></div>
            <div className="h-32 w-full bg-paper-deep animate-pulse"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.length === 0 ? (
              <p className="text-ink-soft italic">Aucun projet publié pour le moment.</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="group border-t border-line pt-8 hover:border-gold transition-colors duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{project.category}</span>
                    <span className="text-[10px] text-ink-soft border border-line px-2 py-1 uppercase">{project.status}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-ink mb-4 group-hover:translate-x-2 transition-transform duration-300">{project.title}</h3>
                  <p className="text-ink-soft font-light leading-relaxed mb-6 italic">
                    "{project.description}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-ink-soft font-mono italic">{project.tech}</span>
                    <Link
                      href={`/projets/${project.id}`}
                      className="text-xs text-ink border-b border-ink/30 group-hover:border-gold group-hover:text-gold transition-all pb-1 uppercase tracking-tighter"
                    >
                      Détails du projet
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}

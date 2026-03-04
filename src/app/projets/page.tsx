"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
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
    // On pointe sur la collection "projects" de Firebase
    const q = query(collection(db, "projects"));
    
    // Écoute en temps réel : dès que tu ajoutes dans l'admin, ça change ici
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
    <main className="min-h-screen bg-brand-midnight pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-accent-primary font-mono uppercase tracking-[0.3em] text-xs mb-4">// Portfolio</h2>
          <h1 className="text-4xl md:text-6xl font-serif text-white">Projets & <span className="italic text-gray-500 font-light">Initiatives.</span></h1>
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            <div className="h-4 w-48 bg-white/5 animate-pulse"></div>
            <div className="h-32 w-full bg-white/5 animate-pulse"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.length === 0 ? (
              <p className="text-gray-500 italic">Aucun projet publié pour le moment.</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="group border-t border-white/10 pt-8 hover:border-accent-primary transition-colors duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-accent-primary font-bold">{project.category}</span>
                    <span className="text-[10px] text-gray-600 border border-white/10 px-2 py-1 uppercase">{project.status}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{project.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-6 italic">
                    "{project.description}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-mono italic">{project.tech}</span>
                    <Link 
  href={`/projets/${project.id}`} 
  className="text-xs text-white border-b border-white group-hover:border-accent-primary group-hover:text-accent-primary transition-all pb-1 uppercase tracking-tighter"
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

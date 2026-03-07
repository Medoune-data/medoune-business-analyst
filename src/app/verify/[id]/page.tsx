"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function VerifyCertificate() {
  const { id } = useParams();
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCert = async () => {
      const docRef = doc(db, "certificates", id as string);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCert(docSnap.data());
      }
      setLoading(false);
    };
    fetchCert();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-xs animate-pulse">VÉRIFICATION DE L'AUTHENTICITÉ...</div>;

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto border border-white/10 bg-white/[0.02] p-8 md:p-16 rounded-2xl relative overflow-hidden">
        
        {/* Filigrane décoratif */}
        <div className="absolute top-[-10%] right-[-10%] text-[20vw] font-serif opacity-[0.03] select-none pointer-events-none">
          VERIFIED
        </div>

        {cert ? (
          <div className="relative z-10 text-center">
            <div className="inline-block px-4 py-1 border border-accent-primary/50 text-accent-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-12">
              Certificat Authentifié
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif mb-8 italic">
              Confirmation de Réussite
            </h1>
            
            <div className="space-y-8 text-gray-400 font-light">
              <p className="text-lg">
                Ce document officiel atteste que l'étudiant(e)
              </p>
              
              <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
                {cert.studentName}
              </h2>
              
              <p className="text-lg">
                a complété avec succès le programme de formation
              </p>
              
              <div className="py-6 border-y border-white/5">
                <h3 className="text-xl text-white font-serif italic">
                  {cert.courseTitle}
                </h3>
                <p className="text-xs font-mono mt-2 tracking-widest text-gray-600">
                  DÉLIVRÉ LE : {cert.issueDate}
                </p>
              </div>
{/* SECTION PROJET (GitHub / Portfolio) */}
{cert.projectUrl && (
  <div className="mt-10 p-6 bg-accent-primary/5 border border-accent-primary/20 rounded-xl">
    <p className="text-[10px] uppercase tracking-widest text-accent-primary mb-4 font-mono font-bold">Livrable de formation</p>
    <a 
      href={cert.projectUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-lg"
    >
      Consulter le projet final (GitHub) →
    </a>
  </div>
)}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center">
               <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-4 font-mono">
                ID Unique : {id}
              </p>
              <Link href="/" className="text-[10px] text-accent-primary uppercase font-bold tracking-widest hover:border-b border-accent-primary transition-all">
                Retour sur Evalis Corp
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-4xl mb-6 block">⚠️</span>
            <h2 className="text-2xl font-serif mb-4">Certificat introuvable</h2>
            <p className="text-gray-500 text-sm">Cet identifiant ne correspond à aucun enregistrement dans notre base de données sécurisée.</p>
          </div>
        )}
      </div>
    </main>
  );
}

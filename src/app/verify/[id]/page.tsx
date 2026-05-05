"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

// Compétences automatiques par formation
const COURSE_SKILLS: Record<string, string[]> = {
  "Excel pour l'Analyse de Données": [
    "Tableaux croisés dynamiques",
    "Dashboards interactifs",
    "Formules avancées (INDEX/EQUIV, OFFSET)",
    "Visualisation de données",
    "Nettoyage & structuration de fichiers",
  ],
  "Maîtrise de SQL pour le Business": [
    "Requêtes complexes (JOIN, CTE, Subqueries)",
    "Agrégations & fenêtrage (WINDOW FUNCTIONS)",
    "Optimisation de requêtes",
    "Gestion de bases relationnelles",
    "Extraction & transformation de données",
    "Analyse métier via SQL",
  ],
  "Data Science & Stratégie avec R": [
    "Modélisation économétrique",
    "Analyse de régression (OLS, Logit)",
    "Visualisation avancée (ggplot2)",
    "Nettoyage de données (dplyr / tidyr)",
    "Segmentation & clustering",
  ],
};

const COURSE_COLORS: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  "Excel pour l'Analyse de Données": {
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  "Maîtrise de SQL pour le Business": {
    border: "border-blue-500/40",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    dot: "bg-blue-400",
  },
  "Data Science & Stratégie avec R": {
    border: "border-purple-500/40",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    dot: "bg-purple-400",
  },
};

const MENTION_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "Excellence": { label: "Excellence", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/40" },
  "Très Bien":  { label: "Très Bien",  color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/40" },
  "Bien":       { label: "Bien",       color: "text-blue-400",    bg: "bg-blue-400/10",    border: "border-blue-400/40" },
  "Passable":   { label: "Passable",   color: "text-gray-400",    bg: "bg-gray-400/10",    border: "border-gray-400/30" },
};

export default function VerifyCertificate() {
  const { id } = useParams();
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCert = async () => {
      const docRef = doc(db, "certificates", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setCert(docSnap.data());
      setLoading(false);
    };
    fetchCert();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="w-6 h-6 border border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">
        Vérification de l'authenticité...
      </p>
    </div>
  );

  const skills = cert ? (COURSE_SKILLS[cert.courseTitle] || []) : [];
  const colors = cert ? (COURSE_COLORS[cert.courseTitle] || COURSE_COLORS["Excel pour l'Analyse de Données"]) : COURSE_COLORS["Excel pour l'Analyse de Données"];
  const mention = cert?.mention ? MENTION_CONFIG[cert.mention] : null;

  return (
    <main className="min-h-screen bg-black text-white pb-24 px-4">

      {/* Top bar */}
      <div className="w-full border-b border-white/5 py-4 px-6 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
          ← Evalis Corp
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
          Certificat Officiel
        </span>
      </div>

      {cert ? (
        <div className="max-w-4xl mx-auto pt-16 space-y-6">

          {/* CARD PRINCIPALE */}
          <div className={`relative border ${colors.border} bg-white/[0.02] rounded-2xl overflow-hidden`}>
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="text-[18vw] font-serif text-white/[0.025] uppercase tracking-tighter whitespace-nowrap">
                VERIFIED
              </span>
            </div>

            <div className="relative z-10 p-8 md:p-14 text-center">

              {/* Badge authentifié */}
              <div className="inline-flex items-center gap-2 mb-10">
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
                <span className={`text-[10px] font-mono uppercase tracking-[0.35em] font-bold ${colors.text}`}>
                  Certificat Authentifié
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
              </div>

              <p className="text-gray-500 text-sm mb-4 font-light">
                Ce document officiel atteste que l'étudiant(e)
              </p>

              <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tighter text-white mb-4 uppercase">
                {cert.studentName}
              </h1>

              <p className="text-gray-400 text-sm font-light mb-6">
                a complété avec succès le programme
              </p>

              {/* Titre formation */}
              <div className={`inline-block px-6 py-2.5 rounded-full border ${colors.border} ${colors.bg} mb-6`}>
                <span className={`text-sm font-bold tracking-wider ${colors.text}`}>
                  {cert.courseTitle}
                </span>
              </div>

              {/* Ligne meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-widest text-gray-600 mt-6">
                <span>Délivré le : {cert.issueDate}</span>
                {cert.duration && <><span className="text-white/10">|</span><span>{cert.duration}</span></>}
                {cert.level && <><span className="text-white/10">|</span><span className="text-white/50">{cert.level}</span></>}
              </div>

              {/* Mention */}
              {mention && (
                <div className={`inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full border ${mention.border} ${mention.bg}`}>
                  <span className="text-lg">🏅</span>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${mention.color}`}>
                    Mention {mention.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* GRILLE : COMPÉTENCES + PROJET */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Compétences */}
            {skills.length > 0 && (
              <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-8">
                <p className={`text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-6 ${colors.text}`}>
                  Compétences Validées
                </p>
                <ul className="space-y-3">
                  {skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                      <span className="text-gray-300 text-sm font-light leading-snug">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Projet final */}
            <div className="flex flex-col gap-6">

              {/* Description projet */}
              {cert.projectDescription && (
                <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-8 flex-1">
                  <p className={`text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-4 ${colors.text}`}>
                    Projet Final
                  </p>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {cert.projectDescription}
                  </p>
                </div>
              )}

              {/* Lien GitHub */}
              {cert.projectUrl && (
                <div className={`border ${colors.border} ${colors.bg} rounded-2xl p-8`}>
                  <p className={`text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-4 ${colors.text}`}>
                    Livrable de Formation
                  </p>
                  <a
                    href={cert.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-lg"
                  >
                    <span>⌥</span>
                    Consulter le projet GitHub →
                  </a>
                </div>
              )}

              {/* Si pas de projet du tout, afficher un placeholder stylé */}
              {!cert.projectDescription && !cert.projectUrl && (
                <div className="border border-white/5 rounded-2xl p-8 flex items-center justify-center flex-1">
                  <p className="text-gray-700 text-xs font-mono uppercase tracking-widest text-center">
                    Projet non renseigné
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER VÉRIFICATION */}
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600 mb-1">
                ID Unique de Vérification
              </p>
              <p className="text-xs font-mono text-white/40 break-all">{id}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCopy}
                className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-5 py-2.5 rounded-lg hover:border-white/30 transition-colors text-gray-400 hover:text-white"
              >
                {copied ? "✓ Lien copié" : "Copier le lien"}
              </button>
              <a
                href={`/verify/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-5 py-2.5 rounded-lg hover:border-white/30 transition-colors text-gray-400 hover:text-white"
              >
                Ouvrir ↗
              </a>
            </div>
          </div>

        </div>
      ) : (
        <div className="max-w-4xl mx-auto pt-32 text-center">
          <div className="inline-block border border-red-500/20 bg-red-500/5 rounded-2xl p-16">
            <span className="text-5xl mb-6 block">⚠️</span>
            <h2 className="text-2xl font-serif mb-4">Certificat introuvable</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto font-light leading-relaxed">
              Cet identifiant ne correspond à aucun enregistrement dans notre base de données sécurisée.
            </p>
            <Link href="/" className="inline-block mt-8 text-[10px] font-mono uppercase tracking-widest text-accent-primary hover:underline">
              Retour →
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

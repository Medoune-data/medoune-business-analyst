import RegistrationForm from '@/components/RegistrationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "L'Arsenal du Data Analyst | Formations Excel, SQL & R | Medoune Camara",
  description: "Rejoignez l'élite de la donnée. Un cursus complet (Excel Pro, SQL Master, R Strategy) conçu pour transformer votre carrière et dominer la stratégie de revenus, où que vous soyez.",
  openGraph: {
    title: "L'Arsenal du Data Analyst | Medoune Camara",
    description: "Formations intensives en Data Analysis et Revenue Strategy. Réservez votre place pour la prochaine session.",
    url: 'https://medoune-business-analyst.vercel.app/formation',
    siteName: 'Medoune Camara - Stratégie & Data',
    images: [{ url: 'https://medoune-business-analyst.vercel.app/og-formation.png', width: 1200, height: 630, alt: 'Cursus Data Analyst : Excel, SQL et R' }],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ─── CONFIG SESSIONS ────────────────────────────────────────────────────────
// Modifier ces valeurs pour chaque nouvelle session
const SESSION = {
  date: "2 Juin 2026",
  placesTotal: 20,
  placesRestantes: 7,   // ← mettre à jour manuellement
  deadline: "28 Mai 2026",
};

const COURSES = [
  {
    num: "01",
    tag: "Office",
    title: "EXCEL PRO",
    color: { border: "border-emerald-500/30", bg: "bg-emerald-500/5", tag: "text-emerald-400", badge: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
    duration: "12h de formation",
    price: "35 000 FCFA",
    priceEur: "~53€",
    desc: "Dashboards interactifs et nettoyage de données pour PME.",
    modules: [
      "Formules avancées (INDEX/EQUIV, OFFSET, INDIRECT)",
      "Power Query : import et transformation automatique",
      "Tableaux croisés dynamiques maîtrisés",
      "Construction d'un Dashboard de A à Z",
      "Projet final : rapport automatisé pour une PME",
    ],
  },
  {
    num: "02",
    tag: "Database",
    title: "SQL MASTER",
    color: { border: "border-blue-500/30", bg: "bg-blue-500/5", tag: "text-blue-400", badge: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
    duration: "10h de formation",
    price: "35 000 FCFA",
    priceEur: "~53€",
    desc: "Extraction et manipulation de bases de données relationnelles.",
    modules: [
      "SELECT, JOIN, GROUP BY — de la base à l'expert",
      "Subqueries et CTEs complexes",
      "Window Functions (RANK, ROW_NUMBER, LAG)",
      "Optimisation de requêtes et index",
      "Projet final : analyse business sur une vraie base",
    ],
  },
  {
    num: "03",
    tag: "Science",
    title: "R STRATEGY",
    color: { border: "border-purple-500/30", bg: "bg-purple-500/5", tag: "text-purple-400", badge: "border-purple-500/40 text-purple-400 bg-purple-500/10" },
    duration: "15h de formation",
    price: "45 000 FCFA",
    priceEur: "~69€",
    desc: "Analyse économétrique et prédiction pour la stratégie de revenus.",
    modules: [
      "Manipulation de données (dplyr, tidyr)",
      "Visualisation avancée avec ggplot2",
      "Régression linéaire et logistique (OLS / Logit)",
      "Segmentation RFM et clustering",
      "Projet final : modèle de prédiction de revenus",
    ],
  },
];

const PACK_ELITE = {
  price: "100 000 FCFA",
  priceEur: "~153€",
  savings: "15 000 FCFA économisés",
};

export default function FormationPage() {
  const urgencePercent = Math.round(((SESSION.placesTotal - SESSION.placesRestantes) / SESSION.placesTotal) * 100);

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 font-bold">
              Prochaine session : {SESSION.date} — {SESSION.placesRestantes} places restantes
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-accent-primary to-purple-500 bg-clip-text text-transparent leading-tight">
            L'Arsenal du<br />Data Analyst
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            De la gestion de flux sur Excel à la modélisation économétrique sur R.<br />
            Trois piliers stratégiques pour dominer la donnée et les revenus.
          </p>

          {/* Barre d'urgence */}
          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
              <span>Places prises</span>
              <span className="text-white">{urgencePercent}% rempli</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-primary to-red-400 rounded-full transition-all"
                style={{ width: `${urgencePercent}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-600 font-mono mt-2">
              Inscriptions fermées le {SESSION.deadline}
            </p>
          </div>
        </div>

        {/* ─── LES 3 FORMATIONS ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {COURSES.map((course) => (
            <div key={course.num} className={`border ${course.color.border} ${course.color.bg} rounded-2xl p-8 flex flex-col`}>
              <div className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${course.color.tag}`}>
                {course.num}. {course.tag}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{course.title}</h3>
              <p className="text-sm text-gray-500 font-light mb-6 leading-relaxed">{course.desc}</p>

              <ul className="space-y-2 mb-8 flex-1">
                {course.modules.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400 font-light">
                    <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${course.color.tag.replace('text-', 'bg-')}`} />
                    {m}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-white">{course.price}</span>
                  <span className="text-[10px] text-gray-600 ml-2 font-mono">{course.priceEur}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">{course.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── PACK ELITE ────────────────────────────────────────────────── */}
        <div className="border border-accent-primary/30 bg-accent-primary/5 rounded-2xl p-10 mb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
            <span className="text-[12vw] font-serif text-white/[0.03] uppercase tracking-tighter">ELITE</span>
          </div>
          <div className="relative z-10">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-accent-primary font-bold mb-4">
              🏆 Pack Complet — Le Choix des Leaders
            </span>
            <h3 className="text-3xl font-serif italic text-white mb-3">
              Excel + SQL + R + Guide Exclusif
            </h3>
            <p className="text-gray-400 font-light mb-6 max-w-xl mx-auto text-sm leading-relaxed">
              Accès aux 3 formations complètes + mon guide exclusif de 20 pages pour débutants +
              support WhatsApp prioritaire pendant toute la durée du cursus.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-4xl font-bold text-white">{PACK_ELITE.price}</span>
              <span className="text-sm font-mono text-gray-500">{PACK_ELITE.priceEur}</span>
              <span className="border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {PACK_ELITE.savings}
              </span>
            </div>
          </div>
        </div>

        {/* ─── INSCRIPTION ───────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h3 className="text-3xl font-serif italic text-white">Prêt à changer de dimension ?</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Que vous soyez débutant sur Excel ou que vous vouliez maîtriser l'analyse économétrique sur R,
              ce cursus est conçu pour la performance réelle.
              <br /><br />
              Rejoignez la nouvelle promotion internationale et apprenez à transformer des données brutes
              en leviers de croissance indiscutables — sans aucune limite géographique.
            </p>

            {/* Garanties */}
            <div className="space-y-3">
              {[
                "Accès à vie aux supports de cours",
                "Certificat officiel Evalis Corp délivré",
                "Projet final sur données réelles",
                "Support WhatsApp inclus",
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-emerald-400 text-xs">✓</span>
                  {g}
                </div>
              ))}
            </div>

            {/* Urgence finale */}
            <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-xl">
              <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-1 font-bold">
                ⚡ Urgence
              </p>
              <p className="text-sm text-gray-300">
                Il reste <strong className="text-white">{SESSION.placesRestantes} places</strong> pour la session du{" "}
                <strong className="text-white">{SESSION.date}</strong>.
                Les inscriptions ferment le {SESSION.deadline}.
              </p>
            </div>
          </div>

          <RegistrationForm />
        </div>

      </div>
    </main>
  );
}

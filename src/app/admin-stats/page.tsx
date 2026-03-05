import React from 'react';

export default function AdminStatsPage() {
  const stats = {
    totalInscrits: 12,
    tauxPC: 75,
    dispoMeet: 90,
    niveaux: { debutant: 60, intermediaire: 30, avance: 10 }
  };

  return (
    <main className="min-h-screen bg-brand-midnight text-white pt-40 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* EN-TÊTE CENTRÉ */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-accent-primary bg-clip-text text-transparent">
            Dashboard de Pilotage
          </h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase italic">
            Espace Privé • Analyse de la Cohorte Excel 2026
          </p>
        </div>

        {/* GRILLE DES KPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-accent-primary/50 transition-all group">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Inscriptions</p>
            <h3 className="text-5xl font-black group-hover:scale-110 transition-transform origin-left">
              {stats.totalInscrits}
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all group">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Équipement PC</p>
            <h3 className="text-5xl font-black text-green-400 group-hover:scale-110 transition-transform origin-left">
              {stats.tauxPC}%
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all group">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Accès Direct Meet</p>
            <h3 className="text-5xl font-black text-purple-400 group-hover:scale-110 transition-transform origin-left">
              {stats.dispoMeet}%
            </h3>
          </div>
        </div>

        {/* SECTION NIVEAUX - PLUS LARGE ET ÉLÉGANTE */}
        <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">Répartition des Compétences</h2>
            <span className="text-xs text-gray-500 font-mono">Source : Formulaire Formspree</span>
          </div>
          
          <div className="space-y-10">
            {[
              { label: "Débutant", val: stats.niveaux.debutant, color: "bg-blue-500" },
              { label: "Intermédiaire", val: stats.niveaux.intermediaire, color: "bg-green-500" },
              { label: "Avancé", val: stats.niveaux.avance, color: "bg-purple-500" }
            ].map((n) => (
              <div key={n.label}>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm font-medium text-gray-300">{n.label}</span>
                  <span className="text-xl font-bold">{n.val}%</span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                  <div className={`${n.color} h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]`} style={{ width: `${n.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

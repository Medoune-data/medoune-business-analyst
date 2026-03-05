import React from 'react';

export default function AdminStatsPage() {
  // Ces données sont à mettre à jour manuellement selon tes rapports Formspree
  const stats = {
    totalInscrits: 12,
    tauxPC: 75, // en %
    dispoMeet: 90, // en %
    niveaux: {
      debutant: 60,
      intermediaire: 30,
      avance: 10
    }
  };

  return (
    <main className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-blue-400">Dashboard de Pilotage</h1>
        <p className="text-gray-500 mb-10 text-sm italic">Page privée • Statistiques de la formation Excel</p>

        {/* --- CARTES KPI --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Inscriptions</p>
            <h3 className="text-4xl font-bold mt-2">{stats.totalInscrits}</h3>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Équipement PC</p>
            <h3 className="text-4xl font-bold mt-2 text-green-400">{stats.tauxPC}%</h3>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Accès Meet</p>
            <h3 className="text-4xl font-bold mt-2 text-purple-400">{stats.dispoMeet}%</h3>
          </div>
        </div>

        {/* --- RÉPARTITION DES NIVEAUX --- */}
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-6">Répartition par niveau</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Débutant</span>
                <span>{stats.niveaux.debutant}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${stats.niveaux.debutant}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Intermédiaire</span>
                <span>{stats.niveaux.intermediaire}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.niveaux.intermediaire}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Avancé</span>
                <span>{stats.niveaux.avance}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${stats.niveaux.avance}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

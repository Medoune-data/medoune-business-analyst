import React from 'react';

// 1. TA BASE DE DONNÉES DE FORMATION
// C'est ici que tu ajouteras un nouveau bloc chaque semaine
const SEANCES = [
  {
    id: 1,
    semaine: "Semaine 1",
    titre: "Fondations & Nettoyage de Données",
    description: "Apprendre à structurer des données brutes de ventes Mobile Money à Yamoussoukro.",
    youtubeId: "dQw4w9WgXcQ", // Remplace par l'ID de ta vidéo YouTube
    date: "04 Mars 2026",
    fichiers: [
      { nom: "01. Données Brutes (TP1)", url: "/downloads/s1/ventes_brutes.xlsx", type: "excel" },
      { nom: "02. Guide des Raccourcis", url: "/downloads/s1/raccourcis.pdf", type: "pdf" },
    ]
  },
  // Quand la Semaine 2 arrive, tu copies-colles le bloc ci-dessus ici
];

export default function RessourcesPage() {
  // On récupère toujours la dernière séance publiée pour l'afficher en haut
  const derniereSeance = SEANCES[SEANCES.length - 1];

  return (
    <main className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 tracking-tighter">HUB DE RESSOURCES</h1>
            <p className="text-gray-400 mt-2">Espace membre - Formation Excel Data Analyst</p>
          </div>
          <a href="/formation" className="mt-4 md:mt-0 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition border border-gray-800 px-4 py-2 rounded">
            ← Quitter l'espace
          </a>
        </div>

        {/* SECTION : LE DERNIER REPLAY (A la une) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600 text-[10px] font-bold px-2 py-1 rounded">DERNIER REPLAY</span>
            <h2 className="text-2xl font-semibold">{derniereSeance.semaine} : {derniereSeance.titre}</h2>
          </div>
          
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${derniereSeance.youtubeId}`}
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* SECTION : HISTORIQUE ET TÉLÉCHARGEMENTS */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="text-blue-500">📂</span> Archives des modules & Fichiers
          </h2>

          <div className="space-y-12">
            {[...SEANCES].reverse().map((seance) => (
              <div key={seance.id} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-blue-500 text-xs font-mono uppercase tracking-widest">{seance.semaine} • {seance.date}</span>
                    <h3 className="text-xl font-bold mt-1">{seance.titre}</h3>
                    <p className="text-gray-400 text-sm mt-2">{seance.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {seance.fichiers.map((fichier, idx) => (
                    <a 
                      key={idx}
                      href={fichier.url} 
                      download
                      className="flex items-center justify-between p-4 bg-black/50 border border-gray-800 rounded-xl hover:bg-blue-600 hover:border-blue-600 group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{fichier.type === 'excel' ? '📊' : '📄'}</span>
                        <span className="text-sm font-medium group-hover:text-white">{fichier.nom}</span>
                      </div>
                      <span className="text-gray-600 group-hover:text-blue-200 text-xs">↓</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

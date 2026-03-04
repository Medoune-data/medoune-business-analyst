import React from 'react';

export default function RessourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-400">Hub de Ressources Excel</h1>
            <p className="text-gray-400 mt-2">Accède aux replays et aux fichiers de données de la promo.</p>
          </div>
          <a href="/formation" className="mt-4 md:mt-0 text-sm text-gray-500 hover:text-white transition">
            ← Retour à l'inscription
          </a>
        </div>

        {/* Section 1 : Le Replay (Vidéo) */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            📺 Dernier Replay : <span className="text-blue-500 text-lg">Module 1 - Les bases & Nettoyage</span>
          </h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            {/* On utilise un iframe YouTube (tu remplaceras l'ID plus tard) */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Remplace par ton lien de replay
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Section 2 : Les Fichiers (Téléchargements) */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">📂 Fichiers de travail</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Carte Fichier 1 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition">
              <h3 className="text-xl font-bold mb-2">01. Données Brutes - Ventes Yamoussoukro</h3>
              <p className="text-sm text-gray-400 mb-4">Fichier Excel (.xlsx) pour s'exercer au nettoyage de données.</p>
              <a 
                href="/downloads/ventes_brutes.xlsx" 
                download
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Télécharger le fichier
              </a>
            </div>

            {/* Carte Fichier 2 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition">
              <h3 className="text-xl font-bold mb-2">02. Guide des Raccourcis Excel</h3>
              <p className="text-sm text-gray-400 mb-4">PDF récapitulatif pour gagner 2h par jour sur Excel.</p>
              <a 
                href="/downloads/raccourcis_excel.pdf" 
                download
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Télécharger le PDF
              </a>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

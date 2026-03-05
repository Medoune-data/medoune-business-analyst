"use client";
import React, { useState } from 'react';

export default function RegistrationForm() {
  const [status, setStatus] = useState("");

  const FORMSPREE_ID = "mvzwpplk"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      setStatus("✅ Inscription validée ! Redirection vers WhatsApp...");
      setTimeout(() => {
        window.location.href = "https://chat.whatsapp.com/LeucYf7OgY1Kneu8BCYoUc?mode=gi_t";
      }, 2000);
    } else {
      setStatus("❌ Erreur lors de l'envoi. Réessaie.");
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-blue-500/30 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Rejoins la promo Excel</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="prenom" required className="p-3 rounded bg-gray-800 border border-gray-700 outline-none text-sm text-white" placeholder="Prénom" />
          <input type="text" name="nom" required className="p-3 rounded bg-gray-800 border border-gray-700 outline-none text-sm text-white" placeholder="Nom" />
        </div>

        <input type="email" name="email" required className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none text-sm text-white" placeholder="Email (Gmail de préférence)" />

        {/* AJOUT DU CHAMP TÉLÉPHONE */}
        <div className="relative">
          <input 
            type="tel" 
            name="whatsapp" 
            required 
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none text-sm text-white pl-12" 
            placeholder="Numéro WhatsApp (ex: 07...)" 
          />
          <span className="absolute left-4 top-3 text-gray-500 text-sm">🇨🇮</span>
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-800">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Configuration & Niveau</p>
          
          <select name="excel_level" required className="w-full p-3 rounded bg-gray-800 border border-gray-700 outline-none text-sm text-white">
            <option value="">Ton niveau actuel sur Excel ?</option>
            <option value="debutant">Débutant (Je n'ai jamais ouvert Excel)</option>
            <option value="intermediaire">Intermédiaire (Je connais les formules de base)</option>
            <option value="avance">Avancé (Je connais les TCD)</option>
          </select>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" name="has_pc" className="accent-blue-500" />
              J'ai un PC avec Excel installé
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" name="can_meet" className="accent-blue-500" />
              Je peux suivre des séances en direct sur Google Meet
            </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 mt-4">
          S'inscrire gratuitement
        </button>
      </form>
      {status && <p className="mt-4 text-center text-sm font-medium text-white">{status}</p>}
    </div>
  );
}

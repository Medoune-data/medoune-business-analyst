"use client";
import React, { useState } from 'react';

export default function RegistrationForm() {
  const [status, setStatus] = useState("");

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Simulation d'enregistrement (On connectera la base de données plus tard)
    setStatus("✅ Inscription réussie ! Redirection vers le groupe WhatsApp...");
    
    // Attendre 2 secondes pour que l'utilisateur lise le message de succès
    setTimeout(() => {
      window.location.href = "https://chat.whatsapp.com/LeucYf7OgY1Kneu8BCYoUc?mode=gi_t";
    }, 2000);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-blue-500/30 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Rejoins la promo Excel Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium text-gray-400">Nom complet</label>
          <input type="text" name="name" required className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition" placeholder="Ex: Medoune Camara" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Email Universitaire</label>
          <input type="email" name="email" required className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition" placeholder="ton-email@univ.ci" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Niveau d'études</label>
          <select name="level" className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none transition">
            <option>Licence 1</option>
            <option>Licence 2</option>
            <option>Licence 3</option>
            <option>Master</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105">
          S'inscrire gratuitement
        </button>
      </form>
      {status && <p className="mt-4 text-green-400 text-sm animate-pulse">{status}</p>}
    </div>
  );
}

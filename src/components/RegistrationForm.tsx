"use client";
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RegistrationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    course: "Excel Pro" // Valeur par défaut
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // On enregistre l'inscription directement dans ta collection Firebase
      await addDoc(collection(db, "inscriptions"), {
        ...form,
        timestamp: serverTimestamp(),
        status: "En attente"
      });

      setStatus('success');

      // Déclenchement du téléchargement du guide (Optionnel)
      const link = document.createElement('a');
      link.href = '/docs/guide-prise-en-main.pdf';
      link.download = 'Guide_Data_Strategy_Medoune.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Redirection WhatsApp après 3 secondes
      setTimeout(() => {
        const message = `Bonjour Medoune, je viens de m'inscrire pour la formation : ${form.course}.`;
        window.location.href = `https://wa.me/2250564094530?text=${encodeURIComponent(message)}`;
      }, 3000);

    } catch (err) {
      console.error("Erreur Firebase:", err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-12 border border-green-500/30 bg-green-500/5 rounded-2xl text-center animate-fade-in">
        <span className="text-4xl mb-4 block">🚀</span>
        <h3 className="text-xl font-bold text-white mb-2">Inscription Validée !</h3>
        <p className="text-gray-400 text-sm">Ton empire commence ici. Le téléchargement démarre...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 md:p-12 border border-white/10 bg-white/[0.02] rounded-2xl space-y-6 shadow-2xl">
      <div className="space-y-4">
        <input 
          placeholder="Nom Complet" 
          className="w-full bg-transparent border-b border-white/20 p-3 outline-none focus:border-accent-primary transition-all text-white"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required 
        />
        <input 
          placeholder="Numéro WhatsApp" 
          className="w-full bg-transparent border-b border-white/20 p-3 outline-none focus:border-accent-primary transition-all text-white"
          value={form.whatsapp}
          onChange={e => setForm({...form, whatsapp: e.target.value})}
          required 
        />
        <input 
          type="email"
          placeholder="Email" 
          className="w-full bg-transparent border-b border-white/20 p-3 outline-none focus:border-accent-primary transition-all text-white"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required 
        />
        
        <div className="pt-4">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Choisir votre cursus</label>
          <select 
            className="w-full bg-black border border-white/10 p-4 outline-none focus:border-accent-primary text-white cursor-pointer hover:bg-white/5 transition-all appearance-none font-medium"
            value={form.course}
            onChange={e => setForm({...form, course: e.target.value})}
            required
          >
            <option value="Excel Pro">Module 01 : EXCEL PRO — 25.000 FCFA</option>
            <option value="SQL Master">Module 02 : SQL MASTER — 45.000 FCFA</option>
            <option value="R Strategy">Module 03 : R STRATEGY — 75.000 FCFA</option>
            <option value="Pack Complet (Elite)">PACK COMPLET (ELITE) — 125.000 FCFA</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full bg-white text-black py-5 font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-accent-primary hover:text-white transition-all shadow-xl disabled:opacity-50"
      >
        {status === 'loading' ? 'Traitement...' : 'Réserver ma place'}
      </button>
      
      {status === 'error' && (
        <p className="text-red-500 text-[10px] text-center uppercase font-bold">Une erreur est survenue. Réessaye.</p>
      )}

      <p className="text-[9px] text-gray-600 text-center uppercase tracking-tighter">
  Formation accessible en ligne — Places limitées par promotion.
</p>
    </form>
  );
}

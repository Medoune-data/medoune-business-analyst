"use client";
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); // Redirection vers le dashboard après connexion
    } catch (error) {
      alert("Accès refusé. Identifiants incorrects.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-midnight px-6">
      <div className="w-full max-w-sm border border-white/10 p-8 bg-black/20 backdrop-blur-xl">
        <h1 className="text-2xl font-serif text-white mb-8 text-center">Accès <span className="italic text-gray-500">Prive</span></h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-accent-primary transition-all font-light"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-accent-primary transition-all font-light"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all">
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}

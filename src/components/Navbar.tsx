"use client"; // Obligatoire pour utiliser le bouton et l'état ouvert/fermé
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Assure-toi d'avoir fait : npm install lucide-react
import { motion, AnimatePresence } from 'framer-motion'; // Assure-toi d'avoir fait : npm install framer-motion

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Analyses', href: '/blog' },
    { label: 'Projets', href: '/projets' },
    { label: 'Formation', href: '/formation' }, // Ajout de la formation
    { label: 'À Propos', href: '/about' },
  ];
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-brand-midnight/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-24 items-center">
          
          {/* LOGO (Inchangé) */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white group">
              MEDOUNE <span className="text-gray-400 font-light italic group-hover:text-accent-primary transition-colors">CAMARA</span>
            </Link>
          </div>

          {/* --- MENU DESKTOP (PC) --- */}
          {/* hidden md:flex = Caché sur mobile, visible sur PC */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((item) => (
  <Link 
    key={item.label} 
    href={item.href} 
    className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-accent-primary transition-colors flex items-center"
  >
    {item.label}
    {item.label === 'Formation' && (
      <span className="ml-2 bg-accent-primary text-[8px] px-1.5 py-0.5 rounded-full text-brand-midnight font-bold animate-pulse">
        NEW
      </span>
    )}
  </Link>
))}
            <Link 
              href="mailto:medoune.c.k.camara.pro@gmail.com"
              className="text-[10px] uppercase tracking-[0.2em] font-bold py-2 px-6 border border-white/10 text-white hover:border-accent-primary hover:text-accent-primary transition-all"
            >
              Discutons
            </Link>
          </div>

          {/* --- BOUTON BURGER (Mobile uniquement) --- */}
          {/* md:hidden = Caché sur PC, visible sur mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-accent-primary transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MENU MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 h-screen bg-brand-midnight z-40 md:hidden flex flex-col pt-32 px-10"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.label}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)} // Ferme le menu quand on clique
                    className="text-5xl font-serif text-white hover:text-accent-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-10 border-t border-white/10 mt-10"
              >
                <Link 
                  href="mailto:medoune.c.k.camara.pro@gmail.com"
                  className="text-accent-primary font-mono uppercase tracking-widest text-xs"
                >
                  → medoune.c.k.camara.pro@gmail.com
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

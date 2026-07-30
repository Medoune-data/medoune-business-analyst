"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Analyses', href: '/blog' },
    { label: 'Projets', href: '/projets' },
    { label: 'À Propos', href: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-24 items-center">

          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tighter text-ink group">
              MEDOUNE <span className="text-ink-soft font-light italic group-hover:text-gold transition-colors">CAMARA</span>
            </Link>
          </div>

          {/* --- MENU DESKTOP (PC) --- */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.2em] text-ink-soft hover:text-gold transition-colors flex items-center"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://calendly.com/medoune-camara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] font-bold py-2 px-6 border border-ink/15 text-ink hover:border-gold hover:text-gold transition-all"
            >
              Réserver un Coaching
            </Link>
          </div>

          {/* --- BOUTON BURGER (Mobile uniquement) --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ink hover:text-gold transition-colors"
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
            className="fixed inset-0 h-screen bg-paper z-40 md:hidden flex flex-col pt-32 px-10"
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
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-serif text-ink hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-10 border-t border-line mt-10"
              >
                <Link
                  href="https://calendly.com/medoune-camara"
                  target="_blank"
                  className="text-gold font-mono uppercase tracking-widest text-xs"
                >
                  → Planifier une session (Calendly)
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

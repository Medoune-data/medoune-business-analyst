"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = [
  "Structurer la donnée.",
  "Piloter la croissance.",
  "Optimiser les revenus.",
  "Digitaliser les flux."
];

export default function WordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change toutes les 3 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[1.2em] relative overflow-hidden inline-block w-full">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="absolute left-0 italic font-light text-gray-500 block w-full"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

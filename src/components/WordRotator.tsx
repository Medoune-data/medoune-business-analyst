"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = [
  "Structurer la donnée.",
  "Piloter la croissance.",
  "Optimiser les revenus.",
  "Digitaliser les flux.",
];

export default function WordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative flex items-center h-[1.35em] overflow-hidden w-full">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="absolute left-0 italic font-medium text-gold block w-full leading-[1.35]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Business.", "Revenus Clients.", "Stratégique.", "Data."];

export default function WordRotatorAbout() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-flex items-center h-[1.3em] overflow-hidden align-bottom min-w-[4ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="italic text-gold font-medium block whitespace-nowrap leading-[1.3]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

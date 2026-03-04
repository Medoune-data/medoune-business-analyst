"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Les mots qui définissent tes différentes casquettes
const words = ["Business.", "RevenusClients.",  "Stratégique.", "Data."];

export default function WordRotatorAbout() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change de mot toutes les 3 secondes
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="italic text-gray-500 font-light block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

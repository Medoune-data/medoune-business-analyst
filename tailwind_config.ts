import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#FAF6EF',
        'paper-deep': '#F1E8D6',
        'ink': '#17223D',
        'ink-soft': '#5C6478',
        'gold': '#B4802C',
        'forest': '#33503E',
        'line': '#E4D7B8',
        // Conservés pour compatibilité avec les pages pas encore migrées
        'brand-midnight': '#020617',
        'accent-primary': '#B4802C',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;

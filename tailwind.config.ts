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
        'brand-midnight': '#0a0a0a',
        'accent-primary': '#3b82f6', // Ton bleu de référence
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;

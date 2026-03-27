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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: {
            DEFAULT: '#0f172a',
            light: '#1e293b',
            dark: '#020617',
          },
          gold: {
            DEFAULT: '#d4af37',
            light: '#f3e5ab',
            dark: '#996515',
          }
        }
      },
    },
  },
  plugins: [],
};
export default config;

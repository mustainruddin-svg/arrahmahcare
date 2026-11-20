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
        brand: {
          sky: "#51C3FF",
          "sky-dark": "#0876AE",
          "sky-deep": "#055B88",
          "sky-soft": "#EAF8FF",
          gold: "#F3AF01",
          "gold-dark": "#C88E00",
          "gold-soft": "#FFF4CF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F8FBFE",
          card: "#FFFFFF",
        },
        text: {
          primary: "#132331",
          muted: "#64748B",
        },
        border: "#DCEAF3",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -2px rgba(8, 118, 174, 0.08)",
        card: "0 2px 14px 0 rgba(19, 35, 49, 0.06)",
        float: "0 12px 32px -4px rgba(8, 118, 174, 0.14)",
      },
      borderRadius: {
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;

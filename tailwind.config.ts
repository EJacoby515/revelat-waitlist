import type { Config } from "tailwindcss";

// Brand tokens mirror the REVÉLAT app (app/lib/tokens.ts) so the waitlist
// reads as the same product: couture-dark base, gold premium accent, live red.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0D0D0D",
        bg2: "#000000",
        surface: "#1A1A1A",
        cell: "#111111",
        border: "#2A2A2A",
        border2: "#333333",
        red: "#FF3B5C",
        redDeep: "#C8253F",
        gold: "#D4AF37",
        goldHi: "#F5C842",
        purple: "#8B2FC9",
        text2: "#CCCCCC",
        text3: "#999999",
        text4: "#777777",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 60px rgba(212,175,55,0.35)",
        cta: "0 12px 32px rgba(255,59,92,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

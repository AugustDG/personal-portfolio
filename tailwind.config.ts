import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        display: ['"VT323"', "monospace"],
      },
      colors: {
        retro: {
          beige: "#F5E6CC",
          brown: "#5D4637",
          orange: "#FF8C42",
          teal: "#2EC4B6",
          magenta: "#FF006E",
          yellow: "#FFD60A",
          purple: "#8338EC",
          cyan: "#00B4D8",
        },
      },
      boxShadow: {
        pixel: "0 0 0 2px #000, 4px 4px 0 0 #000",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease both",
        pop: "pop 0.3s ease both",
        grid: "grid 12s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        pop: {
          "0%": { transform: "scale(.9)" },
          "100%": { transform: "scale(1)" },
        },
        grid: {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "100px 100px, 100px 100px" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".pixel-border": {
          boxShadow: "0 0 0 2px #000, 4px 4px 0 0 #000",
        },
      });
    }),
  ],
};
export default config;

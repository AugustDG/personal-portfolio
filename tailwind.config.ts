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
        // Chakra Petch (condensed techno) & Inter for body, JetBrains for code
        pixel: ["var(--font-heading)", "sans-serif"],
        display: ["var(--font-heading)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      color: {
        // Maintain token names but shift to neon palette
        retro: {
          beige: "#0d0f17",
          brown: "#d9d9e6",
          orange: "#ff7e29",
          teal: "#00fff6",
          magenta: "#ff00ff",
          yellow: "#ffe600",
          // toned down purple (less bright/saturated)
          purple: "#6d44d1",
          cyan: "#00b3ff",
        },
      },
      boxShadow: {
        pixel: "0 0 0 2px #ffffff, 4px 4px 0 0 #ff00ff",
        "neon-magenta": "0 0 3px #ff00ff, 0 0 6px #ff00ff, 0 0 14px #ff00ff",
        "neon-cyan": "0 0 3px #00fff6, 0 0 6px #00fff6, 0 0 14px #00fff6",
        "neon-purple": "0 0 3px #6d44d1, 0 0 6px #6d44d1, 0 0 12px #6d44d1",
        "neon-yellow": "0 0 3px #ffe600, 0 0 6px #ffe600, 0 0 14px #ffe600",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease both",
        pop: "pop 0.3s ease both",
        grid: "grid 30s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        pop: {
          "0%": { transform: "scale(.9)" },
          "100%": { transform: "scale(1)" },
        },
        grid: {
          "0%": { backgroundPosition: "0 0,0 0" },
          "100%": { backgroundPosition: "200px 200px,200px 200px" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".pixel-border": {
          boxShadow: theme("boxShadow.pixel") as string,
          backgroundClip: "padding-box",
        },
        ".glow-magenta": {
          boxShadow: theme("boxShadow.neon-magenta") as string,
        },
        ".glow-cyan": { boxShadow: theme("boxShadow.neon-cyan") as string },
        ".glow-purple": { boxShadow: theme("boxShadow.neon-purple") as string },
        ".glow-yellow": { boxShadow: theme("boxShadow.neon-yellow") as string },
        ".crt-scanlines": { position: "relative" },
        ".crt-scanlines:before": {
          content: '""',
          pointerEvents: "none",
          position: "absolute",
          inset: "0",
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 3px)",
          mixBlendMode: "overlay",
          opacity: "0.25",
        },
      });
    }),
  ],
};

export default config;

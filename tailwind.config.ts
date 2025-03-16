import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        animation: {
          float: "float 6s ease-in-out infinite",
          "float-delayed": "float-delayed 7s ease-in-out infinite 1s",
          "float-slow": "float-slow 8s ease-in-out infinite 2s",
          shimmer: "shimmer 3s ease-in-out infinite",
          "shadow-glow": "shadow-glow 3s ease-in-out infinite",
        },
      },
    },
  },
  plugins: [],
};

export default config;

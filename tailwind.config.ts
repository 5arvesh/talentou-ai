import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,js,jsx,css}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        dmSans: ["DM Sans", "system-ui", "sans-serif"],
        sora: ["Sora", "DM Sans", "sans-serif"],
      },
      screens: {
        "res-1200": { raw: "(min-width: 1200px) and (max-width: 1400px)" },
        "res-1400": { raw: "(min-width: 1400px) and (max-width: 1600px)" },
        "res-1600": { raw: "(min-width: 1600px) and (max-width: 1850px)" },
        // Named cumulative breakpoint (plain string, not a ranged object) — the res-1200/1400/1600
        // triplet above are bounded ranges, not "and up" breakpoints, and Tailwind's arbitrary
        // min-[]/max-[] variants are disabled project-wide once any object-form screen exists.
        // Use this for real "collapses below X, expands above X" responsive layouts.
        "desktop-lg": "1200px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        "surface-inverse": {
          DEFAULT: "hsl(var(--surface-inverse))",
          foreground: "hsl(var(--surface-inverse-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        talentou: {
          primary: "hsl(var(--talentou-primary))",
          "primary-light": "hsl(var(--talentou-primary-light))",
          accent: "hsl(var(--talentou-accent))",
          "accent-light": "hsl(var(--talentou-accent-light))",
          // Named brand tokens — use these instead of raw hex
          purple: "#7800D3",
          green: "#4EAD3B",
          blue: "#0A92FE",
          // Action gradient endpoints (buttons, send icons, Next CTAs)
          "action-from": "#503afd",
          "action-to": "#3857fd",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        brand: {
          50: "#f3e8ff",
          100: "#e0c7ff",
          200: "#c59dff",
          300: "#a86eff",
          400: "#8a3fff",
          500: "#7E00FC",
          600: "#6a00d4",
          700: "#5600ad",
          800: "#410086",
          900: "#2d005f",
        },
        piqual: {
          orange: "#ff6a35",
          green: "#009470",
          secondary: "#7800D3",
          secondary_hover: "#5D00A4",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        input: "10px",
        btn: "10px",
        card: "16px",
        chip: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px rgb(0 0 0/.06), 0 1px 2px -1px rgb(0 0 0/.06)",
        raised: "0 4px 12px -2px rgb(0 0 0/.08)",
        pop: "0 12px 28px -8px rgb(0 0 0/.14)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "focus-pulse": {
          "0%, 100%": { borderColor: "rgba(192,132,252,0.2)" },
          "50%": { borderColor: "rgba(192,132,252,0.5)" },
        },
        "plan-loading": {
          "0%": { transform: "translateX(-100%)", width: "40%" },
          "50%": { transform: "translateX(60%)", width: "55%" },
          "100%": { transform: "translateX(220%)", width: "40%" },
        },
        "review-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "50%": { boxShadow: "0 0 0 6px hsl(var(--primary) / 0)" },
        },
        "intro-icon-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        "coachmark-dash-draw": {
          "0%": { strokeDashoffset: "var(--dash-total, 300)" },
          "100%": { strokeDashoffset: "0" },
        },
        "coachmark-arrow-in": {
          "0%": { opacity: "0", transform: "translateY(var(--arrow-from, -4px))" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "exit-check-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.55)" },
          "100%": { boxShadow: "0 0 0 18px rgba(34,197,94,0)" },
        },
        "credit-ring-pulse-settle": {
          "0%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.35)" },
          "100%": { boxShadow: "0 0 0 10px rgba(34,197,94,0)" },
        },
        "credit-ring-pulse-danger": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(239,68,68,0.35)" },
          "50%": { boxShadow: "0 0 0 8px rgba(239,68,68,0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "focus-pulse": "focus-pulse 1s ease-in-out 3",
        "plan-loading": "plan-loading 1.4s ease-in-out infinite",
        "review-pulse": "review-pulse 2.5s ease-in-out infinite",
        "intro-icon-pulse": "intro-icon-pulse 2s ease-in-out infinite",
        "coachmark-dash-draw": "coachmark-dash-draw 400ms ease-out forwards",
        "coachmark-arrow-in": "coachmark-arrow-in 150ms ease-out forwards",
        "exit-check-pulse": "exit-check-pulse 600ms ease-out 1",
        "credit-ring-pulse-settle": "credit-ring-pulse-settle 900ms ease-out 1",
        "credit-ring-pulse-danger": "credit-ring-pulse-danger 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate, scrollbarHide],
} satisfies Config;

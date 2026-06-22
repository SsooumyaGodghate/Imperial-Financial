import type { Config } from "tailwindcss";

export default {
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
        primary: {
          DEFAULT: "#0056D6",
          dark: "#084CB2",
          light: "#EAF2FF",
        },
        deep: {
          DEFAULT: "#0B3E91",
          dark: "#06265B",
          light: "#E1EDFF",
        },
        accent: {
          DEFAULT: "#3DA9FC",
          light: "#E5F4FF",
        },
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#B28F24",
          light: "#FAF4DC",
        },
        slatebg: {
          DEFAULT: "#F8FAFC",
        }
      },
      borderRadius: {
        'premium-sm': '12px',
        'premium': '14px',
        'premium-lg': '16px',
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(11, 62, 145, 0.05), 0 2px 8px -1px rgba(0, 86, 214, 0.03)',
        'premium-hover': '0 12px 30px -4px rgba(11, 62, 145, 0.1), 0 4px 12px -2px rgba(0, 86, 214, 0.05)',
        'glass': '0 8px 32px 0 rgba(11, 62, 145, 0.06)',
      }
    },
  },
  plugins: [],
} satisfies Config;

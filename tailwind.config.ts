import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        header: "#312f2d",
        footer: "#312f2d",
        brand: {
          DEFAULT: "#f5f5dc",
          dark: "#c2c2a0",
          light: "#ffffff",
        },
      },
      animation: {
        heroVideoCoverFadeOutMobile:
          "heroVideoCoverFadeMobile 37s ease-in-out forwards",
        heroVideoCoverFadeOutDesktop:
          "heroVideoCoverFadeOutDesktop 37s ease-in-out forwards",
      },

      keyframes: {
        heroVideoCoverFadeMobile: {
          "0%": { opacity: "1" },
          "18%": { opacity: "1" },
          "20%": { opacity: "0" },
          "98%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        heroVideoCoverFadeOutDesktop: {
          "0%": { opacity: "1" },
          "6%": { opacity: "1" },
          "7%": { opacity: "0" },
          "98%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [typography()],
} satisfies Config;

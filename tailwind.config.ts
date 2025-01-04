import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        lora: ["var(--font-lora)", ...defaultTheme.fontFamily.serif],
        "space-grotesk": ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
} satisfies Config

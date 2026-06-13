/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0f",
        secondary: "#111118",
        accent: "#2dd4bf",
        card: "#16161f",
        border: "#1e1e2e",
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Playfair Display", "serif"]
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 3s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease forwards",
        countUp: "countUp 2s ease forwards"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
}

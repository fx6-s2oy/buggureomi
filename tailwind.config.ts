import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        sheet: "40px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: "#667EF5",
        secondary: "#936FE9",
        gray: {
          900: "#333333",
          700: "#666666",
          600: "#6E7F8D",
          500: "#A4A4A4",
          400: "#B5BFC6",
          300: "#CCCCCC",
          200: "#E4EBF1",
          100: "#EFF2F9",
          50: "#F0F0F0",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        h2: [
          "24px",
          {
            lineHeight: "1.4",
            letterSpacing: "0.3px",
            fontWeight: "700",
          },
        ],
        h3: [
          "20px",
          {
            lineHeight: "1.4",
            letterSpacing: "0.3px",
            fontWeight: "600",
          },
        ],
        h5: [
          "17px",
          {
            lineHeight: "1.4",
            letterSpacing: "0.3px",
            fontWeight: "500",
          },
        ],
        h6: [
          "15px",
          {
            lineHeight: "1.4",
            letterSpacing: "0.3px",
            fontWeight: "500",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "1.4",
            letterSpacing: "0.3px",
            fontWeight: "400",
          },
        ],
      },
      boxShadow: {
        "custom-inner": "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "mascot-mask-loading": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "mascot-mask-loading": "mascot-mask-loading 1.5s infinite ease-in-out",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        "nanum-dahaengce": ["NanumDaHaengCe", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A",
        secondary: "#5C5C5C",
        muted: "#9A9A9A",
        accent: {
          DEFAULT: "#1B4FD8",
          dark: "#1640B0",
        },
        border: "#E4E4E4",
        surface: {
          DEFAULT: "#FAFAFA",
          alt: "#F7F7F8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

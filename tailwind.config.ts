import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#EA7F70",
        teal: "#148089",
        textTeal: "#1a6d74",
      },
      height: {
        vph: "calc(100dvh - 118px)",
      },
    },
  },
  plugins: [],
};

export default config;


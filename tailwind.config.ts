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
      spacing: {
        "0.5": "0.217vh",
        "1": "0.435vh",
        "1.5": "0.652vh",
        "2": "0.870vh",
        "2.5": "1.087vh",
        "3": "1.304vh",
        "3.5": "1.522vh",
        "4": "1.739vh",
        "5": "2.174vh",
        "6": "2.609vh",
        "8": "3.478vh",
        "10": "4.348vh",
        "12": "5.217vh",
        "14": "6.087vh",
        "16": "6.957vh",
        "20": "8.696vh",
        "24": "10.435vh",
      },
      width: {
        "32": "14.565vh",
        "36": "15.652vh",
        "40": "17.391vh",
        "48": "21.739vh",
        "56": "26.087vh",
        "64": "30.435vh",
        "72": "34.783vh",
      },
    },
  },
  plugins: [],
};

export default config;


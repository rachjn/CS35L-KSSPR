/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      greycliff: ["greycliff-cf", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "cap-blue": "#4994EA",
        "light-beige": "F8F2E7",
        "dark-brown": "#47302B",
        "light-brown": "#B4A09C",
        "lighter-brown": "#D7C5C1",
        "my-blue": "#82C7E9",
        "my-pink": "#FDAAAA",
      },
    },
  },
  plugins: [],
};

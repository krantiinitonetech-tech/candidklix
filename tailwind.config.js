/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#FF6B81",
        cream: "#FFF7F5",
        body: "#374151",
        heading: "#0F1724",
        card: "#FAFAFB",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        figmaLg: "0 12px 40px rgba(2,6,23,0.08)",
        figmaSoft: "0 8px 24px rgba(2,6,23,0.06)",
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

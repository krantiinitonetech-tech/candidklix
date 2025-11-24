/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // include src (app router), components and any pages
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // optional: small color tweak to match wireframe style
      colors: {
        'brand-cream': '#F8F6F1',
      }
    },
  },
  plugins: [],
};

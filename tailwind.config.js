/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#111827",

          "secondary": "#374151",

          "accent": "#6b7280",

          "neutral": "#f3f4f6",

          "base-100": "#fffff",

          "info": "#111827",

          "success": "#a3e635",

          "warning": "#f87171",

          "error": "#facc15",
        },
        dark: {

          "primary": "#f3f4f6",

          "secondary": "#d1d5db",

          "accent": "#6b7280",

          "neutral": "#f3f4f6",

          "base-100": "#000000",

          "info": "#f3f4f6",

          "success": "#a3e635",

          "warning": "#f87171",

          "error": "#facc15",
        },
      },
    ],
  },
};

/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

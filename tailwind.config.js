/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        2: '2', // Definindo a quantidade de linhas que o line-clamp vai cortar
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

export default {
  plugins: {
    "@tailwindcss/postcss": {
      base: process.cwd() + '/../..', // Expands scanning to monorepo root
    },
  },
};
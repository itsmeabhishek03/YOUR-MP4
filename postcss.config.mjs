// postcss.config.mjs
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // runs the Tailwind v4 engine
    autoprefixer: {}, // adds necessary vendor prefixes
  },
};

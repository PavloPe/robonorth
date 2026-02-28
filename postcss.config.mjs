/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "@csstools/postcss-oklab-function": { preserve: true },
    "./postcss-strip-oklch-supports.cjs": {},
    "./postcss-unwrap-layers.js": {},
  },
};

export default config;

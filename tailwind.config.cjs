/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  darkMode: "class",
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  extend: {
    width: {
      99: '99px'
    },
    height: {},
    borderRadius: {},
    padding: {},
    margin: {}
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/line-clamp"),
  ]
};

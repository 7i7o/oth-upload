/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],

  printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    endOfLine: 'auto',
    bracketSpacing: true,
    bracketSameLine: true,
};

module.exports = config;

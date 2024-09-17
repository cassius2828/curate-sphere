module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "cypress"], // Combine plugins here
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": 0,
  },

  overrides: [
    {
      files: ["*.cy.js"],
      env: {
        "cypress/globals": true, // Define Cypress global variables for these files
      },
      rules: {
        "no-undef": "off", // Disable the no-undef rule in Cypress files
      },
    },
  ],
};
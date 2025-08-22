import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import erasableSyntaxOnly from "eslint-plugin-erasable-syntax-only";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importSort from "eslint-plugin-simple-import-sort";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  erasableSyntaxOnly.configs.recommended,
  reactRefresh.configs.vite,
  eslintConfigPrettier.configs.recommended,
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
      "simple-import-sort": importSort,
      "erasable-syntax-only": erasableSyntaxOnly,
    },

    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

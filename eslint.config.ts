import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...tseslint.configs.recommended,
  {
    // files: ["**/*.ts"],
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      // ESLint core rules
      "prefer-const": "error",
      "no-console": "warn",

      // ESLint Stylistic rules
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
    },
  },
]);

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/rules-of-hooks": "error",        // Keep this one strict
      "react-hooks/exhaustive-deps": "warn"
    }
  },
  {
    files: ["src/lib/**", "src/app/api/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off"  // Turn off for libs and APIs
    }
  }
];

export default eslintConfig;

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  env: {
    es6: true,
    node: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        arrowParens: "always",
        semi: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-arrow-callback": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};

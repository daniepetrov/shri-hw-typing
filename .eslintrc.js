module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: [
    "@typescript-eslint",
    "react-hooks"
  ],
  extends: ['eslint:recommended', 'plugin:react/recommended', "plugin:@typescript-eslint/recommended", 'prettier'],
  settings: {
    react: {
      pragma: "React",
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    'react/prop-types': 'off',
  },
}

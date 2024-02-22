module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 0,
    'react/jsx-pascal-case': 'warn',
    'react/function-component-definition': [2, { namedComponents: ['arrow-function'] }],
    'react/react-in-jsx-scope': 'off',
    'no-var': 'error',
    'no-unused-vars': ['off'],
    'no-console': ['off'],
    'no-extra-semi': 'error',
    'arrow-parens': ['warn', 'as-needed'],
    'import/prefer-default-export': ['off'],
    'no-debugger': 'off',
  },
};
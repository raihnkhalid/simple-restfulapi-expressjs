import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      'semi': ['error', 'always'],
      'semi-spacing': ['error', { 'before': false, 'after': true }],
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',

      // 'indent': ['error', 2],
      // 'quotes': ['error', 'single'],
      // 'comma-dangle': ['error', 'always-multiline'],
      // 'no-trailing-spaces': 'error',

      // Aturan untuk variabel
      'no-unused-vars': ['warn', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      }],
      'no-var': 'error',
      'prefer-const': 'error',

      // Aturan untuk Express.js
      // 'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],

      // Aturan untuk async/await
      'require-await': 'error',
      'no-return-await': 'error',

      // Aturan untuk object
      'object-curly-spacing': ['error', 'always'],
      'key-spacing': ['error', {
        'beforeColon': false,
        'afterColon': true,
      }],

      // Aturan untuk function
      'func-style': ['error', 'expression'],
      'arrow-spacing': ['error', {
        'before': true,
        'after': true,
      }],

      // Aturan untuk error handling
      'no-throw-literal': 'error',
      'handle-callback-err': 'error',
    },
  },
];
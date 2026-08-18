const cypressPlugin = require('eslint-plugin-cypress');

module.exports = [
  {
    ignores: ['cypress/e2e/2-advanced-examples/**', 'node_modules/**'],
  },
  cypressPlugin.configs.recommended,
  {
    rules: {
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'cypress/no-unnecessary-waiting': 'warn',
    },
  },
];
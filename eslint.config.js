import eslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': eslint,
      'prettier': prettierPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    rules: {
      ...eslint.configs.recommended.rules,
      'prettier/prettier': 'error',
      // Add any custom rules here
    }
  },
  prettierConfig
];

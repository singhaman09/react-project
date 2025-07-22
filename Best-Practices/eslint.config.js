import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import airbnb from 'eslint-config-airbnb';

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: true,
        document: true,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,

      // Custom rules
      'no-unused-vars': 'warn',
      eqeqeq: 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      camelcase: 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/prefer-default-export': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

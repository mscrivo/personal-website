import js from '@eslint/js'
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHookPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import unicornPlugin from 'eslint-plugin-unicorn'
import globals from 'globals'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHookPlugin.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx}'],
    settings: {
      react: { version: '19' },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    plugins: {
      'eslint-comments': eslintCommentsPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-refresh': reactRefreshPlugin,
      'react-hooks': reactHookPlugin,
      unicorn: unicornPlugin,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'eslint-comments/disable-enable-pair': ['warn', { allowWholeFile: true }],
      'eslint-comments/no-unused-disable': 'warn',
      'import/no-duplicates': 'error',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['\\?format=webp$'],
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'react-refresh/only-export-components': 'warn',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-string-replace-all': 'warn',
      'unicorn/prefer-ternary': 'off',
    },
  },
  {
    files: ['vite.config.js'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    // Vite asset imports carry query strings (?format=webp&w=...) that the
    // node resolver cannot validate; the build fails loudly on a real typo.
    files: ['src/assets/index.js'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    files: ['tests/**/*.js', 'playwright.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'import/no-unresolved': 'off',
    },
  },
]

import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import reactHookPlugin from 'eslint-plugin-react-hooks'
import reactThreePlugin from '@react-three/eslint-plugin'
import globals from 'globals'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHookPlugin.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx}'],
    settings: { react: { version: '19' } },
    plugins: {
      react: reactPlugin,
      'react-refresh': reactRefreshPlugin,
      'react-hooks': reactHookPlugin,
      '@react-three': reactThreePlugin,
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
      'react-refresh/only-export-components': 'warn',
    },
  },
]

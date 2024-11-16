import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
];

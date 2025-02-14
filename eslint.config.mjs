import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginNode from 'eslint-plugin-node';
import pluginMongo from 'eslint-plugin-mongodb'; // ✅ Add MongoDB plugin

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module', // ❗ Change to 'module' if you're using ES modules
      globals: {
        ...globals.node, // Node.js globals
        ...globals.es2021, // ECMAScript 2021 globals
      },
      parserOptions: {
        ecmaVersion: 12, // ECMAScript version (2021)
      },
    },
    plugins: {
      node: pluginNode,
      mongodb: pluginMongo, // ✅ Add MongoDB plugin
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-console': 'off',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^(req|res|next)$',
        },
      ],
      // ✅ MongoDB-specific best practices
      'mongodb/no-unused-result': 'warn', // Warn if MongoDB query results are not used
      'mongodb/no-callback-in-promise': 'error', // Prevent using callbacks inside promises
      'mongodb/no-floating-promises': 'warn', // Warn on floating MongoDB promises
    },
  },
];

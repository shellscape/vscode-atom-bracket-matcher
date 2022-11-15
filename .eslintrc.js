module.exports = {
  extends: ["shellscape/typescript"],
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': ['error', { ignore: ['vscode'] }],
    'no-continue': 'off',
    'no-prototype-builtins': 'off',
    'no-useless-escape': 'off',
    'sort-keys': 'off'
  }
};

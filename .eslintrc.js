module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    // 'airbnb-typescript',
    'prettier',
    // 'prettier/@typescript-eslint',
    // 'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  // plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  parserOptions: {
    project: ['tsconfig.json'],
  },
};

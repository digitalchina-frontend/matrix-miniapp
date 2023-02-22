const miniAppPaths = ['apps/**/*.{js}'];

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: miniAppPaths,
      ...require('./.eslintrc.miniapp.js'),
    },
  ],
};

const miniAppPaths = ['apps/**/*.{js}'];

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: miniAppPaths,
      ...require('./.eslintrc.miniapp.js'),
    },
  ],
};

const reactPaths = ['domains/finance/finance-admin-react/src/**/*.{js,ts,jsx,tsx}'];
const vuePaths = ['domains/finance/finance-admin-vue3/src/**/*.{js,ts,vue}'];
const miniAppPaths = ['domains/finance/finance-wechat-app/src/**/*.{js}'];

module.exports = {
  overrides: [
    {
      files: reactPaths,
      ...require('./.eslintrc.react.js'),
    },
    {
      files: vuePaths,
      ...require('./.eslintrc.vue.js'),
    },
    {
      files: miniAppPaths,
      ...require('./.eslintrc.miniapp.js'),
    },
  ],
};

// components/fixedBtn/fixedBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    link: {
      type: String,
      value: 'https://digitalchina-frontend.github.io/',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toSourceCode() {
      wx.navigateTo({
        url: `/pages/sourceCode/index?link=${this.data.link}`,
      });
    },
  },
});

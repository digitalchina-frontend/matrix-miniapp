// subSource/pages/sourceCode/sourceCode.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    link: '',
  },

  onLoad({ link }) {
    this.setData({
      link,
    });
  },

  clip() {
    wx.setClipboardData({
      data: this.data.link,
    });
  },
});

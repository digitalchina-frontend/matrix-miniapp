// pages/index/components/home/index.js
Component({
  properties: {
    industries: {
      type: Array,
      value: [],
    },
  },
  data: {
    // 自定义导航栏用，状态栏高度，单位 rpx
    statusBarHeight: 0,
    // 接收用户输入的行业关键字
    searchBarText: '',
  },
  lifetimes: {
    attached: function () {
      wx.getSystemInfo({
        success: (res) => {
          // wx API 返回的 pixelRatio 不准确，自己算
          const pixelRatio = 750 / res.windowWidth;
          // wx API 返回的 statusBarHeight 单位为 px，转 rpx
          const statusBarHeight = res.statusBarHeight * pixelRatio;
          this.setData({
            statusBarHeight,
          });
        },
      });
    },
  },
  methods: {
    search: function (event) {
      this.setData({
        searchBarText: event.detail,
      });
    },
  },
});

// pages/custom-navigationbar/components/pageLayout/index.js
Component({
  data: {
    statusBarHeight: 0,
  },
  lifetimes: {
    attached: function () {
      this.getStatusBarHeight();
    },
  },
  methods: {
    getStatusBarHeight: function () {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            statusBarHeight: res.statusBarHeight,
          });
        },
      });
    },
  },
});

// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('云功能不可用');
    } else {
      wx.cloud.init();
    }
  },
  globalData: {},
});

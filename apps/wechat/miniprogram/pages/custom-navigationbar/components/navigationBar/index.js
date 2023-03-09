// domains/tour/pages/mw001/components/navigationBar/index.js
Component({
  data: {
    currentPages: [],
  },
  lifetimes: {
    attached: function () {
      this.getCurrentPages();
    },
  },
  methods: {
    getCurrentPages: function () {
      const currentPages = getCurrentPages();
      this.setData({
        currentPages,
      });
    },
    back: function () {
      wx.navigateBack();
    },
  },
});

// pages/index/components/search-bar/index.js
Component({
  properties: {
    value: {
      type: String,
      value: '',
    },
  },
  data: {
    focus: false,
  },
  methods: {
    tap() {
      this.setData({
        focus: true,
      });
    },
    confirm(event) {
      this.triggerEvent('search', event.detail.value);
    },
  },
});

// components/scenicSportCard/index.js
Component({
  properties: {
    item: {
      type: Object,
    },
  },
  data: {
    imgLoading: true,
  },
  observers: {
    item: function (item) {
      if (this.imgUrl && this.imgUrl != item.img) {
        this.imgUrl = item.img;
        if (!this.data.imgLoading) {
          this.setData({
            imgLoading: true,
          });
        }
      }
    },
  },
  attached() {
    this.imgUrl = this.data.item.img;
  },
  methods: {
    imgLoad() {
      this.setData({
        imgLoading: false,
      });
    },
  },
});

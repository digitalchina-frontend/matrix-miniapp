// components/swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [{
      url: 'https://picsum.photos/200?1',
      tit: '活动1',
      price: 43
    },
    {
      url: 'https://picsum.photos/200?2',
      tit: '活动2',
      price: 45
    },
    {
      url: 'https://picsum.photos/200?3',
      tit: '活动3',
      price: 89
    },
    {
      url: 'https://picsum.photos/200?4',
      tit: '活动4',
      price: 56
    },
    {
      url: 'https://picsum.photos/200?5',
      tit: '活动5',
      price: 76
    },

  ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    },
    setContainerHeight(e) {
      //图片的原始宽度
      var imgWidth = e.detail.width;
      //图片的原始高度
      var imgHeight = e.detail.height;
      //同步获取设备宽度
      var sysInfo = wx.getSystemInfoSync();
      //获取屏幕的宽度
      var screenWidth = sysInfo.screenWidth;
      //获取屏幕和原图的比例
      var scale = screenWidth / imgWidth;
      //设置容器的高度
      this.setData({
        height: imgHeight * scale
      })
    }
  }
})
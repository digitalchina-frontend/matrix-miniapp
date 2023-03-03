// pages/index/components/industry-item/index.js
Component({
  properties: {
    industry: {
      type: Object,
    },
  },
  data: {
    cardStyles: {
      教育行业: {
        modifier: 'blue',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/notification.png?sign=2a78e7c9c51df66ef31482d4ed83d3e5&t=1677735949',
      },
      旅游行业: {
        modifier: 'yellow',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/more.png?sign=339447698b4b67e0b3101bdcc1652873&t=1677736303',
      },
      健康医疗行业: {
        modifier: 'green',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/email.png?sign=76863f8164dc6d8dd7665e567bd7b8d9&t=1677736316',
      },
      新闻行业: {
        modifier: 'red',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/close.png?sign=69a8e6405f29d17e330995765798d653&t=1677736327',
      },
      体育行业: {
        modifier: 'green',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/airplane.png?sign=61795c0e565f3fb1a002bc53ecdf7465&t=1677736339',
      },
      生活行业: {
        modifier: 'blue',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/label.png?sign=f0db6a3fedd2e86c6c2a1691b311e21f&t=1677736358',
      },
      金融行业: {
        modifier: 'yellow',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/radar.png?sign=57efb2014923ceee6d826ed5ae9aec97&t=1677736372',
      },
      跨境电商行业: {
        modifier: 'red',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/shopping.png?sign=630d8ec2fae66f71926ddd6de48d06ac&t=1677736382',
      },
      快递行业: {
        modifier: 'green',
        iconUrl:
          'https://636c-cloud1-7guwwrcid3040e0c-1316692614.tcb.qcloud.la/icons/chat.png?sign=4e9f4bc99f034e2a14ff277ea705b43c&t=1677736395',
      },
    },
  },
  methods: {
    tap() {
      wx.navigateTo({
        url: this.data.industry.link,
      });
    },
  },
});

// components/filter/index.js
Component({
  data: {
    filters: [
      {
        key: 'type',
        options: [
          '全部类型',
          '自然风光',
          '名胜古迹',
          '文博场馆',
          '游船演出',
          '亲子乐园',
          '动植物园',
          '体育赛事',
          '其他',
        ],
      },
      {
        key: 'area',
        options: ['全部地区', '江岸区', '江汉区', '硚口区', '汉阳区', '武昌区'],
      },
      {
        key: 'sort',
        options: ['智能排序', '距离优先', '价格优先'],
      },
    ],
    activeKey: '',
    params: {
      type: '全部类型',
      area: '全部地区',
      sort: '智能排序',
    },
  },
  methods: {
    openSelect(e) {
      if (e.currentTarget.dataset.key === this.data.activeKey) {
        this.closeSelect();
      } else {
        this.setData({
          activeKey: e.currentTarget.dataset.key,
        });
      }
    },
    closeSelect() {
      this.setData({
        activeKey: '',
      });
    },
    selectItem(e) {
      const params = {
        ...this.data.params,
        [e.currentTarget.dataset.key]: e.currentTarget.dataset.item,
      };
      this.setData({
        params,
        activeKey: '',
      });
      this.triggerEvent('getList', params);
    },
  },
});

// components/filter/index.js
Component({
  data: {
    filters: [
      {
        key: 'area',
        options: ['全部地区', '江岸区', '江汉区', '硚口区', '汉阳区', '武昌区'],
      },
      {
        key: 'sort',
        options: ['智能排序', '距离优先', '价格优先'],
      },
      {
        key: 'more',
        filters: [
          {
            key: 'stars',
            text: '景区星级',
            options: ['5A', '4A', '其他'],
          },
          {
            key: 'isFree',
            text: '是否免费',
            options: ['免费'],
          },
        ],
      },
    ],
    activeKey: '',
    params: {
      more: '筛选',
      area: '全部地区',
      sort: '智能排序',
    },
    moreSelect: {
      stars: '',
      isFree: '',
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
        moreSelect: this.data.params,
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
    radioChange(e) {
      const moreSelect = {
        ...this.data.moreSelect,
        [e.currentTarget.dataset.key]: e.detail.value,
      };
      this.setData({
        moreSelect,
      });
    },
    formReset() {
      this.setData({
        moreSelect: {},
      });
    },
    formSubmit(e) {
      const params = {
        ...this.data.params,
        ...e.detail.value,
      };
      this.setData({
        params,
        activeKey: '',
      });
      this.triggerEvent('getList', params);
    },
  },
});

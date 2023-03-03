// pages/scenicSpotList/index.js
Page({
  data: {
    list: [],
    done: false,
    top: 0,
    triggered: false,
  },
  page: 1,
  onReady() {
    this.getList();
  },
  getList() {
    const _this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.cloud
      .callFunction({
        // 云函数名称
        name: 'get_tourist_list',
        // 传给云函数的参数
        data: {
          startIndex: (this.page - 1) * 20 + 1,
        },
      })
      .then(function (res) {
        const list = res.result.list;
        // column-count布局会使数据先从上到下排布，滚动刷新会打乱原有顺序
        // 重置数据顺序以实现左右顺序分布 start
        let temp = [];
        let temp1 = [];
        for (let i = 0; i < list.length; i++) {
          i % 2 == 0 ? temp.push(list[i]) : temp1.push(list[i]);
        }
        const newList = temp.concat(temp1);
        const dataList = _this.data.list;
        dataList.splice(_this.data.list.length / 2, 0, ...newList.slice(0, 10));
        // 重置数据顺序以实现左右顺序分布 end
        _this.setData({
          list: _this.page === 1 ? newList : dataList.concat(newList.slice(10)),
          triggered: false,
        });
        /*
      如果是第一页，滚动到顶部
      */
        if (_this.page === 1) {
          _this.setData({
            top: 0,
          });
        }
        _this.page++;
        /*
      模拟已加载全部数据
      */
        if (_this.page === 4) {
          _this.setData({
            done: true,
          });
        }
        if (_this._freshing) {
          _this._freshing = false;
        }
        wx.hideLoading();
      });
  },
  scrolltolower() {
    if (!this.data.done) {
      this.getList();
    }
  },
  refresh() {
    this.page = 1;
    this.setData({
      done: false,
    });
    this.getList();
  },
  onRefresh(e) {
    if (this._freshing) return;
    this._freshing = true;
    this.refresh();
  },
});

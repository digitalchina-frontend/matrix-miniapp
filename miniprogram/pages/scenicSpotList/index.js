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
    this.getList()
  },
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      //获取假数据
      const list = this.createFakeData((this.page - 1) * 20 + 1)
      this.setData({
        list: this.page === 1 ? list : this.data.list.concat(list),
        triggered: false
      })
      /*
      如果是第一页，滚动到顶部
      */
      if (this.page === 1) {
        this.setData({
          top: 0
        })
      }
      this.page++
      /*
      模拟已加载全部数据
      */
      if (this.page === 4) {
        this.setData({
          done: true
        })
      }
      if (this._freshing) {
        this._freshing = false
      }
      wx.hideLoading()
    }, 500);
  },
  createFakeData(startIndex) {
    const fakeData = []
    for (let index = 0; index < 20; index++) {
      fakeData.push({
        name: '景区' + (startIndex + index),
        img: 'https://picsum.photos/200?' + new Date().getTime() + '' + index,
        desc: '这是一个景区' + (startIndex + index),
        tags: ['公园', '打卡圣地'],
        price: Math.floor(Math.random() * 100),
        distance: (Math.random() * 100).toFixed(2)
      })
    }
    return fakeData.sort((a, b) => {
      return Math.random() > 0.5 ? -1 : 1;
    })
  },
  scrolltolower() {
    if (!this.data.done) {
      this.getList()
    }
  },
  refresh() {
    this.page = 1
    this.setData({
      done: false
    })
    this.getList()
  },
  onRefresh(e) {
    if (this._freshing) return
    this._freshing = true
    this.refresh()
  }
})
// pages/scenicSpotList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    done: false,
    top: 0,
    triggered: false,
  },
  page: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    this.getList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

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
      if (this._freshing) {
        this._freshing = false
      }
      console.log(this.data.triggered);
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
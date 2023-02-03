// pages/scenicSpotList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    list2: [],
    done: false
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


  onPullDownRefresh() {
    this.page=1
    this.setData({
      list : []
    })
    this.getList()
    console.log(111)
    wx.stopPullDownRefresh()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getList() {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        const list = this.createFakeData((this.page - 1) * 20 + 1)
        resolve(list)
        this.setData({
          list: this.data.list.concat(list),
          list2: this.data.list.concat(list)
        })
        this.page++
        if (this.page === 4) {
          this.setData({
            done: true
          })
        }
        wx.hideLoading()
      }, 500);
    })
  },
  createFakeData(startIndex) {
    const fakeData = []
    for (let index = 0; index < 20; index++) {
      fakeData.push({
        name: '景区' + (startIndex + index),
        img: 'https://picsum.photos/200?' + index,
        desc: '这是一个景区',
        tags: ['公园', '打卡圣地'],
        price: Math.floor(Math.random() * 100),
        distance: (Math.random() * 100).toFixed(2)
      })
    }
    return fakeData
  },
  scrolltolower() {
    if (!this.data.done) {
      this.getList()
    }
  },
  refresh() {
    this.setData({
      page: 1
    })
    this.getList()
  },
  search(e) {
  
    if (!e.detail.value) {
      this.setData({
        list: this.data.list2
      })
    }

    const arr = this.data.list.filter(item => {
      for (let i = 0; i < item.name.length; i++) {
        if (e.detail.value.indexOf(item.name[i]) > -1) {
          return true
        }
      }
    })
    this.setData({
      list: arr.length > 0 ? arr : this.data.list
    })
  },

})
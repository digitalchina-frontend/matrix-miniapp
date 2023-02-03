// pages/scenicSpotList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    done:false
  },
  page:1,
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
  getList(){
    return new Promise((resolve,reject)=>{
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        const list=this.createFakeData((this.page-1)*20+1)
        resolve(list)
        this.setData({
          list:this.data.list.concat(list)
        })
        this.page++
        if(this.page===4){
          this.setData({done:true})
        }
        wx.hideLoading()
      }, 500);
    })
  },
  createFakeData(startIndex){
    const fakeData=[]
    for (let index = 0; index < 20; index++) {
      fakeData.push({
        name:'景区'+(startIndex+index),
        img:'https://picsum.photos/200?'+index,
        desc:'这是一个景区',
        tags:['公园','打卡圣地'],
        price:Math.floor(Math.random()*100),
        distance:(Math.random()*100).toFixed(2)
      })
    }
    return fakeData
  },
  scrolltolower(){
    if(!this.data.done){
      console.log(11);
      this.getList()
    }
  },
  refresh(){
    this.setData({page:1})
    this.getList()
  }
})
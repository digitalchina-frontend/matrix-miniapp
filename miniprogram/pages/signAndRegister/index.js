// miniprogram/pages/welcome/welcome.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenButton: false,
    userInfo: {},
    flag: false,
    isCanUse: false,
    code: ''
  },
  login: function () {
    const _this = this
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: res => {
        _this.setData({
          userInfo: res.userInfo,
          flag: true,
          isCanUse:true
        })
      },
      fail: res => {
        console.log(res)
        //拒绝授权
        wx.showToast({
          title: '您拒绝了请求,不能正常使用小程序',
          icon: 'error',
          duration: 2000
        });
        return;
      }

    }, )
  },
  getCode: function (e) {
    const _this = this
    wx.login({
      success(res) {
        _this.setData({
          code: res.code,
        })
      },
      fail(e) {
        wx.showToast({
          title: '网络异常',
          duration: 2000
        })
        return
      }
    })

  },
  getPhoneNumber: function (e) {
    console.log(e, '11111111')
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      console.log(e, '11111111')
    }
  },

  /**
   * 注册用户信息
   */
  register: function (e) {
    let _this = this
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (this.isCanUse) {
      console.log('已经授权登录过了，请直接跳转')
    } else {
      console.log('未授权登录，请点击登录')
    }
    this.getCode()
  }
})
// indexSecond/pages/helpTake/helpTake.js
var app = getApp();
var baseUrl = getApp().baseUrl;
var ctx;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_disabled: true,
    Number: true,
    text: ""
  },
  // 获取验证码数值
  CompleNum(e) {

    var Number = this.data.text //获取另一个函数中的验证码数据
    if (e.detail.value.toUpperCase() !== Number && e.detail.cursor == 4) {
      wx.showToast({
        title: '验证码错误',
        icon: "error",
        duration: 2000
      })
    }
  },

  /**确定按钮 */
  submit(e) {


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.drawPic(that);
  },
  change: function () {
    var that = this;
    this.drawPic(that);
  },
  mobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  /**生成一个随机色**/
  randomColor(min, max) {
    let r = this.randomNum(min, max);
    let g = this.randomNum(min, max);
    let b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  },

  /**绘制验证码图片**/
  drawPic(that) {
    ctx = wx.createCanvasContext('canvas');
    /**绘制背景色**/
    ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
    ctx.fillRect(0, 0, 90, 28)
    /**绘制文字**/
    var arr;
    var text = '';
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    for (var i = 0; i < 4; i++) {
      var txt = str[this.randomNum(0, str.length)];
      ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
      ctx.font = this.randomNum(20, 26) + 'px SimHei'; //随机生成字体大小
      var x = 5 + i * 20;
      var y = this.randomNum(20, 25);
      var deg = this.randomNum(-20, 20);
      //修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 5, 0);
      text = text + txt;
      //恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    /**绘制干扰线**/
    for (var i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(this.randomNum(0, 90), this.randomNum(0, 28));
      ctx.lineTo(this.randomNum(0, 90), this.randomNum(0, 28));
      ctx.stroke();
    }
    /**绘制干扰点**/
    for (var i = 0; i < 20; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(this.randomNum(0, 90), this.randomNum(0, 28), 1, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.draw(false, function () {
      that.setData({
        text: text
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
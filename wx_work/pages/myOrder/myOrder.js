// pages/myOrder/myOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
        url: app.globalData.ip + '/orders/' + options.id,
        method: 'GET',
        header: {
            token: app.globalData.token
        },
        success: res => {
           that.setData({
               act: res.data.data
           })
        }
    })
  },
})
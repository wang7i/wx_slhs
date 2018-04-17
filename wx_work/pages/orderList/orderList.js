// pages/orderList/orderList.js
const app =getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
  },
  myOrder: function (e) {
      wx.navigateTo({
          url: '../myOrder/myOrder?id=' + e.currentTarget.dataset.id,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that = this;
   wx.request({
       url: app.globalData.ip + '/orders',
       header: {
           token: app.globalData.token,
       },
       method: 'GET',
       success: res => {
           that.setData({
               orderList: res.data.data
           })
       }
   })
  },
})
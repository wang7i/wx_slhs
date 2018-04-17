// pages/us/us.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
        url: app.globalData.ip + '/articles',
        method: 'GET',
        data: {},
        success: res => {
            for (let i = 0; i < res.data.data.data.length; i++) {
                if (res.data.data.data[i].summary.length > 20) {
                    res.data.data.data[i].summary = res.data.data.data[i].summary.slice(0, 20) + "...";
                }
            }
            that.setData({
                actList: res.data.data.data
            })
            console.log(that.data.actList)
        }
    })
  },
    act:function(e) {
        wx.navigateTo({
            url: '../act/act?id=' + e.currentTarget.dataset.id,
        })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 
})
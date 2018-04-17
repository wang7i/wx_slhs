// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: ['http://www.shanlilohas.com/uploads/160725/1-160H51134514Y.jpg', 'http://www.shanlilohas.com/uploads/151215/1-151215151242942.jpg'],
      swiperCurrent: 0,
      endDate: '请选择',
      startDate: '请选择',
      details: {},
  },
  jumpDate: function () {
    wx.navigateTo({
      url: '../date/date',
    })
  },
  swiperChange: function (e) {
      this.setData({
          swiperCurrent: e.detail.current
      })
  }, 
  reserve: function (e) {
      wx.navigateTo({
          url: `../rdetail/rdetail?mainPic=${this.data.details.mainPictureUrl}&name=${this.data.details.roomName}&id=${this.data.details.roomId}&money=${this.data.details.price}`,
      })
  },
  collection: function () {
      let that = this;
      console.log(that.data.details)
      wx.request({
          url: app.globalData.ip + '/collection-rooms',
          method: 'POST',
          header: {
              "content-Type": "application/x-www-form-urlencoded",
              token: app.globalData.token
          },
          data: {
              roomId: that.data.details.roomId
          },
          success: res => {
              console.log(res)
              if (res.data.msg == '收藏成功') {
                  wx.showToast({
                      title: '收藏成功',
                      mask: true
                  })
                  that.data.actDetail.collectionNumber = that.data.actDetail.collectionNumber + 1
                  that.setData({
                      actDetail: that.data.actDetail
                  })
              } else {
                  wx.showToast({
                      title: res.data.msg,
                      mask: true
                  })
              }
          }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
        key: 'date',
        success: function (res) {
            that.setData({
                startDate: res.data.startDate,
                endDate: res.data.endDate
            })
        },
        fail: err => {
            that.setData({
                startDate: '请选择',
                endDate: '请选择'
            })
        }
    })
    wx.request({
        url: app.globalData.ip + '/rooms/' + options.id,
        method:'GET',
        success: res=> {
            that.setData({
                details: res.data.data
            })
            console.log(that.data.details)
        }
    })
  },
})
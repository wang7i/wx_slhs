// pages/reserve/reserve.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: ['http://www.shanlilohas.com/uploads/160725/1-160H51134514Y.jpg', 'http://www.shanlilohas.com/uploads/151215/1-151215151242942.jpg'],
      swiperCurrent: 0,
      startDate: '请选择',
      endDate: '请选择',
      time: '',
      city: {
          name: '地区',
          id: ''
      },
      roomList: [],
  },
  /**
   * 自定义函数
   */
  detail: function(e) {
    wx.navigateTo({
        url: `../detail/detail?startDate=${this.data.startDate}&endDate=${this.data.endDate}&id=${e.currentTarget.dataset.id}`,
    })
  },
  reserve: function (e) {
      wx.navigateTo({
          url: `../rdetail/rdetail?mainPic=${e.currentTarget.dataset.img}&name=${e.currentTarget.dataset.name}&id=${e.currentTarget.dataset.id}&money=${e.currentTarget.dataset.money}`,
      })
  },
  swiperChange: function (e) {
      this.setData({
          swiperCurrent: e.detail.current
      })
  }, 
  date: function () {
      wx.navigateTo({
          url: '../date/date',
      })
  },
  city: function(){
    wx.navigateTo({
        url: `../city/city?name=${this.city.name}&`,
    })
  },
  call: function () {
      wx.makePhoneCall({
          phoneNumber: '400-870-3070' //仅为示例，并非真实的电话号码
      })
  },
  jumpHotel: function () {
      wx.navigateTo({
          url: '../hotel/hotel',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
        key: 'date',
        success: function(res) {
            that.setData({
                startDate: res.data.startDate,
                endDate: res.data.endDate,
                time: res.data.time,
            })
        },
        fail: err => {
        }
    })
    wx.getStorage({
        key: 'city',
        success: function (res) {
            that.setData({
                city:res.data
            })
        },
        fail: err => {
        }
    })
    wx.request({
        url: app.globalData.ip + '/rooms-recommend',
        method: 'GET',
        success: (res)=> {
            that.setData({
                roomList: res.data.data
            })
            console.log(that.data.roomList)
        }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.getStorage({
        key: 'city',
        success: function(res) {
            that.setData({
                city: res.data
            })
        },
    })
    wx.getStorage({
        key: 'date',
        success: function(res) {
            that.setData({
                startDate: res.data.startDate,
                endDate: res.data.endDate,
                time: res.data.time,
            })
        },
    })
  },
})
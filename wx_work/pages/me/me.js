// pages/me/me.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      userInfo: {},
      hasUserInfo: false,
      orderList: [],
      articleList: [],
      roomList: [],
  },
  /**
   * 自定义函数
   */
  orderList: function () {
      wx.navigateTo({
          url: '../orderList/orderList',
      })
  },
  myCollection: function () {
      wx.navigateTo({
          url: '../myCollection/myCollection',
      })
  },
  collection: function (e) {
      console.log()
      if (e.currentTarget.dataset.type == 'articles') {
          wx.navigateTo({
              url: '../act/act?id=' + e.currentTarget.dataset.id,
          })
      }else {
          wx.navigateTo({
              url: '../detail/detail?id=' + e.currentTarget.dataset.id,
          })
      }
  },
  myOrder: function (e) {
      wx.navigateTo({
          url: '../myOrder/myOrder?id=' + e.currentTarget.dataset.id,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    wx.getSetting({
        success: res => {
            if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        app.globalData.userInfo = res.userInfo
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        //   if (this.userInfoReadyCallback) {
                        //       this.userInfoReadyCallback(res)
                        //   }
                        that.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                        })
                    }
                })
            }
            else {
                wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        app.globalData.userInfo = res.userInfo
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况                      
                        //   if (this.userInfoReadyCallback) {
                        //       this.userInfoReadyCallback(res)
                        //   }
                        that.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                        })
                    },
                    fail: err => {
                        wx.showModal({
                            title: '授权通知',
                            content: '如需正常使用小程序，请点击授权按钮，勾选用户信息并点击确定。',
                            // showCancel: false,
                            confirmText: '授权',
                            success: res => {
                                if (res.confirm) {
                                    wx.openSetting({
                                        success: res => {
                                            if (res.authSetting["scope.userInfo"]) {
                                                wx.getUserInfo({
                                                    success: res => {
                                                        // 可以将 res 发送给后台解码出 unionId
                                                        app.globalData.userInfo = res.userInfo
                                                        that.setData({
                                                            userInfo: res.userInfo,
                                                            hasUserInfo: true
                                                        })
                                                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                                        // 所以此处加入 callback 以防止这种情况                      
                                                        //   if (this.userInfoReadyCallback) {
                                                        //       this.userInfoReadyCallback(res)
                                                        //   }
                                                    },
                                                })
                                            }
                                        }
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                })
            }
        }
    })
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
            console.log(that.data.orderList)
        }
    })
    wx.request({
        url: app.globalData.ip + '/collection-articles',
        header: {
            token: app.globalData.token,
        },
        method: 'GET',
        success: res => {
            that.setData({
                articleList: res.data.data
            })
            console.log(that.data.articleList)
        }
    })
    wx.request({
        url: app.globalData.ip + '/collection-rooms',
        header: {
            token: app.globalData.token,
        },
        method: 'GET',
        success: res => {
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
  
  },
})
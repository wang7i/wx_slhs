//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    left: 0,
    width: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    actList: [],
    typeList: []
  },
  //事件处理函数
  onLoad: function () {
      let that = this;
      wx.request({
          url: app.globalData.ip + '/articles',
          method: 'GET',
          data: {},
          success: res => {
              for(let i = 0;i< res.data.data.data.length;i++) {
                if (res.data.data.data[i].summary.length>20){
                    res.data.data.data[i].summary = res.data.data.data[i].summary.slice(0, 20) + "...";
                }
              }
              that.setData({
                  actList: res.data.data.data
              })
              console.log(res.data.data.data)
              
          }
      })
      wx.request({
          url: app.globalData.ip + '/article-categroys',
          method: 'GET',
          data: {},
          success: res => {
              console.log(res.data.status)
              that.setData({
                  typeList: res.data.status
              })
              var query = wx.createSelectorQuery();
              query.select('#all').boundingClientRect();
              query.exec(function (res) {
                  console.log(res)
                  that.setData({
                      width: 150 + 'rpx',
                      left: res[0].left - 2 + 'px'
                  })
              })
          }
      })
  },
  hover: function (e) {
      var id = '#' + e.target.id;
      var query = wx.createSelectorQuery();
      query.select(id).boundingClientRect();
      query.exec(function (res) {
          this.setData({
              left: res[0].left - 2 + 'px',
              width: res[0].width + 'px'
          })
      }.bind(this))
      wx.request({
          url: app.globalData.ip + '/articles?categoryId=' + e.currentTarget.dataset.id,
          method: 'GET',
          data: {},
          success: res => {
              for (let i = 0; i < res.data.data.data.length; i++) {
                  if (res.data.data.data[i].summary.length > 20) {
                      res.data.data.data[i].summary = res.data.data.data[i].summary.slice(0, 20) + "...";
                  }
              }
              this.setData({
                  actList: res.data.data.data
              })
          }
      })
  },
  act: function (e) {
      wx.navigateTo({
          url: '../act/act?id=' + e.currentTarget.dataset.id,
      })
  },
})

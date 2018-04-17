// pages/hotel.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startDate: '',
        endDate: '',
        city: {
            name: '请选择',
            id: ''
        },
        dates: '请选择',
        roomList: [],
        cityRoomList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getStorage({
            key: 'city',
            success: function (res) {
                that.setData({
                    city: res.data
                })
                wx.request({
                    url: app.globalData.ip + '/rooms?cityId=' + that.data.city.cityId,
                    method: 'GET',
                    success: res => {
                        that.setData({
                            cityRoomList: res.data.data.data
                        })
                    }
                })
            },
            fail: err => {
                
            }
        })
        wx.getStorage({
            key: 'date',
            success: function (res) {
                res.data.date = res.data.startDate.slice(res.data.startDate.match('-').index + 1) + '至' + res.data.endDate.slice(res.data.endDate.match('-').index + 1)
                that.setData({
                    dates: res.data.date
                })
            },
            fail: err => {
                that.setData({
                    dates: '请选择'
                })
            }
        })
        wx.request({
            url: app.globalData.ip + '/rooms-recommend',
            method: 'GET',
            success: res => {
                that.setData({
                    roomList: res.data.data
                })
                console.log(that.data.roomList)
            }
        })
    },
    detail: function (e) {
        wx.navigateTo({
            url: `../detail/detail?startDate=${this.data.startDate}&endDate=${this.data.endDate}&id=${e.currentTarget.dataset.id}`,
        })
    },
    date: function () {
        wx.navigateTo({
            url: '../date/date',
        })
    },
    city: function () {
        wx.navigateTo({
            url: '../city/city',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        wx.getStorage({
            key: 'city',
            success: function (res) {
                that.setData({
                    city: res.data
                })
                wx.request({
                    url: app.globalData.ip + '/rooms?sid=' + that.data.city.cityId,
                    method: 'GET',
                    success: res => {
                        that.setData({
                            cityRoomList: res.data.data.data
                        })
                    }
                })
            },
            fail: err => {

            }
        })
        wx.getStorage({
            key: 'date',
            success: function (res) {
                res.data.date = res.data.startDate.slice(res.data.startDate.match('-').index + 1) + '至' + res.data.endDate.slice(res.data.endDate.match('-').index + 1)
                that.setData({
                    dates: res.data.date
                })
            },
            fail: err => {
                that.setData({
                    dates: '请选择'
                })
            }
        })
        wx.getStorage({
            key: 'date',
            success: function (res) {
                that.setData({
                    startDate: res.data.startDate,
                    endDate: res.data.endDate,
                })
            },
        })
    },
})
// pages/myCollection/myCollection.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        pageTo: 1,
        typeId: 1,
        border1: '2px solid #509BE5',
        border2: '',
        roomList: [],
        articleList: [],
        hide: true,
    },
    change: function (e) {
        let that = this;
        if (that.data.typeId == e.target.id) {
            console.log(1)
        }else {
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            if (e.target.id == 1) {
                that.setData({
                    border1: '2px solid #509BE5',
                    border2: '',
                    typeId: 1,
                    hide: true,
                })
                // wx.request({
                //     url: app.globalData.ip + '/collection-articles',
                //     method: 'GET',
                //     header: {
                //         token: app.globalData.token
                //     },
                //     success: res => {
                //         console.log(res)
                //         
                //     }
                // })
                wx.hideLoading();
            }else {
                that.setData({
                    border2: '2px solid #509BE5',
                    border1: '',
                    typeId: 2,
                    hide: false
                })
                wx.request({
                    url: app.globalData.ip + '/collection-rooms',
                    method: 'GET',
                    header: {
                        token: app.globalData.token
                    },
                    success: res => {
                        that.setData({
                            roomList: res.data.data
                        })
                        wx.hideLoading();
                    }
                })
            }
        }
    },
    myCollection: function (e) {
        if (this.data.typeId == 1) {
            wx.navigateTo({
                url: '../act/act?id=' + e.currentTarget.dataset.id,
            })
        }else {
            wx.navigateTo({
                url: '../detail/detail?id=' + e.currentTarget.dataset.id,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: app.globalData.ip + '/collection-articles',
            method: 'GET',
            header: {
                token: app.globalData.token
            },
            success: res => {
                that.setData({
                    articleList: res.data.data
                })
                wx.hideLoading();
            }
        })
    },
    onReachBottom: function () {
        let that = this
        let cType;
        that.setData({
            pageTo: parseInt(that.data.pageTo + 1)
        })
        if (that.data.typeId == 1) {
            cType = 'articles'
        } else {
            cType = 'rooms'
        }
        wx.request({
            url: app.globalData.ip + '/collection-' + cType,
            method: 'GET',
            header: {
                token: app.globalData.token
            },
            data: {
                page: that.data.pageTo
            },
            success: res => {
                console.log(res)
                wx.hideLoading();
            }
        })
    },
})
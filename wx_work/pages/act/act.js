// pages/act/act.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        actDetail: {}
    },
    collection: function () {
        let that = this;
        wx.request({
            url: app.globalData.ip + '/collection-articles',
            method: 'POST',
            header: {
                "content-Type": "application/x-www-form-urlencoded",
                token: app.globalData.token
            },
            data: {
                articleId: that.data.actDetail.articleId
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
                }else {
                    wx.showToast({
                        title: res.data.msg,
                        mask: true
                    })
                }
            }
        })
        // wx.getStorage({
        //     key: 'tel',
        //     success: function (res) {
        //         this.setData({
        //             collection: collection + 1
        //         })
        //     },
        //     fail: function (err) {
        //         wx.showModal({
        //             title: 'App',
        //             content: '请绑定您的手机号以讲您的信息同步',
        //             success: function (res) {
        //                 if (res.confirm) {
        //                     wx.navigateTo({
        //                         url: '../tel/tel',
        //                     })
        //                 } else if (res.cancel) {
        //                     console.log('用户点击取消')
        //                 }
        //             }
        //         })
        //     }
        // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.request({
            url: app.globalData.ip + '/articles/' + options.id,
            header: {
                token: app.globalData.token
            },
            method: 'GET',
            success: res => {
               that.setData({
                   actDetail: res.data.data
               })
               var article = that.data.actDetail.articleContent;
               WxParse.wxParse('article', 'html', article, that, 5);
               console.log(that.data.actDetail)
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        let that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '自定义转发标题',
            path: '/pages/paySuccess/paySuccess',
            success: function (res) {
                // 转发成功
                that.setData({
                    share: that.data.share + 1
                })
            },
            fail: function (res) {
                // 转发失败
                console.log(2)
            }
        }
    }
})
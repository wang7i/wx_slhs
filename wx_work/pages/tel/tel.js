// pages/tel/tel.js
var Zan = require('../toptips/index');
const app = getApp();
Page(Object.assign({}, Zan.TopTips,{

    /**
     * 页面的初始数据
     */
    data: {
        tel: '',
        code: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    tel: function (e) {
        this.setData({
            tel: e.detail.value
        })
        console.log(this.data.tel)
    },
    send: function () {
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        if (this.data.tel.length == 0){
            this.showZanTopTips('请输入手机号');
        } else if (reg.test(this.data.tel) == false){
            this.showZanTopTips('请输入正确的手机号码');
        }else {
            // wx.request({
            //     url: '',
            // })
            console.log(1)
        }
    },
    formSubmit: function (e) {
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        let tel = e.detail.value.tel;
        let code = e.detail.value.code;
        if (tel.length == 0 || code.length == 0) {
            this.showZanTopTips('请填写手机号/验证码');
        } else if (reg.test(this.data.tel) == false) {
            this.showZanTopTips('请输入正确的手机号码');
        }else {
            // wx.request({
            //     url: '',
            // })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
}))
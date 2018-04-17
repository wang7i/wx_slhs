// pages/rdetail/rdetail.js
var Zan = require('../toptips/index');
const app = getApp();
Page(Object.assign({}, Zan.TopTips, {

    /**
     * 页面的初始数据
     */
    data: {
        startDate: '',
        endDate: '',
        time: '',
        num: 1,
        // bgcolor: 424242
        bgcolor: false,
        hidden: true,
        people: [],
        name: '',
        phone: '',
        act: {},
        wx: '',
        oneMoney: 0,
        spe: '',
        email: '',
    },
    jumDate: function () {
        wx.navigateTo({
            url: '../date/date',
        })
    },
    jumPeople: function () {
        wx.navigateTo({
            url: '../people/people',
        })
    },
    jian: function () {
        if (this.data.num <= 1) {
            this.setData({
                num: 1,
                bgcolor: false
            })
        } else {
            this.data.num = this.data.num -1;
            this.data.act.money = (this.data.act.money - this.data.oneMoney).toFixed(2)
            this.setData({
                num: this.data.num,
                act: this.data.act
            })
        }
    },
    jia: function () {
        this.data.num = this.data.num + 1
        this.data.act.money = (this.data.oneMoney * this.data.num).toFixed(2)
        this.setData({
            num: this.data.num,
            bgcolor: true,
            act: this.data.act
        })
    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '400-076-7123', //此号码并非真实电话号码，仅用于测试  
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    },
    hidden: function () {
        this.setData({
            hidden: !this.data.hidden
        })
    },
    name: function (e) {
        this.setData({
            name: e.detail.value.trim()
        })
    },
    wx: function (e) {
        this.setData({
            wx: e.detail.value.trim()
        })
    },
    phone: function (e) {
        this.setData({
            phone: e.detail.value.trim()
        })
    },
    spe: function (e) {
        this.setData({
            spe: e.detail.value.trim()
        })
    },
    email: function (e) {
        this.setData({
            email: e.detail.value.trim()
        })
    },
    pay: function () {
        let that = this;
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        let regE = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (that.data.startDate == '' || that.data.endDate == '') {
            that.showZanTopTips('请填写入住/离开时间');
        } else if (that.data.people.length == 0) {
            that.showZanTopTips('请填写入住人信息');
        } else if (that.data.name == '') {
            that.showZanTopTips('请填写联系人');
        } else if (that.data.wx == '') {
            that.showZanTopTips('请您的微信账号方便我们与您联系');
        } else if (that.data.phone == '' || reg.test(that.data.phone) == false) {
            that.showZanTopTips('请填写正确的电话号码');
        } else if (that.data.email == '' || regE.test(that.data.email) == false) {
            that.showZanTopTips('请填写正确的邮箱地址');
        } else if (that.data.hidden == true) {
            that.showZanTopTips('请勾选《啊啊服务协议》');
        } else {
            let people = [];
            people.push(that.data.people[0])
            for(let i=0; i<that.data.people.length;i++) {
                if (that.data.people[i].checked == true && that.data.people[0].id != that.data.people[i].id) {
                    people.push(that.data.people[i])
                }
            }
            wx.request({
                url: app.globalData.ip + '/orders',
                method: 'POST',
                header: {
                    token: app.globalData.token,
                    "content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    rid: that.data.act.id,
                    reserverRoomsNumbers: that.data.num,
                    linkName: that.data.name,
                    linkPhone: that.data.phone,
                    checkInDate: that.data.startDate,
                    leaveDate: that.data.endDate,
                    checkInPeople: JSON.stringify(people),
                    spe: that.data.spe,
                    linkEmail: that.data.email
                },
                success: res => {
                    console.log(res.data)
                    if(res.data.msg == '下单成功') {
                        wx.requestPayment({
                            'timeStamp': String(res.data.data.pay.timestamp),
                            'nonceStr': String(res.data.data.pay.nonceStr),
                            'package': res.data.data.pay.package,
                            'signType': res.data.data.pay.signType,
                            'paySign': res.data.data.pay.paySign,
                            'success': function (res) {
                                wx.showToast({
                                    title: '下单成功',
                                    mask: true
                                        })
                                setTimeout(function(){
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                },1500)
                            },
                            'fail': function (err) {
                                console.log(err)
                                // wx.showToast({
                                //     title: '支付失败',
                                //     mask: true
                                // })
                            },
                        })
                    } else {
                        wx.showModal({
                            title: '支付失败',
                            content: res.data.msg,
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                }
                            }
                        })
                    }
                }
            })
        }
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
                    endDate: res.data.endDate,
                    time: res.data.time,
                })
            },
            fail: err => {
            }
        })
        wx.getStorage({
            key: 'people',
            success: function (res) {
                that.setData({
                    people: res.data
                })
            },
            fail: err => {
            }
        })
        that.data.act.mainPic = options.mainPic;
        that.data.act.name = options.name;
        that.data.act.id = options.id;
        that.data.act.money = options.money
        that.setData({
            act: that.data.act
        })
        that.data.oneMoney = options.money
    },
}))
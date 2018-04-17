// pages/people/people.js
var Zan = require('../toptips/index');
const app = getApp();
Page(Object.assign({}, Zan.TopTips, {

    /**
     * 页面的初始数据
     */
    data: {
        people: [],
        add: false,
        tel: '',
        name: '',
        id: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
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

    },
    addPeople: function () {
        this.setData({
            add: true
        })
    },
    add: function(){
        let that = this;
        let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
        if (that.data.name == '') {
            this.showZanTopTips('请填写真实姓名');
        } else if (that.data.id == '' || reg.test(that.data.id) == false){
            that.showZanTopTips('请填写正确的身份信息');
        }else {
            let obj = {};
            obj.name = that.data.name;
            obj.id = that.data.id;
            obj.tel = that.data.tel;
            obj.checked = false;
            that.data.people.push(obj)
            that.setData({
                add: false,
                people: that.data.people
            })
            wx.getStorage({
                key: 'people',
                success: function(res) {
                    console.log(obj)
                    wx.setStorage({
                        key: 'people',
                        data: that.data.people
                    })
                },
                fail: ()=> {
                    wx.setStorage({
                        key: 'people',
                        data: that.data.people,
                    })
                }
            })
        }
        
    },
    tel: function(e){
        this.setData({
            tel: e.detail.value.trim()
        })
    },
    name: function (e) {
        this.setData({
            name: e.detail.value.trim()
        })
    },
    id: function (e) {
        this.setData({
            id: e.detail.value.trim()
        })
    },
    ok: function () {
        var pages = getCurrentPages();
        var Page = pages[pages.length - 1];//当前页
        var prevPage = pages[pages.length - 2];  //上一个页面
        let people = [];
        for (let i = 0; i < this.data.people.length; i++) {
            if (this.data.people[i].checked == true) {
                people.push(this.data.people[i])
            }
        }
        prevPage.setData({
            people: people
        })
        wx.navigateBack({
            delta: 1
        })
    },
    checked: function (e) {
        this.data.people[e.currentTarget.dataset.index].checked = !this.data.people[e.currentTarget.dataset.index].checked
        this.setData({
            people: this.data.people
        })
    }
}))
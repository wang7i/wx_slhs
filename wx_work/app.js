//app.js
App({
    onLaunch: function () {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    console.log(res.code)
                    wx.request({
                        url: this.globalData.ip + '/wx/login',
                        method: 'POST',
                        header: {
                            "content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            code: res.code
                        },
                        success: res => {
                            if (res.data.msg == "登录成功") {
                                wx.setStorage({
                                    key: 'token',
                                    data: res.data.data.token,
                                })
                                this.globalData.token = res.data.data.token
                                
                            }
                        }
                    })
                }
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // if (this.userInfoReadyCallback) {
                            //     this.userInfoReadyCallback(res)
                            // }
                            wx.request({
                                url: this.globalData.ip + '/wx/members',
                                method: 'POST',
                                header: {
                                    "content-Type": "application/x-www-form-urlencoded",
                                    token: this.globalData.token
                                },
                                data: {
                                    encryptedData: res.encryptedData,
                                    iv: res.iv,
                                    rawData: res.rawData,
                                    signature: res.signature
                                },
                                success: res => {
                                    console.log(res)
                                }
                            })
                        }
                    })
                }
                else {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // if (this.userInfoReadyCallback) {
                            //     this.userInfoReadyCallback(res)
                            // }
                            wx.request({
                                url: this.globalData.ip + '/wx/members',
                                method: 'POST',
                                header: {
                                    "content-Type": "application/x-www-form-urlencoded",
                                    token: this.globalData.token
                                },
                                data: {
                                    encryptedData: res.encryptedData,
                                    iv: res.iv,
                                    rawData: res.rawData,
                                    signature: res.signature
                                },
                                success: res => {
                                    console.log(res)
                                }
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
                                                        withCredentials: true,
                                                        success: res => {
                                                            // 可以将 res 发送给后台解码出 unionId
                                                            this.globalData.userInfo = res.userInfo
                                                            // if (this.userInfoReadyCallback) {
                                                            //     this.userInfoReadyCallback(res)
                                                            // }
                                                            wx.request({
                                                                url: this.globalData.ip + '/wx/members',
                                                                method: 'POST',
                                                                header: {
                                                                    "content-Type": "application/x-www-form-urlencoded",
                                                                    token: this.globalData.token
                                                                },
                                                                data: {
                                                                    encryptedData: res.encryptedData,
                                                                    iv: res.iv,
                                                                    rawData: res.rawData,
                                                                    signature: res.signature
                                                                },
                                                                success: res => {
                                                                    console.log(res)
                                                                }
                                                            })
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

    },
    globalData: {
        userInfo: null,
        ip: 'http://118.89.241.181/api',
        token: null
    }
})
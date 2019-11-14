// pages/list/index.js
const utils = require('../../utils/util.js');
const app = getApp()
Page({


    data: {
        dates: [{
                "data_name": "1人",
                "value": "1"
            },
            {
                "data_name": "2人",
                "value": "2"
            },
            {
                "data_name": "3人",
                "value": "3"
            },
            {
                "data_name": "4人",
                "value": "4"
            },
            {
                "data_name": "5人",
                "value": "5"
            },
            {
                "data_name": "6人",
                "value": "6"
            },
            {
                "data_name": "7人",
                "value": "7"
            },
            {
                "data_name": "8人",
                "value": "8"
            },
            {
                "data_name": "9人",
                "value": "9"
            },
            {
                "data_name": "10人",
                "value": "10"
            },
            {
                "data_name": "11人",
                "value": "11"
            },
            {
                "data_name": "12人",
                "value": "12"
            },
            {
                "data_name": "13人",
                "value": "13"
            },
            {
                "data_name": "14人",
                "value": "14"
            }, {
                "data_name": "15人",
                "value": "15"
            }, {
                "data_name": "16人",
                "value": "16"
            },
        ],
        // 用户信息
        userInfo: {},
        canIUse: wx.canIUse('.userinfo.open-type.getUserInfo'),
        //renshu
        state: '0',
        //商铺名
        shopName: "",
        //桌台号
        tableNum: '',
        //商铺号  
        shopNum: "",
        //场所
        regionName: "",
        //server: "http://images.hongxiaosou.cn/",
		//serverUrl: 'https://wxdc.hongxiaosou.cn/hs-app-server/',
		server:'http://192.168.1.250/',
		serverUrl:'http://192.168.1.250/hs-app-server/',
        classIndex: 0,
        showindexData: [],
        indexData: [],
        anumber: 0,
		tableTrue:true
    },

    onLoad: function(option) {
		
		wx.navigateBack({
　　　　delta: 0
　　})
        var that = this
        var user = wx.getStorageSync('user') || {};
        var userInfo = wx.getStorageSync('userInfo') || {};
		
        wx.login({
            success:   function(res)  {
                wx.setStorageSync('code', res.code)
                if  (res.code)  {
                    wx.getUserInfo({
                        success: function(res) {
                            var objz = {};
                            objz.avatarUrl = res.userInfo.avatarUrl;
                            objz.nickName = res.userInfo.nickName;
                            wx.setStorageSync('userInfo', res.userInfo);
                        }
                    });




                } 
                else  {
                    console.log('获取用户登录态失败！'  +  res.errMsg)
                }
            }
        });
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            //用户已经授权过
                        }
                    })
                }
            }
        })
        // wx.getSetting({
        // 	success: function (res) {
        // 		if (res.authSetting['scope.userInfo']) {
        // 			// 已经授权，可以直接调用 getUserInfo 获取头像昵称
        // 			wx.getUserInfo({
        // 				success: function (res) {
        // 					console.log(res.userInfo)
        // 				}
        // 			})
        // 		}
        // 	}
        // })
        //获取二维码参数
		if (option.q !== undefined) {
			var scan_url = decodeURIComponent(option.q);
			wx.setStorageSync('shopNum', scan_url.split('?')[1].split('&')[0].split('=')[1]);
			wx.setStorageSync('tableNum', scan_url.split('?')[1].split('&')[1].split('=')[1]);
			that.setData({
				shopNum: scan_url.split('?')[1].split('&')[0].split('=')[1],
				tableNum: scan_url.split('?')[1].split('&')[1].split('=')[1]
			})
			that.getTable()
		} else if (option.shopNumber == undefined) {
            //如传参为空，表示直接打开小程序，直接调取本地存取的数据

            wx.getStorage({
                key: 'shopInfo',
                success: function(res) {
                    that.setData({
                        shopName: res.data.shopName,
                        tabletableNumber: res.data.tabletableNumber,
                        anumber: res.data.number,
                        regionNumber: res.data.regionNumber,
                        clerkNumber: res.data.clerkNumber,
                        equipmentNumber: res.data.equipmentNumber,
                        operatorId: res.data.qrCodeAddress.split('=')[1],
                        regionName: res.data.regionName
                    })

                },
                fail: function(e) {
                    wx.setStorageSync('shopNum', '1000181008300323354');
                    wx.setStorageSync('tableNum', 'ZTB31F18');
                    that.setData({
                        shopNum: '1000181008300323354',
                        tableNum: 'ZTB31F18'
                    })
                    that.getTable()
                    // wx.showToast({
                    // 	title: '未查询到门店信息，请重新扫描桌上二维码',
                    // 	icon: 'none',
                    // 	duration: 2000
                    // })

                }



            })
		} else if (option.shopNumber != undefined) {
			wx.setStorageSync('shopNum', option.shopNumber);
            wx.setStorageSync('tableNum', option.tabletableNumber);
            this.setData({
				shopNum: option.shopNumber,
                tableNum: option.tabletableNumber
            })
            this.getTable()
        }
        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //         hasUserInfo: true
        //     })
        // } else if (this.data.canIUse) {
        //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //     // 所以此处加入 callback 以防止这种情况
        //     app.userInfoReadyCallback = res => {
        //         this.setData({
        //             userInfo: res.userInfo,
        //             hasUserInfo: true
        //         })
        //     }
        // } else {
        //     // 在没有 open-type=getUserInfo 版本的兼容处理
        //     wx.getUserInfo({
        //         success: res => {
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //                 hasUserInfo: true
        //             })
        //         }
        //     })
        // }
    },
    // getUserInfo: function(e) {
    //     console.log(e)
    //     app.globalData.userInfo = e.detail.userInfo
    //     this.setData({
    //         userInfo: e.detail.userInfo,
    //         hasUserInfo: true
    //     })
    // },
	showModalStatus123:function(){
		this.setData({
			showModalStatus: !this.data.showModalStatus
		})
	},
    // 桌台数据获取
    getTable() {
        let that = this;
        utils.request({
			url: "table/getScanTableInfo?shopNumber=" + that.data.shopNum + "&tabletableNumber=" + that.data.tableNum + "&paymentType=2" ,
            success: function(res) {
				if(res.code != '1000'){
					that.setData({
						tableTrue: false
					})
					wx.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2500
					})
					return
				}
				if (res.data.number == '0'){
					that.setData({
						tableTrue: false
					})
					wx.showToast({
						title: '桌台码错误，请询问店员',
						icon: 'none',
						duration: 2500
					})
					return
				}
				if (res.data.payChannel != 'Douguo') {
					that.setData({
						tableTrue: false
					})
					wx.showToast({
						title: '支付方式错误，请联系店员',
						icon: 'none',
						duration: 2500
					})
					return
				}
				if(!res.data.shopName){
					that.setData({
						tableTrue:false
					})
					wx.showToast({
						title: '未查询到该二维码绑定信息，请咨询店员',
						icon: 'none',
						duration: 2500
					})
					return
				}
                let indexArr = that.data.indexData;
                indexArr = indexArr.concat(res.data)
                wx.setStorageSync('shopInfo', res.data);
                that.setData({
                    indexData: indexArr,
                    shopName: res.data.shopName,
                    regionName: res.data.regionName,
                    anumber: res.data.number
                })
            }
        })
    },
    //获取用户信息的回调
    onGotUserInfo: function(e) {
		if(!this.data.tableTrue){
			return
		}
        if (e.detail.userInfo) {
            this.setData({
                userInfo: e.detail.userInfo,
                showModalStatus: true
            })
            var that = this
            var user = wx.getStorageSync('user') || {};
            var userInfo = wx.getStorageSync('userInfo') || {};
            wx.login({
                success: function(res) {
                    if (res.code) {
                        wx.getUserInfo({
                            success: function(res) {
                                var objz = {};
                                objz.avatarUrl = res.userInfo.avatarUrl;
                                objz.nickName = res.userInfo.nickName;
                                wx.setStorageSync('userInfo', res.userInfo);
                            }
                        });

                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                }
            });
        }

    },
    onGotUserInfo1: function(e) {
		if (!this.data.tableTrue) {
			return
		}
        if (e.detail.userInfo) {
            this.setData({
                userInfo: e.detail.userInfo,
            })
            var that = this
            var user = wx.getStorageSync('user') || {};
            var userInfo = wx.getStorageSync('userInfo') || {};
            wx.login({
                success: function(res) {
                    if (res.code) {
                        wx.getUserInfo({
                            success: function(res) {
                                var objz = {};
                                objz.avatarUrl = res.userInfo.avatarUrl;
                                objz.nickName = res.userInfo.nickName;
                                wx.setStorageSync('userInfo', res.userInfo);

                            }
                        });

                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                }
            });
            wx.navigateTo({
				url: '../wxpay/index?shopNum=' + wx.getStorageSync('shopNum') + '&tableNum=' + wx.getStorageSync('tableNum'),
            })
        }

    },
    powerDrawer: function(e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    util: function(currentStatu) {
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({
            duration: 200, //动画时长
            timingFunction: "linear", //线性
            delay: 0 //0则不延迟
        });

        // 第2步：这个动画实例赋给当前的动画实例
        this.animation = animation;

        // 第3步：执行第一组动画
        animation.opacity(0).translateY(200).step();

        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function() {
            // 执行第二组动画
            animation.opacity(1).translateY(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            })

            //关闭
            if (currentStatu == "close") {
                this.setData({
                    showModalStatus: false
                });
            }
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
            this.setData({
                showModalStatus: true
            });
        }
    },
    select_date: function(e) {
        var state = this.data.state
        state = e.currentTarget.dataset.key
        wx.setStorageSync('numberMeals', state + 1);
        this.setData({
            state: state,
        });
    },
    tiaozhuan: function() {
        if (this.data.state == 0) {
            wx.setStorageSync('numberMeals', '1');
        }
		this.setData({
			showModalStatus: false
		})
        wx.navigateTo({
            url: '../list/index',
        })
    },
    // payment: function() {
    //     wx.navigateTo({
    //         url: '../payment/payment',
    //     })
    // },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // let that = this;
        // this.getTable()
    },

})
// pages/pay/index.js
const utils = require('../../utils/util.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
		ai: 'wx2874eab47f3b286f',
		sk: '1caf69c2b811514cd66389ed5e1138d0',
        pay_keyboard: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'],
        classIndex: 0,
		shopName: '',
		tableNum:'',
		subCol: 'false'	,
		payNum:'',
		serverUrl:'https://wxdc.hongxiaosou.cn/',
		clerkNumber: '',
		operatorId:"",
		master:"",
		appKey:"",

    },
	clickNum:function(e){
		var isTruea = 'true'
		var payStr = this.data.payNum;
		if (e.currentTarget.dataset.index == '.' && payStr.indexOf('.') > -1){
			return
		}
		if (e.currentTarget.dataset.index == '.' && payStr == ''){
			payStr = 0 + '' + e.currentTarget.dataset.index
		}else{
			payStr = payStr + '' + e.currentTarget.dataset.index
		}
		
		if(payStr.indexOf('.')>-1 && payStr.split('.')[1].length>2){
			console.log('位数超出了啊')
			return
		}

		if (payStr > 0.00){
			isTruea = 'true'
		}else{
			isTruea = 'false'
		}
		// console.log(isTruea)
		this.setData({
			payNum:payStr,
			subCol: isTruea,
		})
	},
	delNum:function(e){
		var isTrue;
		if (payNum == ''){
			return
		}
		var payNum = this.data.payNum;
		payNum = payNum.substring(0, payNum.length - 1)
		if(payNum == '' ){
			isTrue = false
		}else{
			isTrue = true
		}
		if (payNum > 0.00) {
			isTrue = 'true'
		} else {
			isTrue = 'false'
		}
		this.setData({
			payNum: payNum,
			subCol: isTrue,
		})
	},
	clearNum:function(){
		this.setData({
			payNum: '',
			subCol: false,
		})
	},
	sub:function(e){
		if (!e.detail.userInfo) {
			return
		}
		if (this.data.payNum > 0.00) {

		} else {
			wx.showToast({
				title: '请输入金额',
				icon:'none',
				duration: 2000
			})
			return
		}
		
		wx.showLoading({
			title: '支付中...',
		})
		
		var openId;
		var code;
		var that1 = this
		
		wx.login({
			success: function (res) {
				
				code = res.code
				if (res.code) {
					wx.getUserInfo({
						success: function (res) {
							wx.setStorageSync('userInfo', res.userInfo);
						}
					})
				}
				// var objz = {};
				// objz.avatarUrl = res.userInfo.avatarUrl;
				// objz.nickName = res.userInfo.nickName;
				// wx.setStorageSync('userInfo', res.userInfo);
				var dataObj = {}
				var TIME = utils.formatTime(new Date());
				dataObj.template_id = "fWUQkDWPPd20HGPxo9lMR5bR7sY_g-qItccRUqcQyYk",
					dataObj.keyword1 = TIME,
					dataObj.keyword2 = that1.data.payNum,
					dataObj.keyword3 = '支付成功',
					dataObj.appId = that1.data.ai,
					dataObj.appSecret = that1.data.sk
					// OPTIONS, GET, HEAD, POS
						wx.request({
							//我把文件夹名改为了wxpayapi,SERVER_PATH为服务器的域名
							//url: 'https://wxcs.hongxiaosou.com/eat/wecharLittlePro',
							url:'http://192.168.1.66:5003/hs-app-server/pay/littlePay',
							data: {
								
								code: code,
								"paymentType": "WeChat_Pay",
								"codeType": "SmallProgram_Pay",
								"equipmentNumber": '3',
								"equipmentType": '3',
								"totalMoney": that1.data.payNum,
								"shopNumber": that1.data.shopNum,
								"merchantNumber": '',
								"orderNo": '00000000010',
								"ip": that1.data.IP,
								"orderRemark": '',
								"master": that1.data.master,
								"appKey": that1.data.appkey,
								"address": that1.data.serverUrl + 'hs-app-server/pay/payCallback',
								//  
								"clerkNumber": that1.data.clerkNumber,
								"miniAppJson": dataObj,
							},
							header: {
								'content-type': 'application/json' // 默认值
							},
							method: 'POST',
							success: function (res) {
								
								wx.hideLoading()
								wx.requestPayment({
									'timeStamp': res.data.data.timeStamp,
									'nonceStr': res.data.data.nonceStr,
									'package': res.data.data.package,
									'signType': res.data.data.signType,
									'paySign': res.data.data.paySign,
									'success': function (res) {
										that1.setData({
											payNum: '',
											subCol: false,
										})
										wx.showToast({
											title: '支付成功',
											icon: 'success',
											duration: 2000
										})
										setTimeout(function () {
											wx.navigateTo({
												url: '/pages/webview/index'
											});
										}, 30)

									},
									'fail': function (res) {
										wx.showToast({
											title: '支付取消',
											icon: 'none',
											duration: 2000
										})
									}
								})
							}
						})
					
				
			}
		});
	},
	getTable() {
		let that = this;
		utils.request({
			url: "table/getScanTableInfo?shopNumber=" + that.data.shopNum + "&tabletableNumber=" + that.data.tableNum,
			success: function (res) {
			
				var	indexArr = res.data
				//wx.setStorageSync('shopInfo', res.data);
				that.setData({
					shopName: res.data.shopName,
					clerkNumber: res.data.clerkNumber,
					operatorId: res.data.qrCodeAddress.split('=')[1],
					master: res.data.master,
					appKey: res.data.appKey,
				})
			}
		})
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		wx.request({
			url: 'https://pv.sohu.com/cityjson?ie=utf-8',
			success: function (e) {
				console.log(e.data);
				var aaa = e.data.split(' ');
				console.log(aaa)
				var bbb = aaa[4]
				console.log(bbb)
				var ccc = bbb.replace('"', '')
				console.log(ccc)
				var ddd = ccc.replace('"', '')
				console.log(ddd)
				var eee = ddd.replace(',', '')
				console.log(eee)
				that.setData({
					IP: eee
				})
			},
			fail: function () {
				console.log("失败了");
			}
		})
		let that = this
		if (options.q !== undefined) {
			var scan_url = decodeURIComponent(options.q);
			if(scan_url.indexOf('shopNum') == -1){
				wx.showToast({
					title: '参数错误，请重新扫描二维码',
					icon: 'none',
					duration: 2000
				})
				return
			}
			that.setData({
				shopNum: scan_url.split('?')[1].split('&')[0].split('=')[1],
				tableNum: scan_url.split('?')[1].split('&')[1].split('=')[1]
			})
			that.getTable()
		}else if(options.shopNum != undefined){
			that.setData({
				shopNum: options.shopNum,
				tableNum: options.tableNum
			})
			that.getTable()
		} else {
			wx.showToast({
				title: '参数错误，请重新扫描二维码',
				icon: 'none',
				duration: 2000
			})
		}
		// let that = this
		// wx.getStorage({
		// 	key: 'shopInfo',
		// 	success: function (res) {
		// 		that.setData({
		// 			shopName: res.data.shopName,
		// 			shopNum:res.data.shopNum,
		// 			clerkNumber: res.data.qrCodeAddress.split('=')[1],
		// 			operatorId: res.data.operatorId,
		// 			regionNumber: res.data.regionNumber,
		// 			clerkNumber: res.data.clerkNumber,
		// 			equipmentNumber: res.data.equipmentNumber,
		// 			operatorId: res.data.qrCodeAddress.split('=')[1],
		// 			master: res.data.master,
		// 			appKey: res.data.appKey,
		// 			shopNum: wx.getStorageSync('shopNum')
		// 		})
		// 		console.log(that.data)
		// 	}

		// })
		
		
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
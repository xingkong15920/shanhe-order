//index.js
//获取应用实例
//wx.navigateTo({ url: '/pages/webview/index?url=' + encodeURIComponent('') });
const app = getApp()

const utils = require('../../utils/util.js');
Page({
	data:{
		showModalStatus:false,
		animationData:{},
		goNum:1
	},
	// toPro:function(){
	// 	wx.navigateToMiniProgram({
	// 		//appid.必须为绑定
	// 		appId: "wxab663d95bde40a31",
	// 		//跳转页面
	// 		paty:"",
	// 		//携带数据
	// 		extraData:"",
	// 	})
	// },
	goto1:function(){
		var that = this;
		if(this.data.goNum != 1){
			return
		}
		var showModalStatus = this.data.showModalStatus
		var animation = wx.createAnimation({

			duration: 600,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快

			timingFunction: 'ease',//动画的效果 默认值是linear

		})

		this.animation = animation
		setTimeout(function () {

			that.fadeIn();//调用显示动画

		}, 200)
		this.setData({
			//输出动画
			showModalStatus: !showModalStatus
		})
		// wx.navigateToMiniProgram({
		// 	//appid.必须为绑定
		// 	appId: "wxab663d95bde40a31",
		// 	//跳转页面
		// 	paty: "",
		// 	//携带数据
		// 	extraData: "",
		// })
		return
		this.setData({
			goNum:2
		})
	},
	goto2:function(){
		return
		this.setData({
			goNum: 3
		})
	},
	goto3: function () {
		return
		this.setData({
			goNum: 4
		})
	},
	goto4: function () {
		return
		this.setData({
			goNum: 5
		})
	},
	goto5: function () {
		return
		this.setData({
			goNum: 5
		})
	},
	goBtn:function(){
		wx.navigateToMiniProgram({
			//appid.必须为绑定
			appId: "wxab663d95bde40a31",
			//跳转页面
			paty: "",
			//携带数据
			extraData: "",
		})
		this.setData({
			showModalStatus: !this.data.showModalStatus
		})
	},
	imgaaa:function(){
		var that = this
		var showModalStatus = this.data.showModalStatus
		var animation = wx.createAnimation({

			duration: 600,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快

			timingFunction: 'ease',//动画的效果 默认值是linear

		})

		this.animation = animation
		setTimeout(function () {

			that.fadeIn();//调用显示动画

		}, 200)
		this.setData({
			//输出动画
			showModalStatus: !showModalStatus
		})
	
	},
	onLoad: function (options) {
		
		
		
},

// 接收 h5 页面传递过来的参数
handlePostMessage: function (e) {
	const data = e.detail;
		
	},
onReady:function(){
	
},
	fadeIn: function () {

		this.animation.translateY(0).step()

		this.setData({

			animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性

		})

	},
	fadeDown: function () {

		this.animation.translateY(300).step()

		this.setData({

			animationData: this.animation.export(),

		})

	},
})



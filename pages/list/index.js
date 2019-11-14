// pages/list/index.js
/*
//套餐组合减法需要判断
master
*/
const utils = require('../../utils/util.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ai: 'wx2874eab47f3b286f',
        sk: '1caf69c2b811514cd66389ed5e1138d0',
        oppid: "",
        code: "",
        shopName: "",
        shopNum: "",
        server: "http://images.hongxiaosou.cn/",
        //serverUrl: "https://wxdc.hongxiaosou.cn/",
		serverUrl: "http://192.168.1.250:5006/",
        //webUrl: "wss://wxdc.hongxiaosou.cn/",
		webUrl: "ws://192.168.1.250:5006/",
        master: "",
        appkey: "",
        tabletableNumber: '',
        tableNumber: '',
        regionNumser: '',
        clerkNumber: '',
        numberMeals: '',
        equipmentNumber: '',
        userArr: [],
        // userArr: [{
        //     src: "../../utils/images/Image1.png",
        // }, {
        //     src: "../../utils/images/Image2.png",
        // }, {
        //     src: "../../utils/images/Image3.png",
        // }, {
        //     src: "../../utils/images/Image4.png",
        // }],
        classArr: [{
            categoryName: "全部",
            categoryNumber: "0"
        }],
        classIndex: 0,
        showFoodArr: [],
        foodArr: [],
        foodArrr: [],
        hideModalStatus: true,
        // input默认是1
        num: 0,
        // 使用data数据对象设置样式名
        minusStatus: 'disabled',
        //设置默认数量为0
        numb: 0,
        //所选项目数量
        cartData: {},
        //购物车单品数组
        payData: [],
        //购物车总价
        payNum: 0,
        //餐品数量
        payAllNum: 0,
        //搜索值
        sousuozhi: ' ',
        //所选规格名称
        guigeName: '',
        //所选规格list
        guigeList: [],
        //规格显示
        guigeShow: '',
        //规格价格
        guigePrice: "",
        //规格索引值
        guigeIndex: '',
        //单品规格编号
        guigeNum: '',
        //组合liest
        zuheList: [],
        //组合套餐名字
        grounShowName: '',
        //套餐单组名字
        nameList: {},
        //套餐索引
        pageIndex: '',
        //组合编号
        taocanName: '',
        //组合套餐
        groupPackageNumber: '',
        //组合套餐单组记录编号
        zuheNumber: {},
        //组合套餐显示名字
        taocanShow: '',
        //组合套餐显示价格
        taocanCell: '',
        indicatorDots: true,
        beizhu: "",
        //判断图片加载完成
        loadNum: 0,
        //webscoket
        socketOpen: false,
        payTrue: true,
        payText: "提交订单",
        isWebScoket: false,
        payT: true
    },

    ////////
    /* 点击减号 */
    bindMinus: function(e) {
        this.showT()
        if (this.data.payTrue == false) {
            console.log()
            wx.showToast({
                title: '已经在支付中了，请勿再操作餐品',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return
        }
        if (this.data.payTrue == false) {
            console.log()
            wx.showToast({
                title: '已经在支付中了，请勿再操作餐品',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return
        }
        console.log(e)
        var payData = this.data.payData;
        var foodId = e.currentTarget.dataset.index;
        var foodIndex = e.currentTarget.dataset.id
        var foodList = e.currentTarget.dataset.list;
        var foodT = e.currentTarget.dataset.type;
        var cartData = this.data.cartData;
        var foodName = '';
        var foodType = '';
        var foodPrice = '';
        var productId = '';
        var foodCount = cartData[foodId] ? cartData[foodId] : 0;

        var n = 0;
        console.log(e, foodT)
        if (foodT == 'zuhe') {

            for (var i = 0; i < payData.length; i++) {
                if (foodId == payData[i].foodId && payData[i].list == foodList) {

                    cartData[foodList] = cartData[foodList] - 1;
                    payData[i].num = payData[i].num - 1;
                    foodName = payData[i].list
                    productId = payData[i].foodId + '+' + payData[i].dataTime


                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName)
                    n++;
                    break;
                }
            }
            if (cartData[foodList] <= 0) {
                cartData[foodList] = 0;
                for (var i = 0; i < payData.length; i++) {
                    if (foodId == payData[i].foodId && foodList == payData[i].list) {
                        payData.splice(i, 1)
                        if (payData.length == 0) {
                            let that = this;
                            this.setData({
                                hideModalStatus: true
                            })
                        }
                        break;
                    }
                }
            }
        } else if (foodT == '1') {
            console.log(foodId)
            cartData[foodId] = --foodCount;
            console.log(cartData[foodId])
            for (var i = 0; i < payData.length; i++) {
                if (foodId == payData[i].foodIndex) {

                    if (payData[i].foodType == 'guige') {
                        foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                        productId = payData[i].foodIndex;
                        payData[i].num = cartData[foodId];
                    } else {
                        foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                        productId = foodId
                        payData[i].num = cartData[foodId];
                    }

                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName)
                    n++;
                    break;
                }
            }
            console.log(payData)
            if (cartData[foodId] <= 0) {
                cartData[foodId] = 0;
                for (var i = 0; i < payData.length; i++) {
                    if (foodId == payData[i].foodIndex) {
                        payData.splice(i, 1)
                        if (payData.length == 0) {
                            let that = this;
                            this.setData({
                                hideModalStatus: true
                            })
                        }
                        break;
                    }
                }
            }
        } else if (foodT == 'danpin') {
            console.log('111111111111')
            foodCount = cartData[foodIndex] ? cartData[foodIndex] : 0;
            console.log(cartData[foodIndex])
            cartData[foodIndex] = --foodCount;
            for (var i = 0; i < payData.length; i++) {
                if (foodIndex == payData[i].foodIndex) {

                    if (payData[i].foodType == 'guige') {
                        foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                        productId = payData[i].foodIndex;
                        payData[i].num = cartData[foodIndex];
                    } else {
                        foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                        productId = payData[i].foodIndex
                        payData[i].num = cartData[foodIndex];
                    }

                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName)
                    n++;
                    break;
                }
            }
            console.log(payData)
            if (cartData[foodIndex] <= 0) {
                cartData[foodIndex] = 0;
                for (var i = 0; i < payData.length; i++) {
                    if (foodIndex == payData[i].foodIndex) {
                        payData.splice(i, 1)
                        if (payData.length == 0) {
                            let that = this;
                            this.setData({
                                hideModalStatus: true
                            })
                        }
                        break;
                    }
                }
            }
        } else if (foodT == 'guige') {
            console.log(e)
            console.log(foodId)
            console.log(cartData[foodId])
            foodCount = cartData[foodId] ? cartData[foodId] : 0;
            console.log(foodCount)
            console.log(cartData[foodId])
            cartData[foodId] = --foodCount;
            console.log(cartData)
            for (var i = 0; i < payData.length; i++) {
                if (foodId == payData[i].foodId) {
                    console.log(payData[i])
                    if (payData[i].foodType == 'guige') {
                        foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                        productId = payData[i].foodIndex + '+' + payData[i].foodId;
                        payData[i].num = cartData[foodId];

                    }

                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName)
                    n++;
                    break;
                }
            }
            console.log(payData)
            if (cartData[foodId] <= 0) {
                cartData[foodId] = 0;
                for (var i = 0; i < payData.length; i++) {
                    if (foodId == payData[i].foodId) {
                        payData.splice(i, 1)
                        if (payData.length == 0) {
                            let that = this;
                            this.setData({
                                hideModalStatus: true
                            })
                        }
                        break;
                    }
                }
            }
        } else {

            cartData[foodId] = --foodCount;
            for (var i = 0; i < payData.length; i++) {
                if (foodId == payData[i].foodId) {
                    console.log(payData[i])
                    if (payData[i].foodType == 'guige') {
                        foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                        productId = payData[i].foodId;
                        payData[i].num = foodCount;
                    } else {
                        foodName = payData[i].list;
                        productId = payData[i].foodId
                        payData[i].num = foodCount;
                    }

                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName)
                    n++;
                    break;
                }
            }
            if (cartData[foodId] <= 0) {
                cartData[foodId] = 0;
                for (var i = 0; i < payData.length; i++) {
                    if (foodId == payData[i].foodId) {
                        payData.splice(i, 1)
                        if (payData.length == 0) {
                            let that = this;
                            this.setData({
                                hideModalStatus: true
                            })
                        }
                        break;
                    }
                }
            }
        }



        var payNum = 0;
        var payAllNum = 0;
        for (var i = 0; i < payData.length; i++) {
            payNum += payData[i].price * payData[i].num
            payAllNum += payData[i].num

        }
        this.setData({
            cartData: cartData,
            payData: payData,
            payNum: payNum.toFixed(2),
            payAllNum: payAllNum
        });
        this.sendSocketMessage({

            "type": "food",
            "option": "minus",
            "userId": this.data.openId,
            "shopNumber": this.data.shopNum,
            "tabletableNumber": this.data.tabletableNumber,

            "body": {
                "foodName": foodName,
                "price": foodPrice,
                "productId": productId,
                "foodType": foodType
            }
        })
    },
    ////////
    /* 点击加号 */
    bindPlus: function(e) {

        this.showT()
        if (this.data.payTrue == false) {
            console.log()
            wx.showToast({
                title: '已经在支付中了，请勿再操作餐品',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return
        }

        if (e.currentTarget.dataset.index == undefined) {
            return false;
        }
        //获取购物车数组
        var payData = this.data.payData;
        //获取目标id
        var foodId = e.currentTarget.dataset.index;
        var foodList = e.currentTarget.dataset.list;
        var foodT = e.currentTarget.dataset.type;
        var cartData = this.data.cartData;
		console.log(foodId)
        for (var i = 0; i < this.data.foodArr.length; i++) {
            if (foodId == this.data.foodArr[i].packageNumber) {
                if (this.data.foodArr[i].selling2 && this.data.foodArr[i].selling2 == '0') {
                    var x = utils.formatTime(new Date()).split(' ')[1].split(':')[0];
                    var x1 = utils.formatTime(new Date()).split(' ')[1].split(':')[1];
                    var s = this.data.foodArr[i].startTime2.split(' ')[1].split(':')[0]
                    var s1 = this.data.foodArr[i].startTime2.split(' ')[1].split(':')[1]
                    var e = this.data.foodArr[i].endTime2.split(' ')[1].split(':')[0]
                    var e1 = this.data.foodArr[i].endTime2.split(' ')[1].split(':')[1]
                    var x2 = x + '' + x1
                    var s2 = s + '' + s1
                    var e2 = e + '' + e1
                    console.log(x2, s2, e2)
					if(s2 > e2){
						console.log('夜宵')
							if(x2-s2>0){
								if(x2<s2){
									wx.showToast({
										title: '该餐品不在售卖时间中，请选择其他餐品',
										icon: 'none',
										duration: 2000,
										mask: true,
									})
									return
								}
							}
						if (x2 - s2 < 0) {
							if (x2 > e2) {
								wx.showToast({
									title: '该餐品不在售卖时间中，请选择其他餐品',
									icon: 'none',
									duration: 2000,
									mask: true,
								})
								return
							}
						}
					}
					if(s2 < e2){
						console.log('早餐')
						if (x2 < s2 || x2 > e2) {
							wx.showToast({
								title: '该餐品不在售卖时间中，请选择其他餐品',
								icon: 'none',
								duration: 2000,
								mask: true,
							})
							return
						}
					}
					
                }
            }
        }
        //如果购物车数组length为0，则添加一个新数组
        if (foodT == 'zuhe') {
            var foodCount = cartData[foodList];
            var foodName, productId, foodPrice, foodType;

            for (var i = 0; i < payData.length; i++) {
                if (foodId == payData[i].foodId && payData[i].list == foodList) {
                    console.log(payData[i])
                    console.log(foodList)

                    console.log()
                    payData[i].num = payData[i].num + 1;
                    foodName = payData[i].list;
                    cartData[foodList] = cartData[foodList] + 1;
                    productId = payData[i].foodId + '+' + Date.parse(new Date())


                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName, foodPrice, foodType)
                    n++;
                    break;
                }
            }

            this.sendSocketMessage({

                "type": "food",
                "option": "add",
                "userId": this.data.openId,
                "shopNumber": this.data.shopNum,
                "tabletableNumber": this.data.tabletableNumber,

                "body": {
                    "foodName": foodName,
                    "price": foodPrice,
                    "productId": productId,
                    "foodType": foodType
                }
            })
        } else if (foodT == 'guige') {
            var foodCount = cartData[foodId];
            var foodName, productId, foodPrice, foodType;

            for (var i = 0; i < payData.length; i++) {
                if (foodId == payData[i].foodId) {
                    console.log(payData[i])

                    payData[i].num = payData[i].num + 1;
                    foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                    cartData[foodId] = parseInt(cartData[foodId]) + 1;
                    productId = payData[i].foodIndex + '+' + payData[i].foodId


                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName, foodPrice, foodType)
                    n++;
                    break;
                }
            }
            this.sendSocketMessage({

                "type": "food",
                "option": "add",
                "userId": this.data.openId,
                "shopNumber": this.data.shopNum,
                "tabletableNumber": this.data.tabletableNumber,

                "body": {
                    "foodName": foodName,
                    "price": foodPrice,
                    "productId": productId,
                    "foodType": foodType
                }
            })
        } else if (foodT == 'danpin') {
            console.log(e)
            var foodCount = cartData[foodId];
            var foodName, productId, foodPrice, foodType;
            var foodIndex = e.currentTarget.dataset.index
            console.log(foodIndex)
            for (var i = 0; i < payData.length; i++) {
                if (foodId == payData[i].foodId) {
                    console.log(payData[i])

                    payData[i].num = payData[i].num + 1;
                    foodName = payData[i].singleProductName + '(' + payData[i].normsName + ')';
                    cartData[foodId] = parseInt(cartData[foodId]) + 1;
                    productId = payData[i].foodIndex


                    foodPrice = payData[i].price;

                    foodType = payData[i].foodType

                    console.log(foodType, foodName, foodPrice, foodType)
                    n++;
                    break;
                }
            }
            this.sendSocketMessage({

                "type": "food",
                "option": "add",
                "userId": this.data.openId,
                "shopNumber": this.data.shopNum,
                "tabletableNumber": this.data.tabletableNumber,

                "body": {
                    "foodName": foodName,
                    "price": foodPrice,
                    "productId": productId,
                    "foodType": foodType
                }
            })
        } else {
            console.log(e)
            var foodCount = cartData[foodId] ? cartData[foodId] : 0;

            cartData[foodId] = ++foodCount;
            if (payData.length == 0) {
                var Obj = new Object();
                var foodName;

                for (var i = 0; i < this.data.foodArr.length; i++) {
                    if (foodId == this.data.foodArr[i].packageNumber) {
                        if (this.data.foodArr[i].selling2 && this.data.foodArr[i].selling2 == '0') {
                            
                        }
                        Obj.singleProductName = this.data.foodArr[i].singleProductName;
                        Obj.normsName = this.data.foodArr[i].normsName;
                        Obj.showPrice = this.data.foodArr[i].showPrice;
                        Obj.foodId = this.data.foodArr[i].packageNumber;
                        Obj.price = this.data.foodArr[i].packagePrice;
                        Obj.foodType = 'taocan'
                        Obj.list = '' + this.data.foodArr[i].list[0].singleProductName + '(' + this.data.foodArr[i].list[0].standardName + ')' + '*' + this.data.foodArr[i].list[0].singleQuantity;
                        for (var l = 1; l < this.data.foodArr[i].list.length; l++) {
                            Obj.list += '+' + this.data.foodArr[i].list[l].singleProductName + '(' + this.data.foodArr[i].list[l].standardName + ')' + '*' + this.data.foodArr[i].list[l].singleQuantity;
                        }
                        Obj.num = foodCount
                    }
                }
                payData.push(Obj)
                console.log(Obj, foodT)
                if (Obj.foodType == 'taocan') {
                    foodName = Obj.list
                } else if (Obj.foodType == 'guige') {
                    foodName = Obj.singleProductName + '(' + Obj.normsName + ')'
                } else if (Obj.foodType == 'danpin') {
                    foodName = Obj.singleProductName
                }
                this.sendSocketMessage({

                    "type": "food",
                    "option": "add",
                    "userId": this.data.openId,
                    "shopNumber": this.data.shopNum,
                    "tabletableNumber": this.data.tabletableNumber,

                    "body": {
                        "foodName": foodName,
                        "price": Obj.price,
                        "productId": Obj.foodId,
                        "foodType": 'taocan'
                    }
                })
            } else if (payData.length > 0) {
                //设置数组
                var n = 0;
                for (var i = 0; i < payData.length; i++) {
                    if (foodId == payData[i].foodId) {

                        if (payData[i].foodType == 'zuhe') {
                            var abNum = payData[i].num
                            abNum++
                            payData[i].num = abNum;
                        } else {
                            payData[i].num = foodCount;
                        }
                        this.sendSocketMessage({

                            "type": "food",
                            "option": "add",
                            "userId": this.data.openId,
                            "shopNumber": this.data.shopNum,
                            "tabletableNumber": this.data.tabletableNumber,

                            "body": {
                                "foodName": payData[i].list,
                                "price": payData[i].price,
                                "productId": payData[i].foodId,
                                "foodType": 'taocan'
                            }
                        })
                        n++;
                        break;
                    }
                }
                if (n == 0) {
                    var Obj = new Object();
                    for (var i = 0; i < this.data.foodArr.length; i++) {
                        if (foodId == this.data.foodArr[i].packageNumber) {

                            Obj.singleProductName = this.data.foodArr[i].singleProductName;
                            Obj.normsName = this.data.foodArr[i].normsName;
                            Obj.showPrice = this.data.foodArr[i].showPrice;
                            Obj.foodId = this.data.foodArr[i].packageNumber;

                            Obj.price = this.data.foodArr[i].packagePrice;
                            Obj.foodType = 'taocan'
                            Obj.list = '' + this.data.foodArr[i].list[0].singleProductName + '(' + this.data.foodArr[i].list[0].standardName + ')' + '*' + this.data.foodArr[i].list[0].singleQuantity;

                            for (var l = 1; l < this.data.foodArr[i].list.length; l++) {
                                Obj.list += '+' + this.data.foodArr[i].list[l].singleProductName + '(' + this.data.foodArr[i].list[l].standardName + ')' + '*' + this.data.foodArr[i].list[l].singleQuantity;
                            }
                            Obj.num = foodCount
                        }
                    }
                    payData.push(Obj)
                    this.sendSocketMessage({

                        "type": "food",
                        "option": "add",
                        "userId": this.data.openId,
                        "shopNumber": this.data.shopNum,
                        "tabletableNumber": this.data.tabletableNumber,

                        "body": {
                            "foodName": Obj.list,
                            "price": Obj.price,
                            "productId": Obj.foodId,
                            "foodType": 'taocan'
                        }
                    })
                }


            }
        }

        var payNum = 0;
        var payAllNum = 0;
        for (var i = 0; i < payData.length; i++) {
            payNum += payData[i].price * payData[i].num
            payAllNum += parseInt(payData[i].num)

        }
        this.setData({
            cartData: cartData,
            payData: payData,
            payNum: payNum.toFixed(2),
            payAllNum: parseInt(payAllNum)
        });

    },
    //规格单品加号
    bindPlusl: function(e) {
        this.showT()
        if (this.data.payTrue == false) {
            console.log()
            wx.showToast({
                title: '已经在支付中了，请勿再操作餐品',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return
        }
        console.log(e)
        if (e.currentTarget.dataset.index == undefined) {
            return false;
        }
        //获取购物车数组
        var payData = this.data.payData;
        //获取目标id
        var foodId = e.currentTarget.dataset.index;
        var cartData = this.data.cartData;
        var foodCount = cartData[foodId] ? cartData[foodId] : 0;
        cartData[foodId] = ++foodCount;
        //如果购物车数组length为0，则添加一个新数组
        if (payData.length == 0) {
            var Obj = new Object();
            for (var i = 0; i < this.data.foodArr.length; i++) {
                if (foodId == this.data.foodArr[i].singleProductNumber) {
                    Obj.foodType = 'danpin'
                    Obj.singleProductName = this.data.foodArr[i].singleProductName;
                    Obj.normsName = this.data.foodArr[i].normsName;
                    Obj.foodId = this.data.foodArr[i].shopStandarList[0].standardNumber;
                    Obj.foodIndex = this.data.foodArr[i].singleProductNumber;
                    Obj.showPrice = this.data.foodArr[i].showPrice;
                    Obj.price = this.data.foodArr[i].showPrice;
                    Obj.num = foodCount
                }
            }
            payData.push(Obj)
            this.sendSocketMessage({

                "type": "food",
                "option": "add",
                "userId": this.data.openId,
                "shopNumber": this.data.shopNum,
                "tabletableNumber": this.data.tabletableNumber,

                "body": {
                    "foodName": Obj.singleProductName + '(' + Obj.normsName + ')',
                    "price": Obj.price,
                    "productId": Obj.foodIndex,
                    "foodType": 'danpin'
                }
            })
        } else if (payData.length > 0) {
            console.log('1111')

            //设置数组
            var n = 0;
            for (var i = 0; i < payData.length; i++) {
                console.log(foodId, payData[i].foodIndex)
                if (foodId == payData[i].foodIndex) {
                    payData[i].num = foodCount;
                    this.sendSocketMessage({

                        "type": "food",
                        "option": "add",
                        "userId": this.data.openId,
                        "shopNumber": this.data.shopNum,
                        "tabletableNumber": this.data.tabletableNumber,

                        "body": {
                            "foodName": payData[i].singleProductName + '(' + payData[i].normsName + ')',
                            "price": payData[i].price,
                            "productId": payData[i].foodIndex,
                            "foodType": 'danpin'
                        }
                    })
                    n++;
                    break;
                }
            }
            if (n == 0) {
                var Obj = new Object();
                for (var i = 0; i < this.data.foodArr.length; i++) {
                    if (foodId == this.data.foodArr[i].singleProductNumber) {
                        Obj.singleProductName = this.data.foodArr[i].singleProductName;
                        Obj.normsName = this.data.foodArr[i].normsName;
                        Obj.showPrice = this.data.foodArr[i].showPrice;
                        Obj.foodId = this.data.foodArr[i].shopStandarList[0].standardNumber;
                        Obj.foodIndex = this.data.foodArr[i].singleProductNumber;
                        Obj.price = this.data.foodArr[i].showPrice;
                        Obj.foodType = 'danpin'
                        Obj.num = foodCount
                    }
                }
                payData.push(Obj)
                this.sendSocketMessage({

                    "type": "food",
                    "option": "add",
                    "userId": this.data.openId,
                    "shopNumber": this.data.shopNum,
                    "tabletableNumber": this.data.tabletableNumber,

                    "body": {
                        "foodName": Obj.singleProductName + '(' + Obj.normsName + ')',
                        "price": Obj.price,
                        "productId": Obj.foodIndex,
                        "foodType": 'danpin'
                    }
                })
            }


        }
        var payNum = 0;
        var payAllNum = 0;
        for (var i = 0; i < payData.length; i++) {
            payNum += payData[i].price * payData[i].num
            payAllNum += payData[i].num

        }
        this.setData({
            cartData: cartData,
            payData: payData,
            payNum: payNum.toFixed(2),
            payAllNum: payAllNum
        });
    },

    //选餐品
    bindCanpin: function(e) {

    },
    /* 输入框事件 （废弃）*/
    bindManual: function(e) {
        var num = e.detail.text;
        // 将数值与状态写回
        this.setData({
            num: num
        });
    },

    //选择混合套餐显示隐藏
    powerDrawer_GG: function(e) {

        var zuhe = e.currentTarget.dataset.index;
        var taocanName = this.data.taocanName;
        var taocanShow = this.data.taocanShow;
        var taocanCell = this.data.taocanCell;
        var zuheList = []
        for (var j = 0; j < this.data.foodArr.length; j++) {
            if (zuhe == this.data.foodArr[j].groupPackageNumber) {
                //console.log(this.data.foodArr[j])
                zuheList = this.data.foodArr[j].listTwo

                taocanShow = this.data.foodArr[j].groupPackageName;
                taocanCell = this.data.foodArr[j].groupPackagePrice;
                //taocanShow
            }

        }
        let that = this;
        this.setData({
            hideModalChoose: !that.data.hideModalChoose,
            zuheList: zuheList,
            groupPackageNumber: zuhe,
            taocanName: zuhe,
            taocanShow: taocanShow,
            taocanCell: taocanCell
        })
    },


    //购物车显示隐藏
    powerDrawer() {
        var payData = this.data.payData;
        if (payData.length == 0) {
            wx.showToast({
                title: '请先选择餐品',
                icon: 'none',
                duration: 2000
            })
            return
        }
        let that = this;
        this.setData({
            hideModalStatus: !that.data.hideModalStatus
        })
    },
    //搜索
    wxSearchInput: function(e) {
        var sousuozhi = this.removeAllSpace(e.detail.value);

        if (sousuozhi != '') {
            var foodArr = this.data.foodArr
            for (var i = 0; i < foodArr.length; i++) {
                if (foodArr[i].singleProductName.indexOf(sousuozhi) == -1) {
                    foodArr[i].isHide = false
                } else {
                    foodArr[i].isHide = true
                }
            }
            this.setData({
                foodArr: foodArr
            })
        } else if (sousuozhi == '') {

            var foodArr = this.data.foodArr
            for (var i = 0; i < foodArr.length; i++) {

                foodArr[i].isHide = true
            }
            this.setData({
                foodArr: foodArr
            })
        }

    },
    removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    },
    //清空购物车
    EmptyCart() {
        var that = this
        wx.showModal({
            title: '',
            content: '是否要清空购物车',
            showCancel: true, //是否显示取消按钮
            cancelText: "否", //默认是“取消”
			cancelColor: '#333', //取消文字的颜色
            confirmText: "是", //默认是“确定”
			confirmColor: '#333', //确定文字的颜色
            success: function(res) {
                if (res.cancel) {

                } else {
                    var payData = that.data.payData;
                    for (var i = 0; i < payData.length; i++) {
                        payData.splice(i, 1)
                    }
                    that.setData({
                        hideModalStatus: true,
                        //所选项目数量
                        cartData: {},
                        //购物车单品数组
                        payData: [],
                        //购物车总价
                        payNum: 0,
                        //餐品数量
                        payAllNum: 0,
                        //搜索值
                        sousuozhi: ' ',
                        //所选规格名称
                        guigeName: '',
                        //所选规格list
                        guigeList: [],
                        //规格显示
                        guigeShow: '',
                        //规格价格
                        guigePrice: "",
                        //规格索引值
                        guigeIndex: '',
                        //单品规格编号
                        guigeNum: '',
                        //组合liest
                        zuheList: [],
                        //组合套餐名字
                        grounShowName: '',
                        //套餐单组名字
                        nameList: {},
                        //套餐索引
                        pageIndex: '',
                        //组合编号
                        taocanName: '',
                        //组合套餐
                        groupPackageNumber: '',
                        //组合套餐单组记录编号
                        zuheNumber: {},
                        beizhu: ""
                    })
                    that.sendSocketMessage({

                        "type": "clearCar",
                        "option": "",
                        "userId": that.data.openId,
                        "shopNumber": that.data.shopNum,
                        "tabletableNumber": that.data.tabletableNumber,

                        "body": {
                            "foodName": "qingkong",
                            "price": "",
                            "productId": "",
                            "foodType": ""
                        }
                    })
                }



            }
        })

    },
    //提交订单
    wxpay: function() {

        if (this.data.payT != true) {
            return
        }
        this.setData({
            payT: false
        })
        if (this.data.payTrue == false) {
            wx.showToast({
                title: '已经有小伙伴在支付了，请耐心等待',
                icon: 'none',
                duration: 2000
            })

            return
        }
        wx.showLoading({
            title: '支付中...',
        })
        if (this.data.payData.length == 0) {
            this.setData({
                hideModalStatus: !this.data.hideModalStatus
            })

            return
        }
        if (this.data.payNum > 0.00) {

        } else {
            wx.showToast({
                title: '请确认餐品金额必须大于0.01',
                icon: 'none',
                duration: 2000
            })

            return
        }
        var subObj = new Object()
        //应收金额
        subObj.amountCollected = this.data.payNum
        //实收金额
        subObj.amountReceivable = this.data.payNum
        //订单金额
        subObj.orderAmount = this.data.payNum
        //找零
        subObj.cashAmount = '0';
        //店员编号
        subObj.clerkNumber = this.data.clerkNumber
        //当日点餐序号
        subObj.dateOrderNumber = '';
        //设备编号
        subObj.equipmentNumber = this.data.equipmentNumber;
        //备注
        subObj.orderRemarks = this.data.beizhu
        subObj.orderSource = '堂食'
        subObj.orderSourcePayment = '小程序点餐'
        subObj.orderType = '0'
        subObj.paymentType = '在线支付'
        //店铺编号
        subObj.shopNumber = this.data.shopNum;
        //桌台编号
        subObj.tabletableNumber = this.data.tabletableNumber;
        //区域编号
        subObj.regionNumber = this.data.regionNumber
        //桌台号
        subObj.tableNumber = this.data.tableNumber;
        //餐品合集
        subObj.foodProductsResult = []

        var canpinList = new Array();
        var payData = this.data.payData;
        var foodArr = this.data.foodArr;
        var foodArrr = this.data.foodArrr
        for (var i = 0; i < payData.length; i++) {
            var canObj = new Object();
            if (payData[i].foodType == 'taocan') {
                canObj.foodProductsType = 0
                for (var j = 0; j < foodArr.length; j++) {
                    canObj.PHR = 0;
                    canObj.VIPPrice = 0;
                    canObj.amount = 0;
                    canObj.antiNodeCount = 0;
                    canObj.endTime = 0;
                    canObj.foodProductPicture = '';
                    canObj.increasePrice = '0';
                    canObj.selling = 0;
                    canObj.sellingStatus = 0;
                    canObj.startTime = 0;
                    canObj.takeout = 0;
                    canObj.theKitchenPrin = 0;

                    if (payData[i].foodId == foodArr[j].packageNumber) {

                        //餐品名字
                        canObj.foodName = foodArr[j].packageName
                        //餐品价格
                        canObj.foodPrice = foodArr[j].packagePrice
                        //餐品数量
                        canObj.foodProductsCount = payData[i].num
                        //餐品编号
                        canObj.foodProductsNumber = foodArr[j].packageNumber
                        canObj.packageNumber = foodArr[j].packageNumber
                        // //规格编号
                        // canObj.standard = foodArr[j]
                        // //规格编号
                        // canObj.standardNumber = foodArr[j]
                        //套餐餐品合集
                        canObj.packageFood = foodArr[j].list
                    }
                }
            } else if (payData[i].foodType == 'zuhe') {
                console.log(payData[i])
                canObj.foodProductsType = 2
                for (var j = 0; j < foodArrr.length; j++) {
                    canObj.PHR = 0;
                    canObj.VIPPrice = 0;
                    canObj.amount = 0;
                    canObj.antiNodeCount = 0;
                    canObj.endTime = 0;
                    canObj.foodProductPicture = '';
                    canObj.increasePrice = '0';
                    canObj.selling = 0;
                    canObj.sellingStatus = 0;
                    canObj.startTime = 0;
                    canObj.takeout = 0;
                    canObj.theKitchenPrin = 0;
                    //餐品数量
                    canObj.foodProductsCount = payData[i].num
                    if (payData[i].foodId == foodArrr[j].groupPackageNumber) {

                        //餐品名字
                        canObj.foodName = foodArrr[j].groupPackageName
                        //餐品价格
                        canObj.foodPrice = foodArrr[j].groupPackagePrice
                        //餐品编号
                        canObj.foodProductsNumber = foodArrr[j].groupPackageNumber
                        var groupFood = []
                        var foodGroup = []
                        var food1 = []
                        var gn = '';
                        for (var gh = 0; gh < foodArrr[j].listTwo.length; gh++) {
                            if (foodArrr[j].listTwo[gh].listThree[0].length > 1) {
                                gn = foodArrr[j].listTwo[gh].listThree[0][0].groupName
                            }
                        }
                        for (var g = 0; g < foodArrr[j].listTwo.length; g++) {
                            for (var f = 0; f < foodArrr[j].listTwo[g].listThree.length; f++) {
                                for (var d = 0; d < foodArrr[j].listTwo[g].listThree[f].length; d++) {
                                    foodGroup.push(foodArrr[j].listTwo[g].listThree[f][d])
                                    if (foodArrr[j].listTwo[g].listThree[f][d].groupName == gn) {
                                        food1.push(foodArrr[j].listTwo[g].listThree[f][d])
                                    }

                                }

                            }

                        }
                        console.log(gn)
                        console.log(foodGroup)
                        console.log(food1)
                        for (var gh = 0; gh < foodArrr[j].listTwo.length; gh++) {
                            if (foodArrr[j].listTwo[gh].listThree[0].length > 1) {
                                console.log(foodArrr[j].listTwo[gh])
                            }
                        }
                        var result = []
                        var v, b;
                        for (v = 0; v < foodGroup.length; v++) {
                            for (b = v + 1; b < foodGroup.length; b++) {
                                if (foodGroup[v].singleProductName + foodGroup[v].standardName == foodGroup[b].singleProductName + foodGroup[b].standardName) {
                                    b = ++v
                                }
                            }
                            result.push(foodGroup[v]);
                        }
                        for (var o = 0; o < payData[i].numList.length; o++) {
                            for (var k = 0; k < result.length; k++) {
                                if (payData[i].numList[o] == result[k].standard) {

                                    groupFood.push(result[k])
                                    continue
                                }

                            }
                        }

                        var sssstr = '';
                        for (var gg = 0; gg < groupFood.length; gg++) {
                            if (groupFood[gg].groupName == gn) {
                                sssstr += groupFood[gg].singleProductName + groupFood[gg].standardName
                            }
                        }
                        var mg = '';
                        var mgL = []
                        for (var gh = 0; gh < foodArrr[j].listTwo.length; gh++) {
                            if (foodArrr[j].listTwo[gh].listThree[0].length > 1) {
                                for (var r = 0; r < foodArrr[j].listTwo[gh].listThree.length; r++) {
                                    var objjj = new Object()
                                    var sttr = ''
                                    for (var fd = 0; fd < foodArrr[j].listTwo[gh].listThree[r].length; fd++) {

                                        sttr += foodArrr[j].listTwo[gh].listThree[r][fd].singleProductName + foodArrr[j].listTwo[gh].listThree[r][fd].standardName
                                        objjj.mg = foodArrr[j].listTwo[gh].listThree[r][fd].minGroup

                                    }
                                    objjj.sttr = sttr

                                    mgL.push(objjj)
                                }

                            }

                        }
						console.log(mgL)
						console.log(sssstr)
                        for (var ff = 0; ff < mgL.length; ff++) {
                            if (sssstr == mgL[ff].sttr) {
                                mg = mgL[ff].mg
                            }
                        }
                        var ffood = [];
						console.log(mg)
                        for (var x = 0; x < food1.length; x++) {
                            // console.log(food1[x])
                            if (food1[x].groupName == gn && food1[x].minGroup == mg) {
                                ffood.push(food1[x])
                            }
                        }
						console.log(ffood)
                        for (var z = 0; z < groupFood.length; z++) {
                            if (groupFood[z].groupName != gn) {
                                ffood.push(groupFood[z])
                            }
                        }
                        canObj.mg = mg;
                        canObj.gn = gn;

                        var mmmg = payData[i].mg

                        // //规格编号
                        // canObj.standard = foodArr[j]
                        // //规格编号
                        // canObj.standardNumber = foodArr[j]
                        //套餐餐品合集
                        canObj.groupFood = ffood

                    }

                }
            } else if (payData[i].foodType == 'danpin' || payData[i].foodType == 'guige') {
                canObj.foodProductsType = 1
                for (var j = 0; j < foodArr.length; j++) {
                    canObj.PHR = 0;
                    canObj.VIPPrice = 0;
                    canObj.amount = 0;
                    canObj.antiNodeCount = 0;
                    canObj.endTime = 0;
                    canObj.foodProductPicture = '';
                    canObj.increasePrice = '0';
                    canObj.selling = 0;
                    canObj.sellingStatus = 0;
                    canObj.startTime = 0;
                    canObj.takeout = 0;
                    canObj.theKitchenPrin = 0;
                    //餐品数量
                    canObj.foodProductsCount = payData[i].num
                    if (payData[i].foodId == foodArr[j].singleProductNumber) {
                        //规格编号
                        canObj.standard = foodArr[j].shopStandarList[0].standardNumber;
                        canObj.standardName = foodArr[j].shopStandarList[0].standardName;
                        //规格编号
                        canObj.standardNumber = foodArr[j].singleProductNumber;
                        //餐品名字
                        canObj.foodName = foodArr[j].singleProductName
                        //餐品价格
                        canObj.foodPrice = foodArr[j].shopStandarList[0].sell;
                        //餐品编号
                        canObj.foodProductsNumber = foodArr[j].singleProductNumber;
                    } else if (payData[i].foodIndex && payData[i].foodIndex == foodArr[j].singleProductNumber) {

                        //规格编号
                        for (var k = 0; k < foodArr[j].shopStandarList.length; k++) {
                            if (payData[i].foodId == foodArr[j].shopStandarList[k].standardNumber) {
                                canObj.standard = foodArr[j].shopStandarList[k].standardNumber
                                canObj.standardName = foodArr[j].shopStandarList[k].standardName;
                                canObj.foodPrice = foodArr[j].shopStandarList[k].sell;
                            }
                        }

                        //规格编号
                        canObj.standardNumber = foodArr[j].singleProductNumber;
                        //餐品名字
                        canObj.foodName = foodArr[j].singleProductName
                        //餐品价格

                        //餐品编号
                        canObj.foodProductsNumber = foodArr[j].singleProductNumber;
                    }


                    // //规格编号
                    // canObj.standard = foodArr[j]
                    // //规格编号
                    // canObj.standardNumber = foodArr[j]
                    //套餐餐品合集
                }

            }
            canpinList.push(canObj)

        }

        console.log(canpinList)
        //用餐人数
        subObj.numberMeals = this.data.numberMeals
        subObj.foodProductsResult = canpinList
        // for (var l = 0; l < subObj.foodProductsResult.length;l++){
        // 	if (subObj.foodProductsResult[l].foodProductsType == 2){
        // 			this.minG(subObj.foodProductsResult[l])
        // 			continue
        // 		}
        // }

        // var dataJson = JSON.parse(subObj)
        // console.log(dataJson)
        let that = this
        var batch
		var dataObj = {}
		var dataS = ''

		if (payData[0].list != '' && payData[0].list) {
			var payLL = payData[0].list.split('+');
			dataS = ' --' + payData[0].singleProductName
			dataS += '\r\n' + payLL[0].split('*')[0] + '*' + payData[0].num
			for (var jj = 1; jj < payLL.length; jj++) {
				dataS += '\r\n' + payLL[jj].split('*')[0] + '*' + payData[0].num
			}
		} else {

			dataS += '\r\n' + payData[0].singleProductName + '(' + payData[0].normsName + ')' + '*' + payData[0].num
		}

		for (var ii = 1; ii < payData.length; ii++) {
			if (payData[ii].list != '' && payData[ii].list) {
				var payLL = payData[ii].list.split('+');
				dataS += '\r\n' + ' --' + payData[ii].singleProductName
				for (var kk = 0; kk < payLL.length; kk++) {
					dataS += '\r\n' + payLL[kk].split('*')[0] + '*' + payData[ii].num
				}
			} else {

				dataS += '\r\n' + payData[ii].singleProductName + '(' + payData[ii].normsName + ')' + '*' + payData[ii].num
			}

		}
		dataObj.template_id = "4q3f0NnXQCnIpnsKkBc0-1PwkGp6htyqURCrMH3dN6w",
			dataObj.keyword1 = that.data.shopName,
			dataObj.keyword2 = that.data.payNum,
			dataObj.keyword3 = '',
			dataObj.keyword4 = dataS,
			dataObj.keyword5 = that.data.beizhu,
			dataObj.appId = that.data.ai,
			dataObj.appSecret = that.data.sk
		subObj.miniAppJson = dataObj
        wx.request({
			url: that.data.serverUrl + 'hs-app-server/order/insertOrder',
            //url:"http://192.168.1.66:5003/hs-app-server/order/insertOrder",
            data: subObj,
            header: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            success: function(res) {

                if (res.data.code == '1000') {
                    var openId;
                    var sessionkey;
                    var getNum;
                    var code;
                    var that1 = this;
                    batch = res.data.data.batch;
                    getNum = res.data.data.dateOrderNumber
                    wx.login({
                        success: function(res) {
                            code = res.code
                            // var objz = {};
                            // objz.avatarUrl = res.userInfo.avatarUrl;
                            // objz.nickName = res.userInfo.nickName;
                            // wx.setStorageSync('userInfo', res.userInfo);
							
								
								var dataS = ''

								if (payData[0].list != '' && payData[0].list) {
									var payLL = payData[0].list.split('+');
									dataS = ' --' + payData[0].singleProductName
									dataS += '\r\n' + payLL[0].split('*')[0] + '*' + payData[0].num
									for (var jj = 1; jj < payLL.length; jj++) {
										dataS += '\r\n' + payLL[jj].split('*')[0] + '*' + payData[0].num
									}
								} else {

									dataS += '\r\n' + payData[0].singleProductName + '(' + payData[0].normsName + ')' + '*' + payData[0].num
								}

								for (var ii = 1; ii < payData.length; ii++) {
									if (payData[ii].list != '' && payData[ii].list) {
										var payLL = payData[ii].list.split('+');
										dataS += '\r\n' + ' --' + payData[ii].singleProductName
										for (var kk = 0; kk < payLL.length; kk++) {
											dataS += '\r\n' + payLL[kk].split('*')[0] + '*' + payData[ii].num
										}
									} else {

										dataS += '\r\n' + payData[ii].singleProductName + '(' + payData[ii].normsName + ')' + '*' + payData[ii].num
									}

								}
							var dataObj = {}
							
								dataObj.template_id = "4q3f0NnXQCnIpnsKkBc0-1PwkGp6htyqURCrMH3dN6w",
								dataObj.keyword1 = that.data.shopName,
								dataObj.keyword2 =  that.data.payNum,
								dataObj.keyword3 =  getNum,
								dataObj.keyword4 = dataS,
								dataObj.keyword5 = that.data.beizhu,
									dataObj.appId = that.data.ai,
									dataObj.appSecret = that.data.sk
								wx.request({
									//
									// url: 'https://wxcs.hongxiaosou.com/eat/wecharLittlePro',
									url: that.data.serverUrl +'hs-app-server/pay/littlePay',
									//url: "http://192.168.1.66:5003/hs-app-server/pay/littlePay",
									data: {
										code:code,
										"paymentType": "WeChat_Pay",
										"codeType": "SmallProgram_Pay",
										"equipmentNumber":'3',
										"equipmentType":'3',
										"totalMoney": that.data.payNum,
										"shopNumber": that.data.shopNum,
										"merchantNumber":'',
										"orderNo": batch,
										"ip":that.data.IP,
										"orderRemark": that.data.beizhu,
										"master": that.data.master,
										"appKey": that.data.appkey,
										"address": that.data.serverUrl + 'hs-app-server/pay/payCallback',
										//  
										"clerkNumber": that.data.clerkNumber,
										"miniAppJson": dataObj,
										"ip":that.data.IP
										// content: {
										// 	"clientNumber": that.data.operatorId,
										// 	"appid": that.data.ai,
										// 	"sk": that.data.sk,
										// 	"template_id": "4q3f0NnXQCnIpnsKkBc0-1PwkGp6htyqURCrMH3dN6w",
										// 	'keyword1': that.data.shopName,
										// 	'keyword2': that.data.payNum,
										// 	'keyword3': getNum,
										// 	'keyword4': dataS,
										// 	'keyword5': that.data.beizhu,


										// }
									},
									header: {
										'content-type': 'application/json' // 默认值
									},
									method: 'POST',
									success: function (res) {
										that.setData({
											payT: true
										})
										wx.hideLoading()
										console.log(res)
										if (res.data.data.code == 1000) {
											that.sendSocketMessage({

												"type": "cash",
												"option": "",
												"userId": that.data.openId,
												"shopNumber": that.data.shopNum,
												"tabletableNumber": that.data.tabletableNumber,

												"body": {

												}


											})
										}
										wx.requestPayment({
											'timeStamp': res.data.data.timeStamp,
											'nonceStr': res.data.data.nonceStr,
											'package': res.data.data.package,
											'signType': res.data.data.signType,
											'paySign': res.data.data.paySign,
											'success': function (res) {
												that.setData({
													hideModalStatus: true,
													//所选项目数量
													cartData: {},
													//购物车单品数组
													payData: [],
													//购物车总价
													payNum: 0,
													//餐品数量
													payAllNum: 0,
													//搜索值
													sousuozhi: ' ',
													//所选规格名称
													guigeName: '',
													//所选规格list
													guigeList: [],
													//规格显示
													guigeShow: '',
													//规格价格
													guigePrice: "",
													//规格索引值
													guigeIndex: '',
													//单品规格编号
													guigeNum: '',
													//组合liest
													zuheList: [],
													//组合套餐名字
													grounShowName: '',
													//套餐单组名字
													nameList: {},
													//套餐索引
													pageIndex: '',
													//组合编号
													taocanName: '',
													//组合套餐
													groupPackageNumber: '',
													//组合套餐单组记录编号
													zuheNumber: {},
													beizhu: ""
												})
												wx.showToast({
													title: '支付成功',
													icon: 'success',
													duration: 2000
												})
												that.sendSocketMessage({

													"type": "clearCar",
													"option": "",
													"userId": that.data.openId,
													"shopNumber": that.data.shopNum,
													"tabletableNumber": that.data.tabletableNumber,

													"body": {
														"foodName": "finish",
														"price": "",
														"productId": "",
														"foodType": ""
													}
												})
												// wx.navigateTo({
												// 	url: 'pages/webview/index',
												// })
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
												that.sendSocketMessage({

													"type": "clearCar",
													"option": "",
													"userId": that.data.openId,
													"shopNumber": that.data.shopNum,
													"tabletableNumber": that.data.tabletableNumber,

													"body": {
														"foodName": "weiwancheng",
														"price": "",
														"productId": "",
														"foodType": ""
													}
												})
											}
										})
									}
								})
							
                            
                        }
                    });
                }
            }
        })





        /**
         * 
         * 支付
         */




        // var code = wx.getStorageSync('code');
        // console.log(code)
        // return
        // wx.request({
        //     //我把文件夹名改为了wxpayapi,SERVER_PATH为服务器的域名
        //     url: SERVER_PATH + 'wxpayapi/example/jsapi.php',
        //     data: {
        //         code: code
        //     },
        //     header: {
        //         'content-type': 'application/json' // 默认值
        //     },
        //     success: function(res) {
        //         console.log(res.data);
        //         var data = res.data;
        //         wx.requestPayment({
        //             'timeStamp': data.timeStamp,
        //             'nonceStr': data.nonceStr,
        //             'package': data.package,
        //             'signType': 'MD5',
        //             'paySign': data.paySign,
        //             'success': function(res) {
        //                 console.log("支付成功！")
        //             },
        //             'fail': function(res) {}
        //         })
        //     }
        // })
    },
    //点击分类
    saveClass: function(e) {
        let index = e.currentTarget.dataset.index;
        var foodArr = this.data.foodArr
        for (var i = 0; i < foodArr.length; i++) {

            foodArr[i].isHide = true
        }

        this.setData({
            classIndex: index,
            foodArr: foodArr
        });

    },

    // 餐品获取
    getFood() {
        let that = this;
        utils.request({
            url: "food/getFood?shopNumber=" + that.data.shopNum + "&state=0" + "&isScan=0",
            success: function(res) {
                let tmpArr = that.data.foodArr;
                tmpArr = res.data
				
                that.setData({
                    foodArrr: res.data
                })
				that.foodSort()
                that.setFoodList(tmpArr)

            }
        })
    },
	foodSort:function(){
		var res = this.data.foodArrr
		for(let i = 0 ; i < res.length;i++){
			if (res[i].foodType == 2){
				// for()
				for(let f = 0 ; f < res[i].listTwo.length;f++){
					for (let k = 0; k < res[i].listTwo[f].listThree.length;k++){
					
						res[i].listTwo[f].listThree[k].sort(this.compare('serialNumber'))
						console.log(res[i].listTwo[f].listThree[k])
					}
				}
			}
		}
		console.log(res)
		return res
	},
    // 设置餐品数据
    setFoodList(arr) {
        let backArr = new Array();
        let cartData = new Object();
        for (let i in arr) {
            /*  foodType   0 ：套餐 ；   1 ：多规格单品 ；   2 ：组合 ； */

            //规格套餐数据处理
            if (arr[i].foodType == 0) {
                //设置显示单价
                arr[i].showPrice = arr[i].packagePrice;
                //设置显示套餐名称
                arr[i].singleProductName = arr[i].packageName;

                if (arr[i].packagePicture != '') {
                    arr[i].packagePicture = arr[i].packagePicture.replace('--', "")

                    if (arr[i].packagePicture.indexOf('shopPic') > 0) {
                        arr[i].foodProductsPicture = this.data.server + 'shopPic/' + arr[i].packagePicture.split('shopPic/')[1]
                    } else {
                        arr[i].foodProductsPicture = this.data.server + arr[i].packagePicture
                    }
                } else {
                    arr[i].foodProductsPicture = '../images/default.png'
                }
                //设置头像路径
                //arr[i].foodProductsPicture = arr[i].packagePicture;
                //设置显示规格名称
                arr[i].normsName = false;
                arr[i].isHide = true;
            }

            //多规格单品数据处理
            else if (arr[i].foodType == 1) {
                //选择当前菜品规格最低价展示
                if (arr[i].shopStandarList == '') {
                    continue
                }
                let obj = {
                    minPic: 0,
                    normsName: ""
                };
                for (let j in arr[i].shopStandarList) {
                    //如果存储值为默认值，或当前规格价格小于存储值，存储值更改为当前值；
                    if (arr[i].shopStandarList[j].sell <= obj.minPic || obj.minPic == 0) {
                        obj.minPic = arr[i].shopStandarList[j].sell;
                        obj.normsName = arr[i].shopStandarList[j].standardName;
                    }
                }
                if (arr[i].foodProductsPicture != '') {
                    arr[i].foodProductsPicture = arr[i].foodProductsPicture.replace('--', "")


                    if (arr[i].foodProductsPicture.indexOf('shopPic') > 0) {
                        arr[i].foodProductsPicture = this.data.server + 'shopPic/' + arr[i].foodProductsPicture.split('shopPic/')[1]
                    } else {
                        arr[i].foodProductsPicture = this.data.server + arr[i].foodProductsPicture
                    }

                } else {
                    arr[i].foodProductsPicture = '../images/default.png'

                }
				arr[i].shopStandarList.sort(this.compare1('sell'))
                //把最小存储值赋给showPrice
                arr[i].showPrice = obj.minPic;
                //设置显示规格名称
                arr[i].normsName = obj.normsName;
                arr[i].isHide = true;
            }

            //组合套餐数据处理
            else if (arr[i].foodType == 2) {

                //设置名称
                arr[i].singleProductName = arr[i].groupPackageName;
                // var arr1 = []
                // for (var i in arr[i].) {
                // 	arr.push(object[i]); //属性
                // 	//arr.push(object[i]); //值
                // }

                //设置头像路径
                arr[i].foodProductsPicture = arr[i].packagePicture;
                if (arr[i].packagePicture == '') {
                    arr[i].foodProductsPicture = '../images/default.png'
                }

                //设置显示价格
                arr[i].showPrice = arr[i].groupPackagePrice;
                //设置显示规格名称
                arr[i].normsName = false;
                arr[i].isHide = true;
                var listTwoo = arr[i].listTwo
                arr[i].listTwoo = listTwoo
                for (var j = 0; j < arr[i].listTwo.length; j++) {

                    var newArr = new Array()
                    for (var k = 0; k < arr[i].listTwo[j].listThree.length; k++) {
                        arr[i].listTwo[j].listThree[k].sort(this.compare('serialNumber'));
                        var newObj = new Object();
                        newObj.foodProductsCount = arr[i].listTwo[j].listThree[k][0].foodProductsCount
                        newObj.foodProductsNumber = arr[i].listTwo[j].listThree[k][0].foodProductsNumber
                        newObj.groupName = arr[i].listTwo[j].listThree[k][0].groupName
						if (arr[i].listTwo[j].listThree[k][0].foodProductsPicture != '' && arr[i].listTwo[j].listThree[k][0].foodProductsPicture != undefined) {
						
                            arr[i].listTwo[j].listThree[k][0].foodProductsPicture = arr[i].listTwo[j].listThree[k][0].foodProductsPicture.replace('--', "")



                            if (arr[i].listTwo[j].listThree[k][0].foodProductsPicture.indexOf('shopPic') > 0) {
                                newObj.foodProductsPicture = this.data.server + 'shopPic/' + arr[i].listTwo[j].listThree[k][0].foodProductsPicture.split('shopPic/')[1]
                            } else {
                                newObj.foodProductsPicture = this.data.server + arr[i].listTwo[j].listThree[k][0].foodProductsPicture
                            }

                        } else {
                            newObj.foodProductsPicture = '../images/default.png'
                        }

                        //newObj.foodProductsPicture = zuheList[i].listThree[k][0].foodProductsPicture
                        newObj.singleProductName = arr[i].listTwo[j].listThree[k][0].singleProductName
                        newObj.standardNumber = arr[i].listTwo[j].listThree[k][0].standardNumber
                        newObj.standard = arr[i].listTwo[j].listThree[k][0].standard
                        newObj.groupNumber = arr[i].listTwo[j].groupNumber
                        newObj.pageIndex = j
                        newObj.groupPackageNumber = arr[i].listTwo[j].groupNumber
                        newObj.foodNumber = []
                        newObj.showName = arr[i].listTwo[j].listThree[k][0].singleProductName + '(' + arr[i].listTwo[j].listThree[k][0].standardName + ')' + '*' + arr[i].listTwo[j].listThree[k][0].foodProductsCount;
                        newObj.foodNumber.push(arr[i].listTwo[j].listThree[k][0].standard)
                        for (var h = 1; h < arr[i].listTwo[j].listThree[k].length; h++) {
                            newObj.showName += '+' + arr[i].listTwo[j].listThree[k][h].singleProductName + '(' + arr[i].listTwo[j].listThree[k][h].standardName + ')' + '*' + arr[i].listTwo[j].listThree[k][h].foodProductsCount;
                            newObj.foodNumber.push(arr[i].listTwo[j].listThree[k][h].standard)
                        }
                        newArr.push(newObj)
                    }

                    arr[i].listTwo[j].listThree = newArr;
                }
            }

        }

        this.setData({
            foodArr: arr.sort(this.compare('serialNumber')),
            cartData: cartData
        })
    },

    // 规格弹窗
    powerDrawer_modal: function(e) {

        var currentStatu = e.currentTarget.dataset.statu;
        if (e.currentTarget.dataset.statu == 'close') {
            this.util(currentStatu)
            return
        }
        var guige = e.currentTarget.dataset.index;
        var guigeName = this.data.guigeName;
        var guigeList = this.data.guigeList;
        var guigeNum = this.data.guigeNum
        var guigeIndex = this.data.guigeIndex;
        var guigePrice = this.data.guigePrice;
        var guigeShow = this.data.guigeShow;
        var payData = this.data.payData
        this.util(currentStatu)
        for (var j = 0; j < this.data.foodArr.length; j++) {
            if (guige == this.data.foodArr[j].singleProductNumber) {
                guigeName = this.data.foodArr[j].singleProductName;
                guigeList = this.data.foodArr[j].shopStandarList
                // for (var i = 0; i < this.data.foodArr[j].list;i++ ){
                // 	var guigeObj = new Object();
                // 	guigeObj.singleProductName = this.data.foodArr[j].list.singleProductName;
                // 	guigeObj.normsName = this.data.foodArr[j].list.normsName;
                // 	guigeObj.showPrice = this.data.foodArr[j].list.showPrice;
                // 	guigeObj.foodId = this.data.foodArr[j].list.singleProductNumber;
                // 	console.log(guigeObj)
                // 	guigeList.push(guigeList)
                // }
            }

        }
        var aNum = 0;
        if (payData.length >= 1) {
            for (var i = 0; i < guigeList.length; i++) {
                for (var j = 0; j < payData.length; j++) {
                    if (guigeList[i].standardNumber == payData[j].foodId) {
                        guigeIndex = guigeList[i].standardNumber;
                        guigePrice = guigeList[i].sell;
                        guigeShow = guigeName + '(' + guigeList[i].standardName + ')',
                            aNum++
                            break
                    }
                }
            }
        }
        if (aNum == 0) {
            this.setData({
                guigeName: guigeName,
                guigeList: guigeList,
                guigeIndex: guigeList[0].standardNumber,
                guigePrice: guigeList[0].sell,
                guigeShow: guigeName + '(' + guigeList[0].standardName + ')',
                guigeNum: guige
            })
        } else {
            this.setData({
                guigeName: guigeName,
                guigeList: guigeList,
                guigeIndex: guigeIndex,
                guigePrice: guigePrice,
                guigeShow: guigeShow,
                guigeNum: guige
            })
        }



        // console.log('2222', this.data.cartData[guigeIndex])
        // this.setData({
        // 	guigeName: guigeName,
        // 	guigeList: guigeList,
        // 	guigeIndex: guigeList[0].standardNumber,
        // 	guigePrice: guigeList[0].sell,
        // 	guigeShow: guigeName + '(' + guigeList[0].standardName + ')',
        // 	guigeNum: guige
        // })


    },
    //规格点击
    guigeClick: function(e) {
        let index = e.currentTarget.dataset.index;

        var guigeNum = e.currentTarget.dataset.index;
        var guigeList = this.data.guigeList;
        var guigePrice = this.data.guigePrice;
        var guigeShow = this.data.guigeShow;
        var guigeName = this.data.guigeName
        for (var i = 0; i < guigeList.length; i++) {
            if (index == guigeList[i].standardNumber) {
                guigePrice = guigeList[i].sell
                guigeShow = guigeName + '(' + guigeList[i].standardName + ')'
            }
        }
        this.setData({
            guigeIndex: index,
            guigePrice: guigePrice,
            guigeShow: guigeShow,

        });

    },
    //规格内加号
    bindPlusk: function(e) {
        this.showT()
        if (this.data.payTrue == false) {
            console.log()
            wx.showToast({
                title: '已经在支付中了，请勿再操作餐品',
                icon: 'none',
                duration: 1500,
                mask: true,
            })
            return
        }
        if (e.currentTarget.dataset.index == undefined) {
            return false;
        }
        //获取购物车数组
        var payData = this.data.payData;
        //获取目标id
        var foodId = e.currentTarget.dataset.foodid;
        var foodIndex = e.currentTarget.dataset.index;
        var cartData = this.data.cartData;
        var foodCount = cartData[foodIndex] ? cartData[foodIndex] : 0;
        cartData[foodIndex] = ++foodCount;
        //如果购物车数组length为0，则添加一个新数组
        if (payData.length == 0) {
            var Obj = new Object();
            for (var i = 0; i < this.data.foodArr.length; i++) {
                if (foodId == this.data.foodArr[i].singleProductNumber) {

                    for (var j = 0; j < this.data.foodArr[i].shopStandarList.length; j++) {
                        if (foodIndex == this.data.foodArr[i].shopStandarList[j].standardNumber) {
                            Obj.price = this.data.foodArr[i].shopStandarList[j].sell;
                            Obj.normsName = this.data.foodArr[i].shopStandarList[j].standardName;
                            Obj.foodId = this.data.foodArr[i].shopStandarList[j].standardNumber;

                        }

                    }
                    Obj.num = foodCount
                    Obj.foodType = 'guige'
                    Obj.singleProductName = this.data.foodArr[i].singleProductName;
                    Obj.foodIndex = this.data.foodArr[i].singleProductNumber;
                    Obj.showPrice = this.data.foodArr[i].showPrice;
                }
            }
            payData.push(Obj)
            this.sendSocketMessage({

                "type": "food",
                "option": "add",
                "userId": this.data.openId,
                "shopNumber": this.data.shopNum,
                "tabletableNumber": this.data.tabletableNumber,

                "body": {
                    "foodName": Obj.singleProductName + '(' + Obj.normsName + ')',
                    "price": Obj.price,
                    "productId": Obj.foodIndex + '+' + Obj.foodId,
                    "foodType": 'guige'
                }
            })
        } else if (payData.length > 0) {
            //设置数组
            var n = 0;
            for (var i = 0; i < payData.length; i++) {
                if (foodIndex == payData[i].foodId) {
                    payData[i].num = foodCount;
                    this.sendSocketMessage({

                        "type": "food",
                        "option": "add",
                        "userId": this.data.openId,
                        "shopNumber": this.data.shopNum,
                        "tabletableNumber": this.data.tabletableNumber,

                        "body": {
                            "foodName": payData[i].singleProductName + '(' + payData[i].normsName + ')',
                            "price": payData[i].price,
                            "productId": payData[i].foodIndex + '+' + payData[i].foodId,
                            "foodType": 'guige'
                        }
                    })
                    n++
                }

            }
            if (n == 0) {
                var Obj = new Object();
                for (var i = 0; i < this.data.foodArr.length; i++) {
                    if (foodId == this.data.foodArr[i].singleProductNumber) {

                        for (var j = 0; j < this.data.foodArr[i].shopStandarList.length; j++) {
                            if (foodIndex == this.data.foodArr[i].shopStandarList[j].standardNumber) {
                                Obj.price = this.data.foodArr[i].shopStandarList[j].sell;
                                Obj.normsName = this.data.foodArr[i].shopStandarList[j].standardName;
                                Obj.foodId = this.data.foodArr[i].shopStandarList[j].standardNumber;

                            }

                        }
                        Obj.num = foodCount
                        Obj.foodType = 'guige'
                        Obj.singleProductName = this.data.foodArr[i].singleProductName;
                        Obj.foodIndex = this.data.foodArr[i].singleProductNumber;
                        Obj.showPrice = this.data.foodArr[i].showPrice;

                    }
                }
                payData.push(Obj)
                this.sendSocketMessage({

                    "type": "food",
                    "option": "add",
                    "userId": this.data.openId,
                    "shopNumber": this.data.shopNum,
                    "tabletableNumber": this.data.tabletableNumber,

                    "body": {
                        "foodName": Obj.singleProductName + '(' + Obj.normsName + ')',
                        "price": Obj.price,
                        "productId": Obj.foodIndex + '+' + Obj.foodId,
                        "foodType": 'guige'
                    }
                })
            }


        }
        var payNum = 0;
        var payAllNum = 0;
        for (var i = 0; i < payData.length; i++) {
            payNum += payData[i].price * payData[i].num
            payAllNum += payData[i].num

        }
        this.setData({
            cartData: cartData,
            payData: payData,
            payNum: payNum.toFixed(2),
            payAllNum: payAllNum
        });
    },
    clickZuhe: function(e) {
        var index = e.currentTarget.dataset.foodid;
        var name = e.currentTarget.dataset.foodname
        var pageIndex = e.currentTarget.dataset.pageindex;
        var nameList = this.data.nameList;
        nameList[pageIndex] = name;
        var zuheNumber = this.data.zuheNumber;
        zuheNumber[pageIndex] = index
        this.setData({
            nameList: nameList,
            pageIndex: pageIndex,
            zuheNumber: zuheNumber
        })
        //console.log(this.data.pageIndex)
    },
    delzuhe: function(e) {
        var nameList = this.data.nameList
        var i = e.currentTarget.dataset.index
        delete(nameList[i])
        this.setData({
            nameList: nameList
        })
    },
    goPayData: function() {
        var nameList = this.data.nameList;
        var zuheNumber = this.data.zuheNumber;
        var groupPackageNumber = this.data.groupPackageNumber;
        var cartData = this.data.cartData;
        if (Object.keys(nameList).length < 2) {
            wx.showToast({
                title: '分组所选商品不足',
                icon: 'none',
                duration: 10000
            })
            setTimeout(function() {
                wx.hideToast()
            }, 2000)
            return
        }
        var payData = this.data.payData;
        var nObj = new Object()
        var nameObj = Object.keys(nameList)
        var taocanName = this.data.taocanName;
        var dataTime = Date.parse(new Date())
        for (var i = 0; i < this.data.foodArr.length; i++) {
            if (taocanName == this.data.foodArr[i].groupPackageNumber) {
                nObj.num = 1
                nObj.foodType = 'zuhe'
                nObj.singleProductName = this.data.foodArr[i].singleProductName;
                nObj.price = this.data.foodArr[i].groupPackagePrice;
                nObj.showPrice = this.data.foodArr[i].showPrice;
                nObj.foodId = this.data.foodArr[i].groupPackageNumber;
            }
        }
        nObj.list = nameList[0]
        nObj.numList = []
        nObj.dataTime = dataTime;
        for (var g = 0; g < zuheNumber[0].length; g++) {
            nObj.numList.push(zuheNumber[0][g])
        }
        for (var b = 1; b < nameObj.length; b++) {
            nObj.list += '+' + nameList[b]
            for (var f = 0; f < zuheNumber[b].length; f++) {
                nObj.numList.push(zuheNumber[b][f])
            }
        }
        var isDeff = 0;
        for (var t = 0; t < payData.length; t++) {
            if (nObj.list == payData[t].list) {
                var bb = payData[t].num;
                bb++
                payData[t].num = bb;
                isDeff++
                break;
            }
        }
        if (isDeff == 0) {
            payData.push(nObj)
        }
        console.log(payData)
        var foodCount = cartData[nObj.list] ? cartData[nObj.list] : 0;
        this.sendSocketMessage({

            "type": "food",
            "option": "add",
            "userId": this.data.openId,
            "shopNumber": this.data.shopNum,
            "tabletableNumber": this.data.tabletableNumber,

            "body": {
                "foodName": nObj.list,
                "price": nObj.showPrice,
                "productId": nObj.foodId + '+' + dataTime,
                "foodType": 'zuhe'
            }
        })
        cartData[nObj.list] = foodCount + 1
        var payNum = 0;
        var payAllNum = 0;
        for (var i = 0; i < payData.length; i++) {
            payNum += payData[i].price * payData[i].num
            payAllNum += payData[i].num
        }
        this.setData({
            payData: payData,
            nameList: {},
            zuheNumber: {},
            payNum: payNum.toFixed(2),
            payAllNum: payAllNum,
            hideModalChoose: !this.data.hideModalChoose,
        })

    },
    //获取备注信息
    getinfo: function(e) {
        this.setData({
            beizhu: e.detail.value
        })
    },

    powerDrawer_GG1: function() {
        this.setData({
            nameList: {},
            zuheNumber: {},
            hideModalChoose: !this.data.hideModalChoose,
        })
    },
    //判断图片加载完成

    imageLoad: function(e) {
        var code;
        var that = this
        var nn = this.data.loadNum;
        nn++;
		if(this.data.foodArr.length == 0){
			wx.hideLoading()
			return
		}
		if (nn == this.data.foodArr.length){
			wx.hideLoading()
			return
		}
        if (nn > 3 || nn == this.data.foodArr.length - 1) {
            // this.setData({
            // 	loadNum: nn
            // })
			wx.hideLoading()
            return
        }
        if (nn == 3 || nn == this.data.foodArr.length - 1) {
            console.log(nn == 3)
            wx.hideLoading()
            if (nn == 3) {
                //return为关闭多人协同点餐
                return
                var that = that
                wx.login({
                    success: function(res) {
                        code = res.code
                        console.log(that.data)
                        wx.request({
                            url: that.data.serverUrl + 'hs-app-server/weChat/code',
                            //url: "http://192.168.1.190:5003/hs-app-server/weChat/code",
                            data: {
                                code: code,
                            },
                            method: 'GET',
                            // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT                      // 
                            header: {}, // 设置请求的 header                      
                            success: function(res) {
                                that.setData({
                                    openId: res.data.data.openid,
                                    code: code
                                })

                                wx.request({
                                    url: that.data.serverUrl + 'hs-app-server/weChat/saveUserInfoByOpenid',
                                    //url: "http://192.168.1.190:5003/hs-app-server/weChat/code",
                                    data: {
                                        openid: res.data.data.openid,
                                        imgUrl: wx.getStorageSync('userInfo').avatarUrl,
                                        userName: wx.getStorageSync('userInfo').nickName
                                    },
                                    method: 'GET',
                                    // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT                      // 
                                    header: {}, // 设置请求的 header                      
                                    success: function(res) {
                                        wx.request({
                                            url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + that.data.openId,
                                            success: function(res) {
                                                console.log(res)
                                            }
                                        })
                                        wx.setStorageSync('openId', that.data.openId)
                                        wx.setStorageSync('tabletableNumber', that.data.tabletableNumber)
                                        wx.connectSocket({
                                            url: that.data.webUrl + 'hs-app-server/websocket/' + that.data.openId + '/' + that.data.shopNum + '/' + that.data.tabletableNumber + '/' + that.data.ai,

                                            header: {
                                                'content-type': 'application/json'
                                            },
                                            method: "GET"
                                        })
                                        wx.onSocketOpen(function(res) {
                                            console.log('WebSocket连接已打开！')
                                            that.setData({
                                                socketOpen: true,
                                                isWebScoket: true
                                            })
                                            app.globalData.isWs = true;
                                            that.sendSocketMessage({

                                                "type": "userAdd",
                                                "option": "",
                                                "userId": that.data.openId,
                                                "shopNumber": that.data.shopNum,
                                                "tabletableNumber": that.data.tabletableNumber,

                                                "body": {

                                                }


                                            })
                                            //sendSocketMessage(socketMsgQueue)
                                        })
                                        wx.onSocketClose(function(res) {
                                                console.log('WebSocket连接已断开！')
                                                that.sendSocketMessage({

                                                    "type": "userDel",
                                                    "option": "",
                                                    "userId": that.data.openId,
                                                    "shopNumber": that.data.shopNum,
                                                    "tabletableNumber": that.data.tabletableNumber,

                                                    "body": {

                                                    }


                                                })
                                                that.setData({
                                                    socketOpen: false
                                                })
                                                app.globalData.iswS = false
                                                //sendSocketMessage(socketMsgQueue)
                                            }),

                                            //wx.closeSocket()
                                            wx.onSocketMessage(function(res) {
                                                console.log(res)

                                                var data = JSON.parse(res.data)
                                                if (data.msgType == 'userList') {
                                                    console.log(data.body)
                                                    that.setData({
                                                        userArr: data.body
                                                    })
                                                } else if (data.msgType == "shopCar") {
                                                    console.log(data.body)
                                                    var foodList1 = []
                                                    var foodList2 = []
                                                    var payData = that.data.payData;
                                                    var cartData = that.data.cartData;
                                                    var foodCount = cartData[data.body.productId] ? cartData[data.body.productId] : 0;
                                                    for (let r in data.body) {

                                                        // if (datadata.body[r])

                                                        var kk = that.getValue(data.body[r])
                                                        console.log(data.body[r].length)
                                                        for (let y in data.body[r]) {
                                                            // if (data.body[r][y].foodType == 'undefined') {
                                                            // 	console.log('111111')
                                                            // 	continue
                                                            // }
                                                            foodList2.push(data.body[r][y])
                                                            console.log(data.body[r][y])
                                                        }


                                                    }
                                                    console.log(foodList2)
                                                    for (var h = 0; h < foodList2.length; h++) {
                                                        that.delChong(foodList2[h], foodList1)
                                                    }
                                                    console.log(foodList1)
                                                    if (foodList1.length == 0) {
                                                        return
                                                    }
                                                    console.log(foodList1.length)
                                                    for (var l = 0; l < foodList1.length; l++) {

                                                        console.log(foodList1[l].foodType, foodList1[l].foodName)
                                                        console.log(foodList1[l].foodType)
                                                        if (foodList1[l].foodType == 'taocan') {
                                                            var foodList2 = foodList1[l]
                                                            var Obj = new Object();
                                                            for (var i = 0; i < that.data.foodArr.length; i++) {
                                                                if (foodList2.productId == that.data.foodArr[i].packageNumber) {
                                                                    Obj.singleProductName = that.data.foodArr[i].singleProductName;
                                                                    Obj.normsName = that.data.foodArr[i].normsName;
                                                                    Obj.showPrice = that.data.foodArr[i].showPrice;
                                                                    Obj.foodId = that.data.foodArr[i].packageNumber;
                                                                    Obj.price = that.data.foodArr[i].packagePrice;
                                                                    Obj.foodType = 'taocan'
                                                                    Obj.list = '' + that.data.foodArr[i].list[0].singleProductName + '(' + that.data.foodArr[i].list[0].standardName + ')' + '*' + that.data.foodArr[i].list[0].singleQuantity;
                                                                    console.log(that.data.foodArr[i].list)
                                                                    for (var ll = 1; ll < that.data.foodArr[i].list.length; ll++) {
                                                                        Obj.list += '+' + that.data.foodArr[i].list[ll].singleProductName + '(' + that.data.foodArr[i].list[ll].standardName + ')' + '*' + that.data.foodArr[i].list[ll].singleQuantity;
                                                                    }
                                                                    Obj.num = parseInt(foodList2.foodCount)
                                                                }
                                                            }
                                                            payData.push(Obj)
                                                            console.log(Obj)
                                                            console.log(foodList2.productId, foodList2.foodCount)
                                                            cartData[foodList2.productId] = foodList2.foodCount
                                                        }


                                                        if (foodList1[l].foodType == 'danpin') {
                                                            console.log('1111')
                                                            var foodList4 = foodList1[l];
                                                            var Obj = new Object();
                                                            for (var i = 0; i < that.data.foodArr.length; i++) {
                                                                console.log()
                                                                if (foodList4.productId == that.data.foodArr[i].singleProductNumber) {

                                                                    Obj.price = that.data.foodArr[i].shopStandarList[0].sell;
                                                                    Obj.normsName = that.data.foodArr[i].shopStandarList[0].standardName;
                                                                    Obj.foodIndex = that.data.foodArr[i].singleProductNumber;
                                                                    Obj.num = parseInt(foodList4.foodCount)
                                                                    Obj.foodType = 'danpin'
                                                                    Obj.singleProductName = that.data.foodArr[i].singleProductName;
                                                                    Obj.foodId = that.data.foodArr[i].singleProductNumber;
                                                                    Obj.showPrice = that.data.foodArr[i].showPrice;


                                                                }
                                                            }
                                                            payData.push(Obj)
                                                            console.log(Obj)
                                                            cartData[Obj.foodId] = foodList1[l].foodCount
                                                        }
                                                        if (foodList1[l].foodType == 'guige') {
                                                            console.log('1111111111111')
                                                            console.log(foodList1[l])
                                                            var Obj = new Object();
                                                            var fi = foodList1[l].productId.split('+')[0]
                                                            for (var i = 0; i < that.data.foodArr.length; i++) {
                                                                console.log()

                                                                if (fi == that.data.foodArr[i].singleProductNumber) {

                                                                    for (var j = 0; j < that.data.foodArr[i].shopStandarList.length; j++) {
                                                                        if (foodList1[l].foodName.split('(')[1].split(')')[0] == that.data.foodArr[i].shopStandarList[j].standardName) {
                                                                            Obj.price = that.data.foodArr[i].shopStandarList[j].sell;
                                                                            Obj.normsName = that.data.foodArr[i].shopStandarList[j].standardName;
                                                                            Obj.foodId = that.data.foodArr[i].shopStandarList[j].standardNumber;
                                                                        }

                                                                        Obj.num = parseInt(foodList1[l].foodCount)
                                                                        Obj.foodType = 'guige'
                                                                        Obj.singleProductName = that.data.foodArr[i].singleProductName;
                                                                        Obj.foodIndex = that.data.foodArr[i].singleProductNumber;
                                                                        Obj.showPrice = that.data.foodArr[i].showPrice;
                                                                    }



                                                                }
                                                            }
                                                            payData.push(Obj)
                                                            cartData[Obj.foodId] = foodList1[l].foodCount
                                                        }
                                                        if (foodList1[l].foodType == 'zuhe') {
                                                            var Obj = new Object();
                                                            for (var z = 0; z < that.data.foodArrr.length; z++) {
                                                                if (foodList1[l].productId.split('+')[0] == that.data.foodArrr[z].groupPackageNumber) {
                                                                    Obj.num = parseInt(foodList1[l].foodCount)
                                                                    Obj.foodType = 'zuhe'
                                                                    Obj.singleProductName = that.data.foodArrr[z].groupPackageName;
                                                                    Obj.price = that.data.foodArrr[z].groupPackagePrice;
                                                                    Obj.showPrice = that.data.foodArrr[z].showPrice;
                                                                    Obj.foodId = that.data.foodArrr[z].groupPackageNumber;
                                                                    Obj.list = foodList1[l].foodName;
                                                                    Obj.dataTime = foodList1[l].productId.split('+')[1]
                                                                    Obj.numList = [];
                                                                    var foodG = [];
                                                                    var foodGG = []
                                                                    var fdList = foodList1[l].foodName.split('+')

                                                                    for (var g = 0; g < that.data.foodArrr[z].listTwo.length; g++) {
                                                                        for (var f = 0; f < that.data.foodArrr[z].listTwo[g].listThree.length; f++) {
                                                                            for (var d = 0; d < that.data.foodArrr[z].listTwo[g].listThree[f].length; d++) {
                                                                                var aaaa = that.data.foodArrr[z].listTwo[g].listThree[f][d];
                                                                                var fNum = 0;
                                                                                for (var ii = 0; ii < foodG.length; ii++) {
                                                                                    if (foodG[ii].standard == aaaa.standard) {
                                                                                        fNum++;
                                                                                        break
                                                                                    }
                                                                                }
                                                                                if (fNum == 0) {
                                                                                    foodG.push(aaaa)
                                                                                }

                                                                            }

                                                                        }

                                                                    }
                                                                    console.log(foodG)
                                                                    for (var c = 0; c < fdList.length; c++) {
                                                                        for (var cc = 0; cc < foodG.length; cc++) {
                                                                            console.log()
                                                                            if (fdList[c].split('*')[0] == foodG[cc].singleProductName + '(' + foodG[cc].standardName + ')') {

                                                                                Obj.numList.push(foodG[cc].standardNumber)
                                                                                break
                                                                            }
                                                                        }

                                                                    }
                                                                }
                                                            }
                                                            payData.push(Obj)
                                                            cartData[foodList1[l].foodName] = foodList1[l].foodCount
                                                        }


                                                    }
                                                    //单品单规格时需要测试，然后单品多规格需要增加判断加入循环
                                                    var payNum = 0;
                                                    var payAllNum = 0;
                                                    for (var i = 0; i < payData.length; i++) {
                                                        payNum += payData[i].price * payData[i].num
                                                        payAllNum += parseInt(payData[i].num)

                                                    }
                                                    console.log(payData)
                                                    that.setData({
                                                        cartData: cartData,
                                                        payData: payData,
                                                        payNum: payNum.toFixed(2),
                                                        payAllNum: payAllNum
                                                    });
                                                } else if (data.type == 'food') {
                                                    console.log('duorendiancan')
                                                    console.log(data)
                                                    var name1 = '';
                                                    wx.request({
                                                        url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + data.userId,
                                                        success: function(res) {
                                                            if (res.data.code == 1000) {
                                                                name1 = res.data.data.userName;
                                                            }

                                                            if (data.option == 'minus') {
                                                                wx.showToast({
                                                                    title: name1 + '取消了餐品:' + data.body.foodName,
                                                                    icon: 'none',
                                                                    duration: 300
                                                                })
                                                                var payData = that.data.payData;
                                                                var cartData = that.data.cartData;


                                                                if (data.body.foodType == 'danpin') {
                                                                    for (var i = 0; i < payData.length; i++) {
                                                                        if (data.body.productId == payData[i].foodIndex) {
                                                                            console.log(payData[i].num)
                                                                            payData[i].num = payData[i].num - 1;
                                                                            cartData[payData[i].foodIndex] = payData[i].num
                                                                            console.log(cartData)
                                                                            console.log(payData[i].num)
                                                                            if (payData[i].num == 0) {
                                                                                payData.splice(i, 1)
                                                                                if (payData.length == 0) {

                                                                                    that.setData({
                                                                                        hideModalStatus: true
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                } else if (data.body.foodType == 'taocan') {
                                                                    for (var i = 0; i < payData.length; i++) {
                                                                        if (data.body.productId == payData[i].foodId) {
                                                                            console.log(payData[i].num)
                                                                            payData[i].num = payData[i].num - 1;
                                                                            cartData[data.body.productId] = cartData[data.body.productId] - 1;
                                                                            console.log(payData[i].num)
                                                                            if (payData[i].num == 0) {
                                                                                payData.splice(i, 1)
                                                                                if (payData.length == 0) {

                                                                                    that.setData({
                                                                                        hideModalStatus: true
                                                                                    })
                                                                                }
                                                                            }

                                                                        }
                                                                    }
                                                                } else if (data.body.foodType == 'guige') {
                                                                    var fi = data.body.productId.split('+')[0]
                                                                    for (var i = 0; i < payData.length; i++) {
                                                                        if (fi == payData[i].foodIndex && data.body.foodName.split('(')[1].split(')')[0] == payData[i].normsName) {
                                                                            console.log(payData[i].num)
                                                                            payData[i].num = payData[i].num - 1;
                                                                            cartData[payData[i].foodId] = cartData[payData[i].foodId] - 1;
                                                                            console.log(payData[i].num)
                                                                            if (payData[i].num == 0) {
                                                                                payData.splice(i, 1)
                                                                                if (payData.length == 0) {

                                                                                    that.setData({
                                                                                        hideModalStatus: true
                                                                                    })
                                                                                }
                                                                            }

                                                                        }
                                                                    }
                                                                    console.log(payData)
                                                                } else if (data.body.foodType == 'zuhe') {
                                                                    for (var i = 0; i < payData.length; i++) {
                                                                        if (data.body.productId.split('+')[0] == payData[i].foodId && data.body.foodName == payData[i].list) {
                                                                            console.log(payData[i].num)
                                                                            cartData[payData[i].list] = cartData[payData[i].list] - 1
                                                                            payData[i].num = payData[i].num - 1;
                                                                            console.log(payData[i].num)
                                                                            if (payData[i].num == 0) {
                                                                                payData.splice(i, 1)
                                                                                if (payData.length == 0) {

                                                                                    that.setData({
                                                                                        hideModalStatus: true
                                                                                    })
                                                                                }
                                                                            }

                                                                        }
                                                                    }
                                                                    console.log(payData)
                                                                }
                                                                var payNum = 0;
                                                                var payAllNum = 0;
                                                                for (var i = 0; i < payData.length; i++) {
                                                                    payNum += payData[i].price * payData[i].num
                                                                    payAllNum += payData[i].num

                                                                }
                                                                that.setData({
                                                                    cartData: cartData,
                                                                    payData: payData,
                                                                    payNum: payNum.toFixed(2),
                                                                    payAllNum: payAllNum
                                                                });
                                                                console.log(that.data.payData)
                                                            } else if (data.option == 'add') {
                                                                console.log('添加了餐品')
                                                                wx.showToast({
                                                                    title: name1 + '点了餐品:' + data.body.foodName,
                                                                    icon: 'none',
                                                                    duration: 800
                                                                })
                                                                var payData = that.data.payData;
                                                                var cartData = that.data.cartData;
                                                                var foodCount = cartData[data.body.productId] ? cartData[data.body.productId] : 0;
                                                                var dNum = 0;
                                                                if (data.body.foodType == 'danpin') {
                                                                    for (var k = 0; k < payData.length; k++) {

                                                                        if (data.body.productId == payData[k].foodIndex) {

                                                                            console.log(cartData)
                                                                            var sdd = parseInt(payData[k].num)
                                                                            payData[k].num = sdd + 1;
                                                                            cartData[data.body.productId] = sdd + 1;
                                                                            dNum++;
                                                                            console.log(dNum)
                                                                            break;
                                                                        }


                                                                    }

                                                                } else if (data.body.foodType == 'guige') {
                                                                    var fi = data.body.productId.split('+')[0]
                                                                    for (var k = 0; k < payData.length; k++) {

                                                                        if (fi == payData[k].foodIndex && data.body.foodName.split('(')[1].split(')')[0] == payData[k].normsName) {

                                                                            cartData[payData[k].foodId] = cartData[payData[k].foodId] + 1;
                                                                            console.log(cartData)
                                                                            payData[k].num = payData[k].num + 1
                                                                            dNum++;
                                                                            console.log(dNum)
                                                                            break;
                                                                        }


                                                                    }
                                                                } else if (data.body.foodType == 'zuhe') {
                                                                    for (var k = 0; k < payData.length; k++) {

                                                                        if (data.body.productId.split('+')[0] == payData[k].foodId && data.body.foodName == payData[k].list) {
                                                                            cartData[payData[k].list] = cartData[payData[k].list] + 1;


                                                                            payData[k].num = payData[k].num + 1
                                                                            dNum++;
                                                                            console.log(dNum)
                                                                            break;
                                                                        }


                                                                    }
                                                                } else if (data.body.foodType == 'taocan') {
                                                                    for (var k = 0; k < payData.length; k++) {

                                                                        if (data.body.productId == payData[k].foodId) {
                                                                            cartData[data.body.productId] = parseInt(cartData[data.body.productId]) + 1;
                                                                            console.log(cartData)
                                                                            payData[k].num = payData[k].num + 1
                                                                            dNum++;
                                                                            console.log(dNum)
                                                                            break;
                                                                        }


                                                                    }
                                                                }

                                                                if (dNum == 0) {
                                                                    console.log(dNum)
                                                                    console.log(1111)
                                                                    if (data.body.foodType == 'taocan') {
                                                                        var Obj = new Object();
                                                                        for (var i = 0; i < that.data.foodArr.length; i++) {
                                                                            if (data.body.productId == that.data.foodArr[i].packageNumber) {
                                                                                Obj.singleProductName = that.data.foodArr[i].singleProductName;
                                                                                Obj.normsName = that.data.foodArr[i].normsName;
                                                                                Obj.showPrice = that.data.foodArr[i].showPrice;
                                                                                Obj.foodId = that.data.foodArr[i].packageNumber;
                                                                                Obj.price = that.data.foodArr[i].packagePrice;
                                                                                Obj.foodType = 'taocan'
                                                                                Obj.list = '' + that.data.foodArr[i].list[0].singleProductName + '(' + that.data.foodArr[i].list[0].standardName + ')' + '*' + that.data.foodArr[i].list[0].singleQuantity;
                                                                                for (var l = 1; l < that.data.foodArr[i].list.length; l++) {
                                                                                    Obj.list += '+' + that.data.foodArr[i].list[l].singleProductName + '(' + that.data.foodArr[i].list[l].standardName + ')' + '*' + that.data.foodArr[i].list[l].singleQuantity;
                                                                                }
                                                                                Obj.num = 1
                                                                            }
                                                                        }
                                                                        payData.push(Obj)
                                                                        cartData[data.body.productId] = 1
                                                                    } else if (data.body.foodType == 'danpin') {
                                                                        var Obj = new Object();
                                                                        for (var i = 0; i < that.data.foodArr.length; i++) {
                                                                            console.log()
                                                                            if (data.body.productId == that.data.foodArr[i].singleProductNumber) {

                                                                                Obj.price = that.data.foodArr[i].shopStandarList[0].sell;
                                                                                Obj.normsName = that.data.foodArr[i].shopStandarList[0].standardName;
                                                                                Obj.foodId = that.data.foodArr[i].shopStandarList[0].standardNumber;
                                                                                Obj.num = 1
                                                                                Obj.foodType = 'danpin'
                                                                                Obj.singleProductName = that.data.foodArr[i].singleProductName;
                                                                                Obj.foodIndex = that.data.foodArr[i].singleProductNumber;
                                                                                Obj.showPrice = that.data.foodArr[i].showPrice;


                                                                            }
                                                                        }
                                                                        payData.push(Obj)
                                                                        cartData[data.body.productId] = 1
                                                                    } else if (data.body.foodType == 'guige') {
                                                                        var Obj = new Object();
                                                                        var fi = data.body.productId.split('+')[0]
                                                                        for (var i = 0; i < that.data.foodArr.length; i++) {
                                                                            console.log()

                                                                            if (fi == that.data.foodArr[i].singleProductNumber) {

                                                                                for (var j = 0; j < that.data.foodArr[i].shopStandarList.length; j++) {
                                                                                    if (data.body.foodName.split('(')[1].split(')')[0] == that.data.foodArr[i].shopStandarList[j].standardName) {
                                                                                        Obj.price = that.data.foodArr[i].shopStandarList[j].sell;
                                                                                        Obj.normsName = that.data.foodArr[i].shopStandarList[j].standardName;
                                                                                        Obj.foodId = that.data.foodArr[i].shopStandarList[j].standardNumber;
                                                                                    }

                                                                                    Obj.num = 1
                                                                                    Obj.foodType = 'guige'
                                                                                    Obj.singleProductName = that.data.foodArr[i].singleProductName;
                                                                                    Obj.foodIndex = that.data.foodArr[i].singleProductNumber;
                                                                                    Obj.showPrice = that.data.foodArr[i].showPrice;
                                                                                }



                                                                            }
                                                                        }
                                                                        payData.push(Obj)
                                                                        cartData[Obj.foodId] = 1
                                                                    } else if (data.body.foodType == 'zuhe') {
                                                                        var Obj = new Object();
                                                                        for (var z = 0; z < that.data.foodArrr.length; z++) {
                                                                            if (data.body.productId.split('+')[0] == that.data.foodArrr[z].groupPackageNumber) {
                                                                                Obj.num = 1
                                                                                Obj.foodType = 'zuhe'
                                                                                Obj.singleProductName = that.data.foodArrr[z].groupPackageName;
                                                                                Obj.price = that.data.foodArrr[z].groupPackagePrice;
                                                                                Obj.showPrice = that.data.foodArrr[z].showPrice;
                                                                                Obj.foodId = that.data.foodArrr[z].groupPackageNumber;
                                                                                Obj.list = data.body.foodName;
                                                                                Obj.dataTime = data.body.productId.split('+')[1]
                                                                                Obj.numList = [];
                                                                                var foodG = [];
                                                                                var foodGG = []
                                                                                var fdList = data.body.foodName.split('+')

                                                                                for (var g = 0; g < that.data.foodArrr[z].listTwo.length; g++) {
                                                                                    for (var f = 0; f < that.data.foodArrr[z].listTwo[g].listThree.length; f++) {
                                                                                        for (var d = 0; d < that.data.foodArrr[z].listTwo[g].listThree[f].length; d++) {
                                                                                            var aaaa = that.data.foodArrr[z].listTwo[g].listThree[f][d];
                                                                                            var fNum = 0;
                                                                                            for (var ii = 0; ii < foodG.length; ii++) {
                                                                                                if (foodG[ii].standard == aaaa.standard) {
                                                                                                    fNum++;
                                                                                                    break
                                                                                                }
                                                                                            }
                                                                                            if (fNum == 0) {
                                                                                                foodG.push(aaaa)
                                                                                            }

                                                                                        }

                                                                                    }

                                                                                }
                                                                                console.log(foodG)
                                                                                for (var c = 0; c < fdList.length; c++) {
                                                                                    for (var cc = 0; cc < foodG.length; cc++) {
                                                                                        console.log()
                                                                                        if (fdList[c].split('*')[0] == foodG[cc].singleProductName + '(' + foodG[cc].standardName + ')') {

                                                                                            Obj.numList.push(foodG[cc].standardNumber)
                                                                                            break
                                                                                        }
                                                                                    }

                                                                                }
                                                                                // var fdList = data.body.foodName.split('+')
                                                                                // for(var q = 0 ; q < fdList.length;q++){
                                                                                // 	for (var qq = 0; qq < foodGroup.length;qq){
                                                                                // 		if (fdList[q].split('*')[0] == foodGroup[qq].singleProductName + '(' + foodGroup[qq].standardName  + ')'){
                                                                                // 			Obj.numList.push(foodGroup[qq].standardNumber)
                                                                                // 			continue
                                                                                // 		}
                                                                                // 	}
                                                                                // }
                                                                                // var result = []
                                                                                // var v, b;
                                                                                // for (v = 0; v < foodGroup.length; v++) {
                                                                                // 	for (b = v + 1; b < foodGroup.length; b++) {
                                                                                // 		if (foodGroup[v].singleProductName + foodGroup[v].standardName == foodGroup[b].singleProductName + foodGroup[b].standardName) {
                                                                                // 			b = ++v
                                                                                // 		}
                                                                                // 	}
                                                                                // 	result.push(foodGroup[v]);
                                                                                // }
                                                                                // var fdList = data.body.foodName.split('+')
                                                                                // for(var q = 0 ; q < fdList.length;q++){
                                                                                // 	for(var qq = 0 ; qq < result.length;qq){
                                                                                // 		if (fdList[q].split('*')[0] == result[qq].singleProductName + '(' + result[qq].standardName  + ')'){
                                                                                // 			Obj.numList.push(result[qq].standardNumber)
                                                                                // 		}
                                                                                // 	}
                                                                                // }
                                                                            }
                                                                        }
                                                                        payData.push(Obj)
                                                                        cartData[Obj.list] = 1
                                                                    }


                                                                }
                                                                //单品单规格时需要测试，然后单品多规格需要增加判断加入循环
                                                                var payNum = 0;
                                                                var payAllNum = 0;
                                                                for (var i = 0; i < payData.length; i++) {
                                                                    payNum += payData[i].price * payData[i].num
                                                                    payAllNum += payData[i].num

                                                                }
                                                                that.setData({
                                                                    cartData: cartData,
                                                                    payData: payData,
                                                                    payNum: payNum.toFixed(2),
                                                                    payAllNum: payAllNum
                                                                });
                                                            }


                                                            //餐品还是没加判断



                                                        }
                                                    })
                                                } else if (data.type == 'userAdd') {
                                                    console.log(data.body)
                                                    var name2 = ''
                                                    wx.request({
                                                        url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + data.userId,
                                                        success: function(res) {
                                                            if (res.data.code == 1000) {
                                                                name2 = res.data.data.userName;
                                                            }
                                                            wx.showToast({
                                                                title: name2 + '加入了点餐',
                                                                icon: 'none',
                                                                duration: 1500
                                                            })
                                                        }
                                                    })
                                                } else if (data.msgType == 'userDel') {
                                                    console.log(data.body)
                                                    var name3 = ''
                                                    wx.request({
                                                        url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + data.userId,
                                                        success: function(res) {
                                                            if (res.data.code == 1000) {
                                                                name3 = res.data.data.userName;
                                                            }
                                                            var userList = that.data.userArr;
                                                            for (var b = 0; b < userList.length; b++) {
                                                                console.log(data.userId, userList[b].openid)
                                                                if (data.userId == userList[b].openid) {
                                                                    console.log('111')
                                                                    console.log(userList[b])
                                                                    userList.splice(b, 1)
                                                                }
                                                            }
                                                            that.setData({
                                                                userArr: userList
                                                            })
                                                            wx.showToast({
                                                                title: name3 + '离开了点餐',
                                                                icon: 'none',
                                                                duration: 1500
                                                            })
                                                        }
                                                    })
                                                } else if (data.type == 'cash') {
                                                    console.log(data)
                                                    var name4 = ''
                                                    wx.request({
                                                        url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + data.userId,
                                                        success: function(res) {
                                                            if (res.data.code == 1000) {
                                                                name4 = res.data.data.userName;
                                                            }
                                                            wx.showToast({
                                                                title: name4 + '发起了订单支付',
                                                                icon: 'none',
                                                                duration: 1500
                                                            })
                                                            that.setData({
                                                                payTrue: false,
                                                                payText: "支付中"
                                                            })
                                                        }
                                                    })

                                                } else if (data.type == 'clearCar') {
                                                    console.log(data)
                                                    if (data.body.foodName == 'qingkong') {
                                                        var name5 = ''
                                                        wx.request({
                                                            url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + data.userId,
                                                            success: function(res) {
                                                                if (res.data.code == 1000) {
                                                                    name5 = res.data.data.userName;
                                                                }
                                                                var payData = that.data.payData;
                                                                for (var i = 0; i < payData.length; i++) {
                                                                    payData.splice(i, 1)
                                                                }
                                                                that.setData({
                                                                    hideModalStatus: true,
                                                                    //所选项目数量
                                                                    cartData: {},
                                                                    //购物车单品数组
                                                                    payData: [],
                                                                    //购物车总价
                                                                    payNum: 0,
                                                                    //餐品数量
                                                                    payAllNum: 0,
                                                                    //搜索值
                                                                    sousuozhi: ' ',
                                                                    //所选规格名称
                                                                    guigeName: '',
                                                                    //所选规格list
                                                                    guigeList: [],
                                                                    //规格显示
                                                                    guigeShow: '',
                                                                    //规格价格
                                                                    guigePrice: "",
                                                                    //规格索引值
                                                                    guigeIndex: '',
                                                                    //单品规格编号
                                                                    guigeNum: '',
                                                                    //组合liest
                                                                    zuheList: [],
                                                                    //组合套餐名字
                                                                    grounShowName: '',
                                                                    //套餐单组名字
                                                                    nameList: {},
                                                                    //套餐索引
                                                                    pageIndex: '',
                                                                    //组合编号
                                                                    taocanName: '',
                                                                    //组合套餐
                                                                    groupPackageNumber: '',
                                                                    //组合套餐单组记录编号
                                                                    zuheNumber: {},
                                                                    beizhu: "",
                                                                })
                                                                wx.showToast({
                                                                    title: name5 + '清空了购物车',
                                                                    icon: 'none',
                                                                    duration: 1500
                                                                })

                                                            }
                                                        })
                                                    } else if (data.body.foodName == 'finish') {
                                                        var name6 = ''
                                                        wx.request({
                                                            url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + data.userId,
                                                            success: function(res) {
                                                                if (res.data.code == 1000) {
                                                                    name6 = res.data.data.userName;
                                                                }
                                                                var payData = that.data.payData;
                                                                for (var i = 0; i < payData.length; i++) {
                                                                    payData.splice(i, 1)
                                                                }
                                                                that.setData({
                                                                    hideModalStatus: true,
                                                                    //所选项目数量
                                                                    cartData: {},
                                                                    //购物车单品数组
                                                                    payData: [],
                                                                    //购物车总价
                                                                    payNum: 0,
                                                                    //餐品数量
                                                                    payAllNum: 0,
                                                                    //搜索值
                                                                    sousuozhi: ' ',
                                                                    //所选规格名称
                                                                    guigeName: '',
                                                                    //所选规格list
                                                                    guigeList: [],
                                                                    //规格显示
                                                                    guigeShow: '',
                                                                    //规格价格
                                                                    guigePrice: "",
                                                                    //规格索引值
                                                                    guigeIndex: '',
                                                                    //单品规格编号
                                                                    guigeNum: '',
                                                                    //组合liest
                                                                    zuheList: [],
                                                                    //组合套餐名字
                                                                    grounShowName: '',
                                                                    //套餐单组名字
                                                                    nameList: {},
                                                                    //套餐索引
                                                                    pageIndex: '',
                                                                    //组合编号
                                                                    taocanName: '',
                                                                    //组合套餐
                                                                    groupPackageNumber: '',
                                                                    //组合套餐单组记录编号
                                                                    zuheNumber: {},
                                                                    beizhu: ""
                                                                })
                                                                wx.showToast({
                                                                    title: name6 + '完成了订单支付',
                                                                    icon: 'none',
                                                                    duration: 2500
                                                                })
                                                                setTimeout(function() {
                                                                    wx.navigateTo({
                                                                        url: '/pages/webview/index'
                                                                    });
                                                                }, 2500)
                                                            }
                                                        })
                                                    } else if (data.body.foodName == 'weiwancheng') {
                                                        var name6 = ''
                                                        wx.request({
                                                            url: that.data.serverUrl + "hs-app-server/weChat/getUserInfo/" + that.data.ai + '/' + data.userId,
                                                            success: function(res) {
                                                                if (res.data.code == 1000) {
                                                                    name6 = res.data.data.userName;
                                                                }
                                                                var payData = that.data.payData;
                                                                for (var i = 0; i < payData.length; i++) {
                                                                    payData.splice(i, 1)
                                                                }
                                                                that.setData({
                                                                    hideModalStatus: true,
                                                                    //所选项目数量
                                                                    cartData: {},
                                                                    //购物车单品数组
                                                                    payData: [],
                                                                    //购物车总价
                                                                    payNum: 0,
                                                                    //餐品数量
                                                                    payAllNum: 0,
                                                                    //搜索值
                                                                    sousuozhi: ' ',
                                                                    //所选规格名称
                                                                    guigeName: '',
                                                                    //所选规格list
                                                                    guigeList: [],
                                                                    //规格显示
                                                                    guigeShow: '',
                                                                    //规格价格
                                                                    guigePrice: "",
                                                                    //规格索引值
                                                                    guigeIndex: '',
                                                                    //单品规格编号
                                                                    guigeNum: '',
                                                                    //组合liest
                                                                    zuheList: [],
                                                                    //组合套餐名字
                                                                    grounShowName: '',
                                                                    //套餐单组名字
                                                                    nameList: {},
                                                                    //套餐索引
                                                                    pageIndex: '',
                                                                    //组合编号
                                                                    taocanName: '',
                                                                    //组合套餐
                                                                    groupPackageNumber: '',
                                                                    //组合套餐单组记录编号
                                                                    zuheNumber: {},
                                                                    beizhu: ""
                                                                })
                                                                wx.showToast({
                                                                    title: name6 + '取消了订单支付，请重新选择餐品',
                                                                    icon: 'none',
                                                                    duration: 2500
                                                                })

                                                            }
                                                        })
                                                    }
                                                }

                                            })
                                    }
                                })

                            }
                        })
                    }
                })
            }
        }
        this.setData({
            loadNum: nn
        })



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
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存  
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画  
        setTimeout(function() {
            // 执行第二组动画  
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
            this.setData({
                animationData: animation
            })

            //关闭  
            if (currentStatu == "close") {
                this.setData({
                    showModalStatus: false,
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var that = this
        var code;
        wx.getStorage({
                key: 'shopInfo',
                success: function(res) {
                    that.setData({
                        shopName: res.data.shopName,
                        tabletableNumber: res.data.tabletableNumber,
                        tableNumber: res.data.number,
                        regionNumber: res.data.regionNumber,
                        clerkNumber: res.data.clerkNumber,
                        equipmentNumber: res.data.equipmentNumber,
                        operatorId: res.data.qrCodeAddress.split('=')[1],
                        master: res.data.master,
                        appkey: res.data.appKey,

                    })
                },
                fail: function() {

                }
            }),
		
            wx.getStorage({
                key: 'numberMeals',
                success: function(res) {
                    that.setData({
                        numberMeals: res.data
                    })
                    //加return即为不开启协同点餐功能 


                }

            })
        // wx.login({
        //     success: function(res) {
        //         code = res.code

        //         wx.request({
        //             url: that.data.serverUrl + 'hs-app-server/weChat/code',
        //             //url: "http://192.168.1.190:5003/hs-app-server/weChat/code",
        //             data: {
        //                 code: code,
        //             },
        //             method: 'GET',
        //             // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT                      // 
        //             header: {}, // 设置请求的 header                      
        //             success: function(res) {
        //                 console.log(res)
        //                 that.setData({
        //                     openId: res.data.data.openid,
        //                     code: code
        //                 })

        //                 if (that.data.numberMeals > 1) {
        //                     wx.showModal({
        //                         title: '',
        //                         content: '是否要加入多人点餐',
        //                         showCancel: true, //是否显示取消按钮
        //                         cancelText: "否", //默认是“取消”
        //                         cancelColor: 'skyblue', //取消文字的颜色
        //                         confirmText: "是", //默认是“确定”
        //                         confirmColor: 'skyblue', //确定文字的颜色
        //                         success: function(res) {
        //                             if (res.cancel) {

        //                             } else {
        //                                 wx.connectSocket({
        //                                     url: 'ws://192.168.1.111:5006/hs-app-server/websocket/' + that.data.openId + '/' + that.data.shopNum + '/' + that.data.tabletableNumber + '/' + that.data.ai,

        //                                     header: {
        //                                         'content-type': 'application/json'
        //                                     },
        //                                     method: "GET"
        //                                 })
        //                             }
        //                         }
        //                     })
        //                 }

        //                 // that.getUserImg()

        //                 // wx.onSocketOpen(function(res) {
        //                 //     console.log('WebSocket连接已打开！')
        //                 //     that.setData({
        //                 //         socketOpen: true
        //                 //     })

        //                 //     that.sendSocketMessage({

        //                 //         "type": "userAdd",
        //                 //         "option": "add",
        //                 //         "userId": that.data.openId,
        //                 //         "shopNumber": that.data.shopNum,
        //                 //         "tabletableNumber": that.data.tabletableNumber,

        //                 //         "body": {
        //                 //             "foodName": "就是个汉堡(小)",
        //                 //             "price": "0.01",
        //                 //             "productId": "19a581aa-f045-4f34-a24c-bc59689cf649",
        //                 //             "foodType": "1"
        //                 //         }


        //                 //     })
        //                 //     //sendSocketMessage(socketMsgQueue)
        //                 // })
        //                 // wx.onSocketClose(function(res) {
        //                 //         console.log('WebSocket连接已断开！')
        //                 //         that.setData({
        //                 //             socketOpen: false
        //                 //         })

        //                 //         //sendSocketMessage(socketMsgQueue)
        //                 //     }),

        //                     //wx.closeSocket()
        //                     // wx.onSocketMessage(function(res) {
        //                     //     console.log(res)
        //                     // })

        //             }
        //         })
        //     }
        // })
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
		var that = this
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
		if (this.data.foodArr.length == 0) {
			wx.hideLoading()
			return
		}
		
    },
    //去重
    uniq(array) {
        array.sort();
        var temp = [array[0]];
        for (var i = 1; i < array.length; i++) {
            if (array[i] !== temp[temp.length - 1]) {
                temp.push(array[i]);
            }
        }
        return temp;
    },
    //发送ws信息
    sendSocketMessage(msg) {
        console.log(msg)
        var that = this
        if (that.data.socketOpen) {
            //console.log('1111')
            //console.log(msg)
            wx.sendSocketMessage({
                data: JSON.stringify(msg)
            })
        } else {
            //console.log('2222')
            //socketMsgQueue.push(msg)
        }
    },
    getValue(data) {
        for (var p in data) {

            return p
        }
    },
    showT() {
        var that = this
        if (that.data.socketOpen) {
            wx.showToast({
                title: '',
                icon: 'loading',
                duration: 500,
                mask: true,
            })
        }

    },
    delChong(data, list) {
        console.log(data, list)
        var nnnn = 0
        for (var v = 0; v < list.length; v++) {
            if (list.type == 'zuhe') {
                if (data.foodName == list[v].foodName) {
                    list[v].foodCount = parseInt(list[v].foodCount) + 1
                    nnnn++
                    break

                }
            } else {
                if (data.foodName == list[v].foodName) {
                    list[v].foodCount = parseInt(list[v].foodCount) + parseInt(data.foodCount)
                    nnnn++
                    break

                }
            }

        }
        if (nnnn == 0) {
            list.push(data)
        }
        console.log(list)
    },
    minG(data) {

        for (var qq = 0; qq < data.groupFood.length; qq++) {
            if (data.groupFood[qq].groupName == data.gn) {

                data.groupFood[qq].minGroup = data.mg;

            }

        }
        console.log(data.groupFood)
    },
    //根据openId查询
    // getUserImg() {
    //     var that = this
    //     wx.login({
    //         success: function(res) {
    //             wx.request({
    //                 //url: 'http://192.168.1.111:5006/hs-app-server/weChat/' + res.code,
    //                 //url: "http://192.168.1.190:5003/hs-app-server/weChat/code",
    //                 // data: {
    //                 // 	code: that.data.code,
    //                 // 	shopNumber: that.data.shopNum,
    //                 // 	tabletableNumber: that.data.tabletableNumber
    //                 // },
    //                 method: 'GET',
    //                 // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT                      // 
    //                 header: {}, // 设置请求的 header                      
    //                 success: function(res) {
    //                     console.log(res)
    //                 }
    //             })
    //         }
    //     })

    // },
    //sort排序
    compare(property) {
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
	compare1(property) {
		return function (a, b) {
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	},
    // lianjie: function () {
    // 	var socketOpen = false
    // 	//注册信息
    // 	var data = { appid: "77494ad321405fb340e2d1a664850954", sid: "123" }
    // 	var socketMsgQueue = JSON.stringify(data)
    // 	console.log(socketMsgQueue)
    // 	//建立连接
    // 	wx.connectSocket({
    // 		url: "wss://websck.eloeg.wang:20001",
    // 	})
    // 	//
    // 	wx.onSocketOpen(function (res) {
    // 		console.log('WebSocket连接已打开！')
    // 		socketOpen = true
    // 		console.log('数据发送中' + socketMsgQueue)
    // 		sendSocketMessage(socketMsgQueue)
    // 	})
    // 	function sendSocketMessage(msg) {
    // 		if (socketOpen) {
    // 			wx.sendSocketMessage({
    // 				data: msg
    // 			})
    // 		} else {
    // 			socketMsgQueue.push(msg)
    // 		}
    // 	}
    // 	wx.onSocketError(function (res) {
    // 		console.log('WebSocket连接打开失败，请检查！')
    // 	})
    // 	wx.onSocketMessage(function (res) {
    // 		console.log('收到服务器内容：' + JSON.stringify(res))
    // 	})
    /**
     * 多人点餐部分
     * 
     * 
     */
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        wx.showLoading({
            title: '页面加载中...',
            mask: 'true'
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {


        let that = this;
        that.setData({
            shopNum: wx.getStorageSync('shopNum')
        })
        utils.request({
            url: "food/getCategory?shopNumber=" + that.data.shopNum + "&state=0" + "&isScan=0",
            success: function(res) {
                let tmpArr = that.data.classArr;
                var resetArr = [{
                    categoryName: "全部",
                    categoryNumber: "0"
                }]
                tmpArr = resetArr.concat(res.data.sort(that.compare('serialNumber')))
                that.setData({
                    classArr: tmpArr
                })
            }
        })
        this.getFood()
        if (that.data.isWebScoket == true) {
            wx.connectSocket({
                url: that.data.webUrl + 'hs-app-server/websocket/' + that.data.openId + '/' + that.data.shopNum + '/' + that.data.tabletableNumber + '/' + that.data.ai,

                header: {
                    'content-type': 'application/json'
                },
                method: "GET"
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log('hide')
        var that = this
        that.sendSocketMessage({

            "type": "userDel",
            "option": "",
            "userId": that.data.openId,
            "shopNumber": that.data.shopNum,
            "tabletableNumber": that.data.tabletableNumber,

            "body": {

            }


        })
        that.setData({
            socketOpen: false
        })
        app.globalData.iswS = false
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
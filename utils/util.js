// import regeneratorRuntime from './regenerator-runtime.js'
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//const server = "http://192.168.1.250:5006/hs-app-server/";
const server = "https://wxdc.hongxiaosou.cn/hs-app-server/";
function request(param, showLoading = true) {
    var that = this;
    var header = param.header ? param.header : {};
    var url = param.url;
    var method = param.method ? param.method : "GET";
    var data = param.data ? param.data : {};
    var success = function(res) {
        param.success(res.data)
    };
    var fail = param.fail;
    var complete = param.complete ? function() {
        param.complete();
        wx.hideNavigationBarLoading();
    } : function(e) {
        wx.hideNavigationBarLoading();
    };
    var setting = {
        header: header,
        url: server + url,
        method: method,
        data: data,
        success: success,
        fail: fail,
        complete: complete
    }
    if (showLoading) {
        wx.showNavigationBarLoading()
    }
    wx.request(setting);
    // wx.hideNavigationBarLoading()
}

module.exports = {
    formatTime: formatTime,
    request: request
}
import wx from "weixin-js-sdk";
export default {
    share(obj) {
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
        });
        // wx.onMenuShareAppMessage({
        //     title: obj.title || "", // 分享标题
        //     desc: obj.desc || "", // 分享描述
        //     link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl: obj.imgUrl || "", // 分享图标
        //     type: "", // 分享类型,music、video或link，不填默认为link
        //     dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function() {
        //         // 用户点击了分享后执行的回调函数
        //     }
        // });
        wx.updateAppMessageShareData({
            title: obj.title || "", // 分享标题
            desc: obj.desc || "", // 分享描述
            link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: obj.imgUrl || "", // 分享图标
            success: function() {
                // 设置成功
                console.log('分享设置成功')
            }
        });

        // wx.onMenuShareTimeline({
        //     title: obj.title || "", // 分享标题
        //     link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl: obj.imgUrl || "", // 分享图标
        //     success: function() {
        //         // 设置成功
        //     }
        // });
        wx.updateTimelineShareData({
            title: obj.title || "", // 分享标题
            link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: obj.imgUrl || "", // 分享图标
            success: function() {
                // 设置成功
                console.log('朋友圈设置成功')
            }
        });
    },
    openLocation(obj) {
        wx.openLocation({
            latitude: obj.latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: obj.longitude, // 经度，浮点数，范围为180 ~ -180。
            name: obj.name, // 位置名
            address: obj.address, // 地址详情说明
            scale: 26, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
        });
    },
    getLocation() {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed; // 速度，以米/每秒计
                    // var accuracy = res.accuracy; // 位置精度
                    resolve(res);
                },
                fail: function(err) {
                    console.log(err);
                    reject(err);
                }
            });
        });
    },
    hideShareMenu() {
        return new Promise((resolve, reject) => {
            wx.hideMenuItems({
                menuList: [
                    "menuItem:share:appMessage",
                    "menuItem:share:timeline"
                ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
            // wx.hideAllNonBaseMenuItem();
            console.log('hide')
        });
    },
    showShareMenu() {
        return new Promise((resolve, reject) => {
            wx.showMenuItems({
                menuList: [
                    "menuItem:share:appMessage",
                    "menuItem:share:timeline"
                ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        });
    }
};

<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-input
      clearable
      maxlength="8"
      autofocus="autofocus"
      id="code"
      v-model="productCode"
      placeholder="输入防伪码或者扫一扫"
      style="width:220px;margin-right:15px;"
      @change="searchBtnClick"
    >
    <!--<i slot="prefix" class="el-input__icon el-icon-search" /> -->
    </el-input>
    <el-button plain circle size="mini" @click="scanClick" class="el-icon-full-screen">
    </el-button>
    <el-button type="primary" @click="searchBtnClick">查询</el-button>
      <el-dialog
      title="提示"
      center
      :visible.sync="visible"
      width="75%">
      <span style="margin-left:55px;">{{showPrompt}}</span>
      </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex"
import wx from "weixin-js-sdk"
// import { getScanCode } from "@/api/scancode.js"
import qs from "qs"
import { post } from "@/js/utils.js"
// import wx from "@/js/jweixin-1.6.0.js"
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return{
      showPrompt: "",
      productCode: "",
      visible: false,
      flag: "",
      product_code: "",
      code:"",
    }
  },
  methods:{
    ...mapActions({
      getScanCode:"scancode/getScanCode",
    }),
    // 输入
    searchBtnClick(){
      alert('机身码为:'+this.productCode);
      console.log(String(this.productCode));
        this.getScanCode({
           product_code:String(this.productCode)
        })
        .then((res)=>{
          console.log(res);
          if(res){
            alert("扫码结果:"+res.msg);
            // this.visible=true;
            // this.showPrompt=res.msg;
          }
        })
        .catch(err=>{
          console.log(err);
        })
    },
     //扫码三
    async scanClick() {
    //外部浏览器跳过
    let viewer = window.navigator.userAgent.toLowerCase();
    // if (viewer.match(/MicroMessenger/i) == "micromessenger") {
      try {
        //微信浏览器
        let jsApiTicket = await post(`${process.env.VUE_APP_BASE_URL}/mp/getJsapiConfig`, {
          url: encodeURI(window.location.href),
        });
        console.log(jsApiTicket);
          // wx.error(function (res) {
          //   alert("出错了：" + res.errMsg);
          // });

          //分享
        wx.config({
          debug: false,//为true的时候开启调试 false停止
          beta: true,
          appId: jsApiTicket.appId,
          timestamp: jsApiTicket.timestamp,
          nonceStr: jsApiTicket.nonceStr,
          signature: jsApiTicket.signature,
          jsApiList: [
            "checkJsApi",
            "scanQRCode",
          ],
        });
        let self = this;
        wx.ready(function () {
          
          // 检测
          wx.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {
              console.log(res);
            }
          }) 
          // 扫码 //
          wx.scanQRCode({
	          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	          success:  function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              var test2=(result.split(",")).slice(1,2);
              self.productCode=test2;
              alert("返回的result:"+test2+"机身码是:"+self.productCode);
            },
            fail: function (err){
              console.log(err);
            }
	        });
        });
      } catch (error) {
        console.log(error)
      } 
    // }
    },

    // 扫码
    // searchBtnScanClick(){
    //     getScanCode({
    //     product_code:this.productCode
    //   })
    //   .then(res=>{
    //     console.log(res);
    //     if(res){
    //       this.visible=true;
    //       this.showPrompt=res.msg;
    //     }
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //   })
    //   wx.config({
    //       // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，
    //       //可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //       debug: true,
    //       appId: '', // 必填，公众号的唯一标识
    //       timestamp: '', // 必填，生成签名的时间戳
    //       nonceStr: '', // 必填，生成签名的随机串
    //       signature: '',// 必填，签名
    //       jsApiList: [] // 必填，需要使用的JS接口列表
    //     });
    //     wx.ready(function(){
    //       // config信息验证后会执行ready方法，所有接口调用都必须在
    //       // config接口获得结果之后，config是一个客户端的异步操作，所
    //       // 以如果需要在页面加载时就调用相关接口，则须把相关接口放在
    //       // ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
    //       // 则可以直接调用，不需要放在ready函数中。
    //     });
    // },
    // // 扫码1
    // scan1(){
    //   let url=location.href.split('#')[0];
    //   let params={
    //     url:encodeURIComponent(url),
    //     jsApiList:['scanQRcode']
    //   }
    //   this.$http.post(this.baseUrl+'/api/wechat/jssdk',params,{
    //     headers:{
    //       Authorization:this.token
    //     }
    //   }).then(function(res){
    //     let data=JSON.parse(res.message);
    //     wx.config({
    //       debug:false,
    //       appId:data.appId,
    //       timestamp:data.timestamp,
    //       nonceStr:data.nonceStr,
    //       signature:data.signature,
    //       jsApiList:['scanQRcode']
    //     });
    //   },function(){
    //     console.log('请求失败处理');
    //   })
    // },
    // scanClick1(){
    //   this.scan1();
    //   let that=this;
    //   wx.scanQRcode({
    //     needResult:1,
    //     scanType:["qrCode","barCode"],//二维码或一维码
    //     success:function(res){
    //       var result=res.resultStr;
    //       that.putscan(res.resultStr);
    //     }
    //   })
    // },
    // // 扫码2
    // scan2(){
    //   let url="";
    //   // navigator.userAgent.toLowerCase 判断登陆端是pc还是手机
    //   let ua=navigator.userAgent.toLowerCase();
    //   if(/iphone|ipad|ipod/.test(ua)){
    //     this.newUrl=window.location.href.split('#')[0];
    //   }else if(/android/.test(ua)){
    //     this.newUrl=window.location.href;
    //   }
    //   $.get("address?url=this.newUrl",function(data){
    //     var jsondata=$.parseJSON(data);
    //     wx.config({
    //       debug:false,
    //       appId:jsondata.appId,
    //       timestamp:''+jsondata.timestamp,//时间戳
    //       nonceStr:jsondata.nonceStr,
    //       signature:jsondata.signature,
    //       jsApiList:['checkJsApi','scanQRcode']
    //     })
    //   })
    //    wx.error(function (res) {
    //         alert("出错了：" + res.errMsg);
    //         //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    //     });
    //     wx.ready(function () {
    //         wx.checkJsApi({
    //             jsApiList: ['scanQRCode'],
    //             success: function (res) {
 		// 		    wx.scanQRCode({
	  //             needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	  //             scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
	  //             success: function (res) {
	  //             var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	  //             alert("扫描结果："+result);
	  //             }
	  //         });
    //           }
    //         });
    //     }); 
    // },

  },
    
  // async created() {
  //   //外部浏览器跳过
  //   let viewer = window.navigator.userAgent.toLowerCase();
  //   if (viewer.match(/MicroMessenger/i) == "micromessenger") {
  //     try {
  //       //微信浏览器
  //       let jsApiTicket = await post("/mp/getJsapiConfig", {
  //         url: encodeURI(window.location.href),
  //       });

  //       //1、判断是否没有授权，没授权则重定向授权
  //       let redirect = await this.redirectOrNot(jsApiTicket);
  //       //2、若是通过用户，则获取用户信息
  //       if (redirect) {
  //         const resQuery = qs.parse(
  //           window.location.href.split("?")[1].split("#")[0]
  //         );
  //         let user = await post("/mp/oauth2getAccessToken", {
  //           code: resQuery.code,
  //         });
  //         console.log("user", user);
  //         if (user != null) {
  //           this.loadUser(user);
  //         } else {
  //           // this.setUserId(this.$store.state.userInfo.openId);
  //           console.log("userId", this.$store.state.userId);
  //           if (this.$store.state.userId) {
  //           } else {
  //             let auth = await this.redirectAuth(jsApiTicket);
  //             if (auth) {
  //               return;
  //             }
  //           }
  //         }
  //         //3、url添加调试代码
  //         this.debug();
  //         //4、添加业务
  //         // await this.doBusiness(resQuery, jsApiTicket);
  //         //分享
  //         wx.config({
  //           debug: false,
  //           beta: true,
  //           appId: jsApiTicket.appId,
  //           timestamp: jsApiTicket.timestamp,
  //           nonceStr: jsApiTicket.nonceStr,
  //           signature: jsApiTicket.signature,
  //           jsApiList: [
  //             "checkJsApi",
  //             "updateAppMessageShareData",
  //             "onMenuShareAppMessage",
  //             "openLocation",
  //             "hideMenuItems",
  //             "showMenuItems",
  //             "updateTimelineShareData",
  //             "chooseImage",
  //             "previewImage",
  //             "uploadImage",
  //             "downloadImage",
  //             "scanQRCode",
  //             "closeWindow",
  //             "getLocation",
  //             "chooseWXPay",
  //           ],
  //         });
  //         let self = this;
  //         wx.ready(function () {
  //           wxJSFn.hideShareMenu();
  //           self.setAppData({
  //             resQuery,
  //             jsApiTicket,
  //           });
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       Dialog.alert({
  //         title: "提示",
  //         message: "数据初始化失败~",
  //       })
  //         .then(() => {
  //           // on confirm
  //         })
  //         .catch(() => {
  //           // on cancel
  //         });
  //     }
  //   }
  // },
}
</script>

<style>
.home{
  width:100%;
  margin:60px auto 20px;
}
</style>
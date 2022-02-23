<template>
<div class="home">
  <div class="homes">
    <div class="logoImg">
      <img  alt="" src="../assets/hefeng.png">
    </div>
    <div class="title">
      <h3>护颈塑形乳胶枕</h3>
      <div class="titleBig">一个正颈的枕头</div>
    </div>
    <div class="productImg">
      <img src="../assets/zhentou.jpg" alt="">
    </div>
    
    <div class="scan">
      <i class="iconfont" @click="scanClick" >&#xe666; <span class="iconfontLine"></span></i>
      <!-- <i slot="prefix" class="el-input__icon el-icon-full-screen" @click="scanClick"/> -->
      <div class="settingInput">
        <el-input
          maxlength="8"
          autofocus="autofocus"
          v-model="productCode"
          placeholder="扫 条 形 码 验 证"
          style="width:200px;"
          @change="searchBtnClick"
        />
      </div>
      <button @click="searchBtnClick">
        确定
      </button>
      <!-- :visible.sync="visible" -->
      <el-dialog
      class="promptDialog"
      :show-close="false"
      :visible="visible"
      width="62%"
      height="23%">
      <img @click="prompt" class="promptImg" src="../assets/logo2.png" />
      </el-dialog>
      <el-dialog
      class="fakeDialog"
      :show-close="false"
      :visible="visibles"
      width="62%"
      height="23%">
      <img @click="fake" class="fakeImg" src="../assets/logo1.png" />
      <!-- <span>{{showPrompt}}</span> -->
      </el-dialog>
    </div>
    <div class="scanPrompt">
      防伪查询 (手机扫描标签上的条形码)
    </div>
    <div class="lineSmall"></div>
    <div class="about">
      <div>about us</div>
      <div style="margin:32px 0 5px 0;">禾风</div>
      <div style="margin-bottom:32px;">中国智能睡眠领域的新兴科技创新品牌</div>
      <div class="aboutFont">
        专注研究年轻人的睡眠颈态，独家研发颈态塑形乳胶和智能监测乳胶枕等产品。为现代都市人而生，致力于改善身体亚健康状态的同时，通过颈态三大黄金修护力，塑形挺拔身姿，打造完美气质。
      </div>
      <div class="hefengLogo">
        <img  alt="" src="../assets/hefeng2.png">
      </div>
      <div style="margin-bottom:50px;">广州禾风智眠科技有限公司</div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex"
import wx from "weixin-js-sdk"
import qs from "qs"
import { post } from "@/js/utils.js"
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {},
  data(){
    return{
      showPrompt: "",
      productCode: "",
      visible: false,
      visibles:false,
      product_code: "",
    }
  },
  methods:{
    ...mapActions({
      getScanCode:"scancode/getScanCode",
    }),
    prompt(){
      this.visible=false;
    },
    fake(){
      this.visibles=false;
    },
    // 输入
    searchBtnClick(){
      // console.log(String(this.productCode));
        this.getScanCode({
           product_code:String(this.productCode)
        })
        .then((res)=>{
          // if(res.code=='000000'){
          //   alert("扫码结果:"+res.msg+"   该产品为正品!");
          // }else{
          //   alert("扫码结果:"+res.msg);
          // }
            if(res.code=='000000'){
              this.visible=true;
            }else{
              this.visibles=true;
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
              // self.productCode=result;
              var test2=(result.split(",")).slice(1,2);
              self.productCode=test2;
              // alert("返回的result:"+test2+"机身码是:"+self.productCode);
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

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* Project id 2715413 */
  src: url('//at.alicdn.com/t/font_2715413_g9yre945gw.woff2?t=1627872467436') format('woff2'),
       url('//at.alicdn.com/t/font_2715413_g9yre945gw.woff?t=1627872467436') format('woff'),
       url('//at.alicdn.com/t/font_2715413_g9yre945gw.ttf?t=1627872467436') format('truetype');
}

.home{
  box-sizing: border-box;
  width:100%;
  // min-height: 100%;
  max-height: 1250px;
  padding: 10px;
  background-color:#c6e0d7;
  position: absolute;
  top:0;
  left: 0;
  // overflow-y: auto;
  margin:0;
  padding: 0;
  .homes{
   width:100%;
   height: 100%;
   margin-top:40px;
   margin-bottom: 100px;
    .logoImg{
     width:80px;
     height: 40px;
     margin-left:275px;
      img{
       width:80px;
       height: 40px;
      }
    }
    .title{
      margin:0 32px;
      h3{
        margin:0;
        font-size:22px;
        font-weight: 700;
        color: #729086;
        letter-spacing:1px;
      }
      .titleBig{
        font-size: 32px;
        font-family: 'STFangsong' !important;
        color:#739388;
        letter-spacing:1px;
      }
    }
    .productImg{
      margin-top: 25px;
      width:280px;
      height:380px;
      img{
        width:280px;
        height:380px;
        object-fit:cover;
      }
    }
    .scan{
      position: relative;
      margin-top:30px;
      margin-left:89px;
      height:40px;
      display: flex;
      .settingInput{
        height:40px;
        border-radius: 0px !important;
        .el-input__inner{
          padding: 2px 0 0 52px;
        }
        .el-input__inner::placeholder{
          color: #709186;
          font-size: 18px;
          line-height: 40px;
        }
        /* 谷歌 */
        .el-input__inner::-webkit-input-placeholder {
          color: #709186;
          font-size: 18px;
          line-height: 40px;
        }
        /* 火狐 */
        el-input__inner:-moz-placeholder {
          color: #709186;
          font-size: 18px;
          line-height: 40px;
        }
        /*ie*/
        el-input__inner:-ms-input-placeholder {
          color: #709186;
          font-size: 18px;
          line-height: 40px;
        }
      }
      .iconfont{
        position: absolute;
        top:3px;
        left:4px;
        z-index: 99;
        font-family:"iconfont" !important;
        font-size:30px;
        color: #03cfb6;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        .iconfontLine{
          position: absolute;
          top:2px;
          left:36px;
          width:1px;
          height: 28px;
          font-weight: 500;
          background-color: #98bcb0;
        }
      }
      button{
        height:40px;
        width:55px;
        background-color:#03cfb4;
        padding: 0 !important;
        color:#fff;
        border:0;
        line-height: 38px;
        font-size:16px;
      } 
      .promptDialog {
        margin-top:158px;
        .el-dialog__header{
          padding: 0;
        } 
        .el-dialog__body{
        padding: 0;
        width: 260px;
        height: 150px;
        background-color: #c6dfd7;
        // background: url('../assets/logo2.png') center center no-repeat;
        // background-size: 105% 108%; width:240px;height: 150px;
         .promptImg{
           padding: 0;
          width: 100%;
          height: 100%;
         }
        }
      }
      .fakeDialog{
        margin-top:158px;
        .el-dialog__header{
          padding: 0;
        } 
        .el-dialog__body{
          padding: 0;
          width: 260px;
          height: 175px;
          background-color: #c6dfd7;
         .fakeImg{
          padding: 0;
          width: 100%;
          height: 100%;
         }
        }
      }
      
    }
    .scanPrompt{
      margin-top:10px;
      margin-left: 89px;
      color: #729086;
      font-size: 12px;
      // word-spacing:2px;
      letter-spacing:1px;
    }
    .lineSmall{
      margin:70px 0 0 40px;
      width:30px;
      height: 6px;
      background-color: #02c7ab;
    }
    .about{
      color:#648479;
      margin:42px 0 40px 40px;
      letter-spacing:1px;
      font-size:14px;
      .aboutFont{
        width: 256px;
        letter-spacing:2px;
        line-height: 256px;
        line-height: 20px;
        white-space: wrap;
        margin-bottom: 110px;
      }
      .hefengLogo{
        width: 61px;
        height: 28px;
        margin-bottom: 22px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    } 

  }
}
  




</style>